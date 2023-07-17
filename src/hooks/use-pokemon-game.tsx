import { useComputed$, useContext, $ } from '@builder.io/qwik';
import { PokemonGameContext } from "~/context";

export const usePokemonGame = () => {

    const pokemonGame = useContext(PokemonGameContext);

    const changePokemonId = $((value: number) => {
        if ((pokemonGame.pokemonID + value) <= 0) pokemonGame.pokemonID = 903;
        else if ((pokemonGame.pokemonID + value) > 1013) pokemonGame.pokemonID = 1;

        pokemonGame.pokemonID += value;
    });

    const changeShowBackImg = $(() => {
        pokemonGame.showBackImg = !pokemonGame.showBackImg
    });

    return {
        pokemonId         : useComputed$(() => pokemonGame.pokemonID),
        showBackImg       : useComputed$(() => pokemonGame.showBackImg),

        nextPokemon       : $(() => changePokemonId(+1)),
        previousPokemon   : $(() => changePokemonId(-1)),

        changeShowBackImg : changeShowBackImg,
    }
}