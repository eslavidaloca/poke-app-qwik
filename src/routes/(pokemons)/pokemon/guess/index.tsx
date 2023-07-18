import { component$, useSignal, $, useTask$ } from '@builder.io/qwik';
import { PokemonImage } from '~/components/pokemons/pokemon-image';
import { type DocumentHead } from '@builder.io/qwik-city';
import styles from './guess.module.css';


export default component$(() => {

  const pokemonID = useSignal<number>(Math.floor(Math.random() * 902)); // Existen 902 pokemones
  const showImg = useSignal<boolean>(false);

  useTask$(({ track }) => {
        track( () => pokemonID.value );

        showImg.value = false;
    });

  const changePokemonId = $(() => {
    const newId: number = Math.floor(Math.random() * 902);
    
    pokemonID.value = newId;
  })

  const changeShowImg = $(() => {
    showImg.value = !showImg.value
  })

  return (
    <>

      <span class="text-2xl">¿Quien es ese pokemon?</span>
      {/* <span class="text-9xl">{ pokemonID }</span> */}

      <PokemonImage id={ pokemonID.value } noVisible={ !showImg.value } />
      {/* <PokemonData id={ pokemonID.value } /> */}

      <div class="mt-2 p-2">
        <button onClick$={ () => changePokemonId() } class="btn btn-primary mr-2">Cambiar</button>

        <button onClick$={ () => changeShowImg() } class={showImg.value ? 'hidden' : 'btn btn-primary'}>Revelar</button>
        <button onClick$={ () => changeShowImg() } class={showImg.value ? 'btn btn-primary' : 'hidden'}>Ocultar</button>

      </div>
      

      <p class={styles.hint}>PS: This little app works even when JavaScript is disabled.</p>
    </>
  );
});

export const head: DocumentHead = {
  title: '¿Quien es ese pokemon?',
};
