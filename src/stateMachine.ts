import EventListenerPool from "./eventListenerPool";

class StateListener<V> {
    public activate = new EventListenerPool<V>();
    public deactivate = new EventListenerPool<V>();
}

export class StateMachine<V> {

    public exists(key: string) {
        return key in this.states;
    }

    public add(key: string, state: V) {
        this.checkExists(key, "Already exists", false);
        
        this._states[key] = state;
        this._listeners[key] = new StateListener<V>();

        return state;
    }

    public remove(key: string) {
        this.checkExists(key, "Does not exist");
        if (this.exists(key)) {
            delete this._states[key];
            delete this._listeners[key];
            if (this._activeState === key) {
                this._activeState = void 0;
            }
        }
    }

    public activate(key: string) {
        this.checkExists(key, "Does not exist");
        this.deactivate();
        this._activeState = key;
        this._listeners[key].activate.emit(this.active());
    }

    public deactivate() {
        if (!this._activeState) {
            return;
        }
        this._listeners[this._activeState].deactivate.emit(this.active());
    }

    public onActivate(key: string, handler: (state: V) => void) {
        this._listeners[key].activate.listen(handler);
    }

    public onDeactivate(key: string, handler: (state: V) => void) {
        this._listeners[key].deactivate.listen(handler);
    }

    public get states() {
        return this._states;
    }

    public active(): V {
        if (!this._activeState) { 
            throw new Error("No state is currently active");
        }
        return this._states[this._activeState];
    }

    public activeOrNone(): V | null {
        if (!this._activeState) {
            return null;
        }
        return this._states[this._activeState];
    }

    private _states: { [key: string]: V} = {};
    private _activeState?: string;
    private _listeners: { [key: string]: StateListener<V> } = {};

    private checkExists(key: string, error: string, exists: boolean = true) {
        if ((exists && !this.states[key]) || (!exists && !!this.states[key])) {
            throw new Error(`Error: ${error} on key: '${key}'`);
        }
    }
}