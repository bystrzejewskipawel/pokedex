import { State } from "./state.js";

export async function commandMapb(state: State): Promise<void>  {
    if (!state.prevLocationsURL) {
        console.log("You're on the first page");
        return;
    }
    const locations = await state.pokeAPI.fetchLocations(state.prevLocationsURL);
    if (locations.next !== null) state.nextLocationsURL = locations.next;
    if (locations.previous !== null) state.prevLocationsURL = locations.previous;
    for (const key in locations.results) {
        console.log(`${locations.results[key].name}`)
    };
}