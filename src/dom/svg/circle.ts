import {createHtmlElement} from "../utils";
import {Vector} from "../../math/vector";
import {SVG_NAMESPACE} from "../svg";
import {H_SVGElement} from "./element";

export class H_SVGCircle extends H_SVGElement {

    private _radius: number;
    private _pos: Vector;

    constructor(radius: number, pos: Vector) {
        super();
        this.radius = radius;
        this.pos = pos;
    }

    protected constructElement(): HTMLElement {
        return createHtmlElement('circle', {}, SVG_NAMESPACE);
    }

    public get radius() { return this._radius; }
    public set radius(radius: number) {
        this._radius = radius;
        this.setAttribute('r', this.radius);
    }

    public get pos() { return this._pos; }
    public set pos(pos: Vector) {
        this._pos = pos;
        this.setAttribute('cx', this.pos.x);
        this.setAttribute('cy', this.pos.y);
    }
}