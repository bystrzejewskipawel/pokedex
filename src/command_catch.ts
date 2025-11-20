import { Pokemon } from "./pokeapi.js";
import { State } from "./state.js";

export async function commandCatch(state: State, pokemonName: string): Promise<void>  {
    if (!pokemonName) {
        console.log("Please provide valid name");
        return;
    }
    const pokemon = await state.pokeAPI.fetchPokemon(pokemonName);
    if (pokemon) {
        console.log(`Throwing a Pokeball at ${pokemonName}...`);
        const chance = getRandomInt(pokemon.base_experience);
        if (chance <= 100) {
            console.log(`${pokemonName} was caught!`);
            // const rec: Record<string, Pokemon> = 
            state.Pokedex[pokemonName] = pokemon;
        } else {
            console.log(`${pokemonName} escaped!`);
        }
    } else {
        console.log("No Pokemon Found");
        return;
    }
}

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}