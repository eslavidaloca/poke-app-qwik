import { $, component$ } from '@builder.io/qwik';
import { type DocumentHead, useNavigate } from '@builder.io/qwik-city';
import { PokemonImage } from '~/components/pokemons/pokemon-image';
import { usePokemonGame } from '~/hooks/use-pokemon-game';

export default component$(() => {
  const nav = useNavigate();
  const {
    pokemonId,
    showBackImg,
    nextPokemon,
    previousPokemon,
    changeShowBackImg

  } = usePokemonGame();

  // const pokemonGame = useContext(PokemonGameContext); //Moved to the hook

  // const pokemonID = useSignal<number>(1); // primitivos, booleans, strings
  // const showBackImg = useSignal<boolean>(false);


  // Moved to the hook
  // const changePokemonId = $(( value: number ) => {
  //   if ((pokemonGame.pokemonID + value) <= 0) pokemonGame.pokemonID = 903;
  //   else if ((pokemonGame.pokemonID + value) > 1013) pokemonGame.pokemonID = 1;

  //   pokemonGame.pokemonID += value;
  // })

  // Moved to the hook
  // const changeShowBackImg = $(() => {
  //   pokemonGame.showBackImg = !pokemonGame.showBackImg
  // })

  const goToPokemon = $(( id: number) => {
    nav(`/pokemon/${ id }`);
  })

  return (
    <>

      <span class="text-2xl">Pokemon No. </span>
      <span class="text-9xl">{ pokemonId.value }</span>

      <div onClick$={() => goToPokemon(pokemonId.value) }>
        <PokemonImage
          id={ pokemonId.value }
          backImg={ showBackImg.value }
        />
      </div>
      {/* <Link href={`/pokemon/${ pokemonGame.pokemonID }/`}> */}
        {/* <PokemonImage
          id={ pokemonGame.pokemonID }
          backImg={ pokemonGame.showBackImg } 
        /> */}
      {/* </Link> */}

      <div class="mt-2 p-2">
        <button onClick$={ previousPokemon } class="btn btn-primary mr-2">Anterior</button>
        <button onClick$={ nextPokemon } class="btn btn-primary mr-2">Siguiente</button>

        <button onClick$={ changeShowBackImg } class="btn btn-primary">Voltear</button>
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
