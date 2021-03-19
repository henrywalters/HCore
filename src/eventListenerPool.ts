// Super simple class to allow many listeners for a single event
export default class EventListenerPool<T> {
    private pool: Array<(payload: T) => void>;

    constructor() {
        this.pool = [];
    }

    public listen(handler: (payload: T) => void) {
        this.pool.push(handler);
    }

    public emit(payload: T) {
        for (const listener of this.pool) {
            listener(payload);
        }
    }
}