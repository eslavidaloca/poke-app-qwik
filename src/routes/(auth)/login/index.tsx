import { component$, useStylesScoped$ } from '@builder.io/qwik';

import styles from './login.css?inline';
import { Form, routeAction$, zod$, z } from '@builder.io/qwik-city';

export const useLoginAction = routeAction$(( data, { cookie, redirect }) => {
    const { email, password } = data;

    if( email.includes('@') && password.length >= 6 ) {
        cookie.set('jwt', 'JWT_de_prueba', { secure: true, path: '/' });
        redirect(302, '/');
        return {
            success: true,
            jwt: 'JWT_de_prueba'
        };
    }

    return {
        success: false
    };
    
}, zod$({
    email: z.string().email('Formato invalido'),
    password: z.string().min(6, 'Mínimo 6 caracteres')
}));

export default component$(() => {

    useStylesScoped$(styles);

    const action = useLoginAction();

    return (
        <Form action={ action } class="login-form mt-5">
            <div class="relative">
                <input name="email" type="text" placeholder="Email address" />
                <label for="email">Email Address</label>
            </div>
            <div class="relative">
                <input name="password" type="password" placeholder="Password" />
                <label for="password">Password</label>
            </div>
            <div class="relative">
                <button type='submit'>Ingresar</button>
            </div>

            <p>
                { action.value?.success &&(
                    <code>Autenticado: Token: { action.value.jwt }</code>
                ) }
            </p>

            <code>
                { JSON.stringify( action.value, undefined , 2 ) }
            </code>
        </Form>
    )
});