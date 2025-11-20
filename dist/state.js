import { createInterface } from "readline";
import { getCommands } from "./repl.js";
import { PokeAPI } from "./pokeapi.js";
export function initState(cacheInterval) {
    const commands = getCommands();
    const newEntry = {};
    const rl = createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: "Pokedex > "
    });
    return { rl: rl, commands: commands, pokeAPI: new PokeAPI(cacheInterval), nextLocationsURL: "", prevLocationsURL: "", Pokedex: newEntry };
}
