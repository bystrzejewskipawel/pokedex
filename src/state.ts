import { createInterface, type Interface } from "readline";
import { getCommands } from "./repl.js";
import { PokeAPI, Pokemon } from "./pokeapi.js";

export type CLICommand = {
  name: string;
  description: string;
  callback: (state: State, ...args: string[]) => Promise<void>;
};

export type State = {
    rl: Interface;
    commands: Record<string, CLICommand>;
    pokeAPI: PokeAPI;
    nextLocationsURL: string;
    prevLocationsURL: string;
    Pokedex: Record<string, Pokemon>;
}

export function initState(cacheInterval: number): State {
    const commands = getCommands();

    type PokedexEntry = Record<string, Pokemon>;
    const newEntry = {} as PokedexEntry;

    const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "Pokedex > "
    });

    return {rl: rl, commands: commands, pokeAPI: new PokeAPI(cacheInterval), nextLocationsURL: "", prevLocationsURL: "", Pokedex: newEntry};
}