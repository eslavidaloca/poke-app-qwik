import { component$, useComputed$ } from '@builder.io/qwik';
import { Link, type DocumentHead, routeLoader$, useLocation } from '@builder.io/qwik-city';
import { getSmallPokemons } from '~/helpers/get-small-pokemon';
import { SmallPokemon, PokemonListResponse } from '~/interfaces';
import { PokemonImage } from '../../../components/pokemons/pokemon-image';

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
                <span class="my-5 text-5xl">Status</span>
                <span>Offset: { currentOffset }</span>
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
                    <div key={ pokemon.name } class="m-5 flex flex-col justify-center items-center">
                        <PokemonImage id={ pokemon.id }/>
                        <span class="capitalize">{ pokemon.name }</span>
                    </div>
                ))}
            </div>

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