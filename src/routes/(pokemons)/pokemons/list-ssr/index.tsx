import { component$, useComputed$, useSignal, $, useStore, useVisibleTask$ } from '@builder.io/qwik';
import { Link, type DocumentHead, routeLoader$, useLocation } from '@builder.io/qwik-city';
import { getSmallPokemons } from '~/helpers/get-small-pokemon';
import type { SmallPokemon } from '~/interfaces';
import { PokemonImage } from '~/components/pokemons/pokemon-image';
import { Modal } from '~/components/shared';
import { getFunFactAboutPokemon } from '~/helpers/chat-gpt-response';

export const usePokemonList = routeLoader$<SmallPokemon[]>(async({ query, redirect, pathname }) => {

    const offset = Number(query.get('offset') || '0');
    if( offset <0 ) redirect(301, pathname);
    
    return await getSmallPokemons(offset);

    // Before the helper function
    // const resp = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=10&offset=${ offset }`);
    // const data = await resp.json() as PokemonListResponse;

    // return data.results;
});

export default component$(() => {

    const pokemons = usePokemonList();
    const location = useLocation();

    const modalVisible = useSignal(false);
    const modalPokemon = useStore({
        id: '',
        name: ''
    });

    const gptResponse = useSignal('');

    //Modal functions
    const showModal = $((id: string, name: string) => {
        modalPokemon.id = id;
        modalPokemon.name = name;

        modalVisible.value = true;
    });
    const hideModal = $(() => {
        modalVisible.value = false;
    });

    useVisibleTask$(({ track }) => {
        track( () => modalPokemon.name );

        gptResponse.value = '';

        if( modalPokemon.name.length > 0)
            getFunFactAboutPokemon(modalPokemon.name)
                .then(resp => gptResponse.value = resp);
    });

    const currentOffset = useComputed$<number>(() => {
        // const offSetString = location.url.searchParams.get('offset');
        const offSetString = new URLSearchParams( location.url.search ).get('offset');
        const offSet = offSetString ? Number(offSetString) : 0;

        return isNaN(offSet)
            ? 0
            : offSet;
    })

    return (
        <>
            <div class="flex flex-col">
                <span class="my-5 text-5xl">Lista de pokemones del lado del servidor</span>
                <span>Pagina actual: { currentOffset }</span>
                <span>Esta cargando la pagina: { location.isNavigating ? 'Si' : 'No' }</span>
            </div>

            <div class="mt-10">
                <Link href={ `/pokemons/list-ssr/?offset=${ currentOffset.value - 10 }` }
                    class="btn btn-primary mr-2">
                    Anteriores
                </Link>
                <Link href={`/pokemons/list-ssr/?offset=${ currentOffset.value + 10 }`}
                    class="btn btn-primary mr-2">
                    Siguientes
                </Link>
            </div>

            <div class="grid grid-cols-6 mt-5">
                {pokemons.value.map((pokemon) => (
                    <div key={ pokemon.name } 
                        onClick$={ () => showModal(pokemon.id, pokemon.name) }
                        // onClick$={ () => modalVisible.value = true }
                        class="m-5 flex flex-col justify-center items-center">
                        <PokemonImage id={ pokemon.id }/>
                        <span class="capitalize">{ pokemon.name }</span>
                    </div>
                ))}
            </div>


            <Modal size='lg' showModal={ modalVisible.value } closeFn={ hideModal }>
                <div q:slot='title'>{ modalPokemon.name }</div>
                <div q:slot='content' class="flex flex-col justify-center items-center">
                    <PokemonImage id={ modalPokemon.id }/>
                    <span>
                        {
                          gptResponse.value === ''
                          ? 'Preguntando a ChatGPT...'
                          : gptResponse.value 
                        }
                    </span>
                    <img width={ 60 } height={ 60 } src="/oval.svg" alt="Loading" class={[gptResponse.value === '' ? '' : 'hidden', 'mt-3']} />
                </div>
            </Modal>

        </>
    )
});

export const head: DocumentHead = {
    title: 'List-SSR',
    meta: [
        {
            name: 'description',
            content: 'Qwik first app',
        },
    ],
};