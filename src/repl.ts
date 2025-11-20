import { commandExit } from "./command_exit.js"
import { State, CLICommand } from "./state.js";
import { commandHelp } from "./command_help.js";
import { commandMap } from "./command_map.js";
import { commandMapb } from "./command_mapb.js";
import { commandExplore } from "./command_explore.js";
import { commandCatch } from "./command_catch.js";
import { commandInspect } from "./command_inspect.js";
import { commandPokedex } from "./command_pokedex.js";


export function getCommands(): Record<string, CLICommand> {
  return {
    exit: {
      name: "exit",
      description: "Exits the pokedex",
      callback: commandExit,
    },
    help: {
      name: "help",
      description: "Displays a help message",
      callback: commandHelp,
    },
    map: {
      name: "map",
      description: "Displays next 20 location areas",
      callback: commandMap,
    },
    mapb: {
      name: "mapb",
      description: "Displays previous 20 location areas",
      callback: commandMapb,
    },
    explore: {
      name: "explore",
      description: "Displays found pokemon",
      callback: commandExplore,
    },
    catch: {
      name: "catch",
      description: "Throwing a Pokeball at Pokemon",
      callback: commandCatch,
    },
    inspect: {
      name: "inspect",
      description: "Check out this Pokemon",
      callback: commandInspect,
    },
    pokedex: {
      name: "pokedex",
      description: "Displays pokedex",
      callback: commandPokedex,
    },
  };
}

export async function startREPL(state: State) {
    //const { createInterface } = require('node:readline');

    state.rl.prompt();

    state.rl.on("line", async (callback: string) => {
        if (!callback) {
            state.rl.prompt();
        } else {
          const args = callback.split(" ");
          const func_callback = args[0];
          const arg = args[1];
            if (func_callback in state.commands) {
                try {
                    await state.commands[func_callback].callback(state, arg);
                    // response
                    //   .then((msg) => {console.log("Done")})
                    //   .catch((err) => {console.log(err);})
                } catch (err) {
                    console.log(err);
                }
            } else {
                console.log("Unknown command");
            }
            state.rl.prompt();
        }
    });

};


export function cleanInput(input: string): string[] {
  input = input.toLowerCase();
  input = input.replace(/ +/g, " ");
  input = input.trim();
  return input.split(" ");
}