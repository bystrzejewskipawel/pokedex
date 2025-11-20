export async function commandMap(state) {
    const locations = await state.pokeAPI.fetchLocations(state.nextLocationsURL);
    if (locations.next !== null)
        state.nextLocationsURL = locations.next;
    if (locations.previous !== null)
        state.prevLocationsURL = locations.previous;
    for (const key in locations.results) {
        console.log(`${locations.results[key].name}`);
    }
    ;
}
