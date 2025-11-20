import { State } from "./state.js";

export async function commandMap(state: State): Promise<void>  {
    const locations = await state.pokeAPI.fetchLocations(state.nextLocationsURL);
    if (locations.next !== null) state.nextLocationsURL = locations.next;
    if (locations.previous !== null) state.prevLocationsURL = locations.previous;
    for (const key in locations.results) {
        console.log(`${locations.results[key].name}`)
    };
}