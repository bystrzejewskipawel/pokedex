export class Cache {
    #cache = new Map();
    #reapIntervalId = undefined;
    #interval = 0;
    constructor(interval) {
        this.#interval = interval;
        this.#startReapLoop();
    }
    add(key, val) {
        const ce = {
            createdAt: Date.now(),
            val: val,
        };
        this.#cache.set(key, ce);
    }
    get(key) {
        const entry = this.#cache.get(key);
        if (entry !== undefined) {
            return entry.val;
        }
        else {
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
        this.#reapIntervalId = setInterval(() => { this.#reap(); }, this.#interval);
    }
    stopReapLoop() {
        if (this.#reapIntervalId) {
            clearInterval(this.#reapIntervalId);
            this.#reapIntervalId = undefined;
        }
    }
}
