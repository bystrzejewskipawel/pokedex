export async function commandPokedex(state) {
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
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}
