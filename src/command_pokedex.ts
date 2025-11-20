import { Pokemon } from "./pokeapi.js";
import { State } from "./state.js";

export async function commandPokedex(state: State): Promise<void>  {

    const pokedex = state.Pokedex;

    if (!pokedex) {
        console.log("Pokedex is empty");
        return;
    }

    console.log(`Your Pokedex:`);
    for (const key in pokedex) {
        console.log(` - ${key}`);
    }
}

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}