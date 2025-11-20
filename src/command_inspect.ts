import { Pokemon } from "./pokeapi.js";
import { State } from "./state.js";

export async function commandInspect(state: State, pokemonName: string): Promise<void>  {
    if (!pokemonName) {
        console.log("Please provide valid name");
        return;
    }
    const pkmn = state.Pokedex[pokemonName];
    if (!pkmn){
        console.log("you have not caught that pokemon");
        return;
    }

    console.log(`Name: ${pokemonName}`);
    console.log(`Height: ${pkmn.height}`);
    console.log(`Weight: ${pkmn.weight}`);
    console.log(`Stats:`);
    for (const key in pkmn.stats) {
        console.log(`\t-${pkmn.stats[key].stat.name}: ${pkmn.stats[key].base_stat}`)
    }
    console.log(`Types:`);
    for (const key in pkmn.types) {
        console.log(`\t-${pkmn.types[key].type.name}`)
    }
}

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}