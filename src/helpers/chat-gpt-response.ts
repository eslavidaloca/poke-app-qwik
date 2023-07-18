import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  //   apiKey: process.env.OPENAI_API_KEY, // Regular way
  apiKey: import.meta.env.OPENAI_API_KEY, // Using vite
});
const openai = new OpenAIApi(configuration);

export const getFunFactAboutPokemon = async (pokemonName: string): Promise<string> => {

    delete configuration.baseOptions.headers['User-Agent'];

    const response = await openai.createCompletion({
      model: "text-babbage-001",
      prompt: `Cuentame datos interesantes sobre el pokemon ${pokemonName}`,
      temperature: 0.8,
      max_tokens: 100,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    return response.data.choices[0].text || `No tengo nada sobre ${ pokemonName }`;
}

