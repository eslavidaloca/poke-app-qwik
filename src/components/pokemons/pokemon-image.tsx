import { component$, useComputed$, useSignal, useTask$ } from "@builder.io/qwik";

interface Props {
    id      : number | string;
    size?   : number;
    backImg?: boolean;
    noVisible?: boolean;
}

export const PokemonImage = component$(( { id, size = 200, backImg = false, noVisible=false }: Props ) => {

    const imageLoaded = useSignal(false);

    useTask$(({ track }) => {
        track( () => id );

        imageLoaded.value = false;
    });

    const imageUrl = useComputed$( () => {
        return( backImg )
            ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${ id }.png`
            : `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${ id }.png`
    })

    // let imgURL = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${ id }.png`

    // if(backImg) imgURL = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${ id }.png`

    return (
        <div class="flex items-center justify-center"
            style={{ width: `${ size }px`, height: `${ size }px` }}>
            { !imageLoaded.value && <span>Cargando...</span> }
            <img 
                src={imageUrl.value }
                alt="Imagen de pokemon"
                style={{ width: `${ size }px` }}
                onLoad$={ () => {
                    imageLoaded.value = true;
                }}
                class={[{ 
                    "hidden": !imageLoaded.value,
                    "brightness-0": noVisible
                }, "transition-all"]}
            />
        </div>
    )  
})