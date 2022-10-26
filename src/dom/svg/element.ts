import {H_Element} from "../element";

export class H_SVGElement extends H_Element {
    private _fill: string;
    private _stroke: string;
    private _strokeWidth: number;

    public get fill() { return this._fill; }
    public set fill(color: string) {
        this._fill = color;
        this.setAttribute('fill', this.fill);
    }

    public get stroke() { return this._stroke; }
    public set stroke(color: string) {
        this._stroke = color;
        this.setAttribute('stroke', this.stroke);
    }

    public get strokeWidth() { return this._strokeWidth; }
    public set strokeWidth(width: number) {
        this._strokeWidth = width;
        this.setAttribute('stroke-width', this.strokeWidth);
    }
}