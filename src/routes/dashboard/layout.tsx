import { component$, Slot } from '@builder.io/qwik';
import { routeLoader$ } from '@builder.io/qwik-city';
import Navbar from '~/components/shared/navbar/navbar';

export const useCheckAuthCookie = routeLoader$(({ cookie, redirect }) => {
    
    const jwtCookie = cookie.get('jwt');
    if (jwtCookie?.value === 'JWT_de_prueba' ) {
        console.log(`Cookie value: ${jwtCookie?.value}`);
        return;
    }

    redirect(302, '/');
});

export default component$(() => {
    return (
        <>
            <Navbar />
            <div class="flex flex-col items-center justify-center mt-2">
                <span class="text-5xl">Dashboard Layout</span>
                <Slot />
            </div>
        </>
    );
});