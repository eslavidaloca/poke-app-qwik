import { component$ } from '@builder.io/qwik';
// import { QwikLogo } from '../../icons/qwik';
import { PokemonLogo } from '../../icons/pokemon';
import styles from './navbar.module.css';
import { Link } from '@builder.io/qwik-city';

export default component$(() => {
  return (
    <navbar class={styles.navbar}>
      <div class={['container', styles.wrapper]}>
        <div class={styles.logo}>
          <Link href='/'><PokemonLogo height={50} width={143} /></Link>
        </div>
        <ul>
          <li>
            <Link href='/'>Inicio</Link>
          </li>
          <li>
            <Link href='/pokemon/guess/'>¿Quien es ese pokemon?</Link>
          </li>
          <li>
            <Link href='/pokemons/list-client'>List-Client</Link>
          </li>
          <li>
            <Link href='/pokemons/list-ssr/'>List-SSR</Link>
          </li>
          {/* <li>
            <a href="https://qwik.builder.io/docs/components/overview/" target="_blank">
              Docs
            </a>
          </li>
          <li>
            <a href="https://qwik.builder.io/examples/introduction/hello-world/" target="_blank">
              Examples
            </a>
          </li>
          <li>
            <a href="https://qwik.builder.io/tutorial/welcome/overview/" target="_blank">
              Tutorials
            </a>
          </li> */}
        </ul>
      </div>
    </navbar>
  );
});
