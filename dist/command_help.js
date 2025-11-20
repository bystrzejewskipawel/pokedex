export async function commandHelp(state) {
    console.log(`Welcome to the Pokedex!`);
    console.log(`Usage:`);
    console.log(``);
    for (const key in state.commands) {
        console.log(`${state.commands[key].description}`);
    }
}
