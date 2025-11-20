//import { resourceLimits } from "worker_threads";
import { Cache } from "./pokecache.js";
export class PokeAPI {
    static baseURL = "https://pokeapi.co/api/v2";
    cache;
    constructor(cacheInterval) {
        this.cache = new Cache(cacheInterval);
    }
    closeCache() {
        this.cache.stopReapLoop();
    }
    async fetchLocations(pageURL) {
        let url = "";
        if (pageURL) {
            url = pageURL;
        }
        else {
            url = PokeAPI.baseURL + "/location-area/";
        }
        //get from cache
        if (this.cache.get(url) !== undefined) {
            console.log("(From cache)");
            return new Promise((resolve, reject) => {
                const SL = this.cache.get(url);
                if (false) {
                    throw new Error('No reason but to reject');
                }
                setTimeout(() => {
                    resolve(SL);
                }, 0);
            });
        }
        else {
            //make a call
            console.log("(New call)");
            try {
                const response = await fetch(url);
                const result = await response.json();
                //cache the result
                this.cache.add(url, result);
                return result;
            }
            catch (error) {
                throw error;
            }
        }
    }
    async fetchLocation(locationName) {
        const url = PokeAPI.baseURL + `/location-area/${locationName}/`;
        const cached = this.cache.get(url);
        if (cached) {
            return cached;
        }
        try {
            const response = await fetch(url);
            const location = await response.json();
            return location;
        }
        catch (error) {
            throw new Error(`Error fetching location '${locationName}': ${error.message}`);
        }
    }
    async fetchPokemon(pokemonName) {
        const url = PokeAPI.baseURL + `/pokemon/${pokemonName}/`;
        // const cached = this.cache.get<Location>(url);
        // if (cached) {
        //   return cached;
        // }
        try {
            const response = await fetch(url);
            const pokemon = await response.json();
            return pokemon;
        }
        catch (error) {
            throw new Error(`Error fetching Pokemon '${pokemonName}': ${error.message}`);
        }
    }
}
