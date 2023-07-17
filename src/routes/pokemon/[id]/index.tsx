import { component$ } from "@builder.io/qwik";
import { type DocumentHead } from "@builder.io/qwik-city";
import { PokemonImage } from '../../../components/pokemons/pokemon-image';
import { usePokemonGame } from "~/hooks/use-pokemon-game";

// export const usePokemonId = routeLoader$<number>(({ params, redirect }) => {
//     const id = Number(params.id);
//     if ( isNaN(id) ) redirect(301, '/');
//     if ( id <= 0 ) redirect(301, '/');
//     if ( id >= 1013 ) redirect(301, '/');
//     return id;
// })

export default component$(() => {

    // const location = useLocation();
    // const pokemonId = usePokemonId();
    // const pokemonGame = useContext(PokemonGameContext);
    const pokemonGame = usePokemonGame();

    return (
        <>
            {/* <span class="text-5xl">Pokemon: { location.params.id } </span> */}
            {/* <span class="text-5xl">Pokemon: {pokemonId} </span> */}
            <span class="text-5xl">Pokemon: { pokemonGame.pokemonId.value } </span>

            <PokemonImage
                id={pokemonGame.pokemonId.value}
                backImg={pokemonGame.showBackImg.value}
            />

            <div class="mt-2">
                <button onClick$={pokemonGame.changeShowBackImg} class="btn btn-primary">Voltear</button>
            </div>

        </>
    )
})

export const head: DocumentHead = {
    title: 'Detalles del Pokemon',
    meta: [
        {
            name: 'description',
            content: 'Qwik first app',
        },
    ],
};