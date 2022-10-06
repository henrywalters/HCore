// Super simple class to allow many listeners for a single event

import {Random} from "./random";

export interface EventListener<T> {
    id: string;
    handler: (payload: T) => void
}

export default class EventListenerPool<T> {
    private readonly pool: {[id: string]: EventListener<T>};

    constructor() {
        this.pool = {};
    }

    public listen(handler: (payload: T) => void): EventListener<T> {
        const listener = {
            id: Random.alphanumeric(16),
            handler,
        }
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