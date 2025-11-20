//import { resourceLimits } from "worker_threads";
import { Cache, CacheEntry } from "./pokecache.js";

export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2";
  private cache: Cache;

  constructor(cacheInterval: number) {
    this.cache = new Cache(cacheInterval);
  }

  closeCache() {
    this.cache.stopReapLoop();
  }

  async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
    let url: string = "";
    if (pageURL) {
      url = pageURL;
    } else {
      url = PokeAPI.baseURL + "/location-area/";
    }

    //get from cache
    if (this.cache.get(url) !== undefined) {
        console.log("(From cache)");
        return new Promise<ShallowLocations>((resolve, reject) => {
        const SL = this.cache.get(url) as ShallowLocations;
        if (false) {
            throw new Error('No reason but to reject');
        }
        setTimeout( () => {
            resolve(SL);
        }, 0);
    });

    } else {
        //make a call
        console.log("(New call)");
        try {
          const response = await fetch(url);
          const result: ShallowLocations = await response.json();

        //cache the result
          this.cache.add(url, result);

          return result;
        } catch (error) {
            throw error;
        }
      }
  }

  async fetchLocation(locationName: string): Promise<Location> {
    const url = PokeAPI.baseURL + `/location-area/${locationName}/`;

    const cached = this.cache.get<Location>(url);
    if (cached) {
      return cached;
    }

    try {
      const response = await fetch(url);

      const location: Location = await response.json();
      return location;
    } catch (error) {
        throw new Error(`Error fetching location '${locationName}': ${(error as Error).message}`);
    }
  }

    async fetchPokemon(pokemonName: string): Promise<Pokemon> {
    const url = PokeAPI.baseURL + `/pokemon/${pokemonName}/`;

    // const cached = this.cache.get<Location>(url);
    // if (cached) {
    //   return cached;
    // }

    try {
      const response = await fetch(url);

      const pokemon: Pokemon = await response.json();
      return pokemon;
    } catch (error) {
        throw new Error(`Error fetching Pokemon '${pokemonName}': ${(error as Error).message}`);
    }
  }
}

export type ShallowLocations = {
  count: number;
  next: string;
  previous: string;
  results: {
    name: string;
    url: string;
  }[];
};

export type Location = {
  encounter_method_rates: {
    encounter_method: {
      name: string;
      url: string;
    };
    version_details: {
      rate: number;
      version: {
        name: string;
        url: string;
      };
    }[];
  }[];
  game_index: number;
  id: number;
  location: {
    name: string;
    url: string;
  };
  name: string;
  names: {
    language: {
      name: string;
      url: string;
    };
    name: string;
  }[];
  pokemon_encounters: {
    pokemon: {
      name: string;
      url: string;
    };
    version_details: {
      encounter_details: {
        chance: number;
        condition_values: any[];
        max_level: number;
        method: {
          name: string;
          url: string;
        };
        min_level: number;
      }[];
      max_chance: number;
      version: {
        name: string;
        url: string;
      };
    }[];
  }[];
};

export type Pokemon = {
  base_experience: number;
  id: number;
  name: string;
  height: number;
  weight: number;
  stats: Stat[];
  types: Type[];
}

export type Stat = {
  base_stat: number
  effort: number
  stat: Stat2
}

export type Stat2 = {
  name: string
  url: string
}

export type Type = {
  slot: number
  type: Type2
}

export type Type2 = {
  name: string
  url: string
}