import { $, component$, useComputed$, useStore, useStylesScoped$ } from '@builder.io/qwik';

import styles from './login.css?inline';

export default component$(() => {

    useStylesScoped$(styles);

    const formState = useStore(() => {
       return {
           email: '',
           password: '',
           formPosted: false
       } 
    });

    const emailError = useComputed$(() => {
       if( formState.email.includes('@') ) return '';

       return 'not-valid';
    });

    const passwordError = useComputed$(() => {
       if( formState.password.length >= 6 ) return '';

       return 'not-valid';
    });

    const onSubmit = $(() => {
        formState.formPosted = true;
    });

    const isValid = useComputed$(() => {
        if( emailError.value === '' && passwordError.value === '' ) return true;
        return false;
    })

    return (
        <form onSubmit$={ onSubmit } class="login-form" preventdefault:submit>
            <div class="relative">
                <input
                    value={ formState.email }
                    onInput$={ (ev) => formState.email = (ev.target as HTMLInputElement).value }
                    class={ formState.formPosted ? emailError.value : '' }
                    name="email" type="text" placeholder="Email address" />
                <label for="email">Email Address</label>
            </div>
            <div class="relative">
                <input
                    value ={ formState.password }
                    onInput$={(ev) => formState.password = (ev.target as HTMLInputElement).value}
                    class={ formState.formPosted ? passwordError.value : '' }
                    name="password" type="password" placeholder="Password" />
                <label for="password">Password</label>
            </div>
            <div class="relative">
                <button disabled={ !isValid.value } type='submit'>Ingresar</button>
            </div>


            <code>
                { JSON.stringify( formState, undefined , 2 ) }
            </code>
        </form>
    )
});