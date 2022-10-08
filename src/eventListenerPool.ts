// Super simple class to allow many listeners for a single event

import {Random} from "./random";
import {SAFE_ID_SIZE} from "./constants";

export class EventListener<T> {
    public readonly id: string;
    public readonly handler: (payload: T) => void
    public readonly pool: EventListenerPool<T>;

    constructor(pool: EventListenerPool<T>, handler: (payload: T) => void) {
        this.id = Random.alphanumeric(SAFE_ID_SIZE);
        this.pool = pool;
        this.handler = handler;
    }


    public remove() {
        this.pool.remove(this);
    }
}

export default class EventListenerPool<T> {
    private readonly pool: {[id: string]: EventListener<T>};

    constructor() {
        this.pool = {};
    }

    public listen(handler: (payload: T) => void): EventListener<T> {
        const listener = new EventListener<T>(this, handler);
        this.pool[listener.id] = listener;
        return listener;
    }

    public remove(listener: EventListener<T>) {
        if (listener.id in this.pool) {
            delete this.pool[listener.id];
        }
    }

    public emit(payload: T) {
        for (const id in this.pool) {
            this.pool[id].handler(payload);
        }
    }
}