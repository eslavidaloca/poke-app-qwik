import { $, component$, useContext } from '@builder.io/qwik';
import { type DocumentHead, useNavigate } from '@builder.io/qwik-city';
import { PokemonImage } from '~/components/pokemons/pokemon-image';
import { PokemonGameContext } from '~/context/pokemon/pokemon-game.context';

export default component$(() => {
  const nav = useNavigate();

  const pokemonGame = useContext(PokemonGameContext);

  // const pokemonID = useSignal<number>(1); // primitivos, booleans, strings
  // const showBackImg = useSignal<boolean>(false);

  const changePokemonId = $(( value: number ) => {
    if ((pokemonGame.pokemonID + value) <= 0) pokemonGame.pokemonID = 903;
    else if ((pokemonGame.pokemonID + value) > 1013) pokemonGame.pokemonID = 1;

    pokemonGame.pokemonID += value;
  })

  const changeShowBackImg = $(() => {
    pokemonGame.showBackImg = !pokemonGame.showBackImg
  })

  const goToPokemon = $(() => {
    nav(`/pokemon/${ pokemonGame.pokemonID }`);
  })

  return (
    <>

      <span class="text-2xl">Pokemon No. </span>
      <span class="text-9xl">{ pokemonGame.pokemonID }</span>

      <div onClick$={ () => goToPokemon() }>
        <PokemonImage
          id={ pokemonGame.pokemonID }
          backImg={ pokemonGame.showBackImg }
        />
      </div>
      {/* <Link href={`/pokemon/${ pokemonGame.pokemonID }/`}> */}
        {/* <PokemonImage
          id={ pokemonGame.pokemonID }
          backImg={ pokemonGame.showBackImg } 
        /> */}
      {/* </Link> */}

      <div class="mt-2 p-2">
        <button onClick$={ () => changePokemonId(-1) } class="btn btn-primary mr-2">Anterior</button>
        <button onClick$={ () => changePokemonId(+1) } class="btn btn-primary mr-2">Siguiente</button>

        <button onClick$={ () => changeShowBackImg() } class="btn btn-primary">Voltear</button>
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: 'PokeQwik',
  meta: [
    {
      name: 'description',
      content: 'Qwik first app',
    },
  ],
};
