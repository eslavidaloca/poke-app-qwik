import { $, component$, useSignal } from '@builder.io/qwik';
import { Link, type DocumentHead, useNavigate } from '@builder.io/qwik-city';
import { PokemonImage } from '~/components/pokemons/pokemon-image';

export default component$(() => {
  const nav = useNavigate();

  const pokemonID = useSignal<number>(1); // primitivos, booleans, strings
  const showBackImg = useSignal<boolean>(false);

  const changePokemonId = $(( value: number ) => {
    if( (pokemonID.value + value) <= 0 ) pokemonID.value = 903;
    else if( (pokemonID.value + value) > 902 ) pokemonID.value = 0;

    pokemonID.value += value;
  })

  const changeShowBackImg = $(() => {
    showBackImg.value = !showBackImg.value
  })

  const goToPokemon = $(() => {
    nav(`/pokemon/${ pokemonID.value }`);
  })

  return (
    <>

      <span class="text-2xl">Pokemon No. </span>
      <span class="text-9xl">{ pokemonID }</span>

      <div onClick$={ () => goToPokemon() }>
        <PokemonImage
          id={ pokemonID.value }
          backImg={ showBackImg.value }
        />
      </div>
      {/* <Link href={`/pokemon/${ pokemonID.value }/`}> */}
        {/* <PokemonImage
          id={ pokemonID.value }
          backImg={ showBackImg.value } 
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
