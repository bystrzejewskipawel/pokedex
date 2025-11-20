import { State } from "./state.js";

export async function commandExplore(state: State, locationName: string): Promise<void>  {
    if (!locationName) {
        console.log("Please provide valid location");
        return;
    }
    const location = await state.pokeAPI.fetchLocation(locationName);
    if (location) {
        console.log("Found Pokemon:");
        for (let key in location.pokemon_encounters) {
            console.log(`- ${location.pokemon_encounters[key].pokemon.name}`)
        };
    } else {
        console.log("No Pokemon Found");
        return;
    }
}