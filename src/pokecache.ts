export type CacheEntry<T> = {
    createdAt: number;
    val: T;
}

export class Cache {
  #cache = new Map<string, CacheEntry<any>>();
  #reapIntervalId: (NodeJS.Timeout | undefined) = undefined;
  #interval: number = 0;

  constructor(interval: number) {
    this.#interval = interval;
    this.#startReapLoop();
  }

  add<T>(key: string, val: T) {
    const ce: CacheEntry<T> = {
        createdAt: Date.now(),
        val: val,
    }
    this.#cache.set(key, ce);
  }

  get<T>(key: string): (undefined | T) {
    const entry = this.#cache.get(key);
    if (entry !== undefined) {
        return entry.val as T;
    } else {
        return undefined;
    }
  }

  #reap() {
    for (let [key, value] of this.#cache) {
        console.log(`${key}.createdAt: ${value.createdAt}`);
        if (Date.now() - value.createdAt > this.#interval) {
            this.#cache.delete(key);
            console.log(`Removed ${key} at ${Date.now()}`);
        }
    }
  }
  
  #startReapLoop() {
    this.#reapIntervalId = setInterval(() => {this.#reap();}, this.#interval);
  }

  stopReapLoop() {
    if (this.#reapIntervalId) {
      clearInterval(this.#reapIntervalId);
      this.#reapIntervalId = undefined;
    }
  }
}