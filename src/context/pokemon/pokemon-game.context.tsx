import { createContextId } from "@builder.io/qwik"

export interface PokemonGameState {
    pokemonID  : number;
    showBackImg: boolean;
}

export const PokemonGameContext = createContextId<PokemonGameState>('pokemon.game-context');