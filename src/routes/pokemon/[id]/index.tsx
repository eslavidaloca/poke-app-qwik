import { component$, useContext } from "@builder.io/qwik";
import { type DocumentHead, routeLoader$ } from "@builder.io/qwik-city";
import { PokemonImage } from '../../../components/pokemons/pokemon-image';
import { PokemonGameContext } from '~/context/pokemon/pokemon-game.context';

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
    const pokemonGame = useContext(PokemonGameContext);

    return (
        <div>
            {/* <span class="text-5xl">Pokemon: { location.params.id } </span> */}
            {/* <span class="text-5xl">Pokemon: {pokemonId} </span> */}
            <span class="text-5xl">Pokemon: { pokemonGame.pokemonID } </span>

            <PokemonImage
                id={pokemonGame.pokemonID}
                backImg={pokemonGame.showBackImg}
            />

            </div>
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