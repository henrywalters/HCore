import {H_SVGElement} from "./element";
import {createHtmlElement} from "../utils";
import {SVG_NAMESPACE} from "../svg";
import {Vector} from "../../math/vector";

export enum H_SVGPathType {
    Line = 'line',
    Bezier = 'bezier',
}

export class H_SVGPath extends H_SVGElement {

    private _start: Vector = Vector.Zero(2);
    private _end: Vector = Vector.Zero(2);
    private _controlPointA: Vector = Vector.Zero(2);
    private _controlPointB: Vector = Vector.Zero(2);
    private _type: H_SVGPathType = H_SVGPathType.Line;
    private _markerStart: string | null = null;
    private _markerEnd: string | null = null;

    constructor(start: Vector = null, end: Vector = null) {
        super();
        this.start = start === null ? Vector.Zero(2) : start;
        this.end = end === null ? Vector.Zero(2) : end;
        this.controlPointA = Vector.Zero(2);
        this.controlPointB = Vector.Zero(2);
    }


    public get start() { return this._start; }
    public set start(pos: Vector) {
        this._start = pos;
        this.update();
    }

    public get end() { return this._end; }
    public set end(pos: Vector) {
        this._end = pos;
        this.update();
    }

    public get type() { return this._type; }
    public set type(type: H_SVGPathType) {
        this._type = type;
        this.update();
    }

    public get controlPointA() {
        return this._controlPointA;
    }

    public set controlPointA(a: Vector) {
        this._controlPointA = a;
        this.update();
    }

    public get controlPointB() {
        return this._controlPointB;
    }

    public set controlPointB(b: Vector) {
        this._controlPointB = b;
        this.update();
    }

    public get markerStart() { return this._markerStart; }
    public set markerStart(start: string | null) {
        this._markerStart = start;
        if (this.markerStart !== null) {
            this.setAttribute('marker-start', this.markerStart);
        } else {
            this.unsetAttribute('marker-start');
        }
    }

    public get markerEnd() { return this._markerEnd; }
    public set markerEnd(end: string | null) {
        this._markerEnd = end;
        if (this.markerEnd !== null) {
            this.setAttribute('marker-end', this.markerEnd);
        } else {
            this.unsetAttribute('marker-end');
        }
    }

    public fancyBracket(weights: Vector = new Vector(0.5, 0.1, 0.5, 0.9)) {
        const delta = Vector.Sub(this.end, this.start);
        this.controlPointA = Vector.Add(this.start, new Vector(delta.x * weights.data[0], delta.y * weights.data[1]));
        this.controlPointB = Vector.Add(this.start, new Vector(delta.x * weights.data[2], delta.y * weights.data[3]));
    }

    private update() {
        let d: string = "";
        switch (this.type) {
            case H_SVGPathType.Line:
                d = `M ${this.start.x} ${this.start.y} L ${this.end.x} ${this.end.y}`;
                break;
            case H_SVGPathType.Bezier:
                d = `M ${this.start.x} ${this.start.y} C ${this.controlPointA.x} ${this.controlPointA.y}, ${this.controlPointB.x} ${this.controlPointB.y}, ${this.end.x} ${this.end.y}`;
                break;
            default:
                throw new Error("Unhandled path type!");
        }

        this.setAttribute('d', d);
    }

    protected constructElement(): HTMLElement {
        return createHtmlElement('path', {}, SVG_NAMESPACE);
    }

}