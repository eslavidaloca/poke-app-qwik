import { component$ } from '@builder.io/qwik';
import { routeLoader$ } from '@builder.io/qwik-city';

interface Props {
    id: number;
}

// Create a routeLoader$ to fetch data from the API endpoint
export const useApiData = routeLoader$(async (requestEvent) => {
    const id = requestEvent.params.id;
    console.log(id);
    // const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${ id }`);
    // return await response.json();
});

export const PokemonData =  component$(({ id }: Props) => {
    // Use the custom hook created by routeLoader$ to access the fetched data
    const apiData = useApiData();

    return (
        <div>
        {/* Render the fetched data */}
        {/* {apiData.value.map(item => (
            <p key={item.id}>{item.name}</p>
        ))} */}
        oaaa
        </div>
    );
});