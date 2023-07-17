import { Slot, component$, useContextProvider, useStore, useVisibleTask$ } from '@builder.io/qwik';
import { type PokemonGameState, PokemonGameContext } from './pokemon-game.context';
import { type PokemonListState, PokemonListContext } from './pokemon-list.context';

export const PokemonProvider = component$(() => {

    const pokemonGame = useStore<PokemonGameState>({
        pokemonID: 1,
        showBackImg: false,
    });

    const pokemonList = useStore<PokemonListState>({
        currentPage: 1,
        isLoading: false,
        pokemons: [],
    })

    useContextProvider(PokemonGameContext, pokemonGame);
    useContextProvider(PokemonListContext, pokemonList);

    useVisibleTask$(() => {
        if( localStorage.getItem('pokemon-game') ) {
            pokemonGame.pokemonID = JSON.parse(localStorage.getItem('pokemon-game')!).pokemonID;
            pokemonGame.showBackImg = JSON.parse(localStorage.getItem('pokemon-game')!).showBackImg;
        }
    });

    useVisibleTask$(({ track }) => {
        track(() => [ pokemonGame.pokemonID, pokemonGame.showBackImg ]);

        localStorage.setItem('pokemon-game', JSON.stringify(pokemonGame));
    });


    return <Slot />;
});