import {Vector} from "../math/vector";

export class H_Element {
    public readonly element: HTMLElement;

    constructor(element: HTMLElement | null = null) {
        this.element = element === null ? this.constructElement() : element;
    }

    public get html() {
        return this.element;
    }

    protected constructElement(): HTMLElement {
        throw new Error("Unimplemented method");
    }

    protected onAttributeChange(key, value: string | number) {
        console.warn("Unhandled attribute change");
    }

    public setAttribute(key: string, value: string | number) {
        this.element.setAttribute(key, typeof value === 'number' ? value.toString() : value);
    }

    public unsetAttribute(key: string) {
        this.element.removeAttribute(key);
    }

    public insert(child: H_Element) {
        this.element.appendChild(child.html);
    }

    public insertSibling(sibling: H_Element) {
        this.element.parentNode.appendChild(sibling.html);
    }

    public clear() {
        this.element.innerHTML = "";
    }

    public get elementPos() {
        const rect = this.element.getBoundingClientRect();
        return new Vector(rect.left, rect.top);
    }

    public get elementSize() {
        const rect = this.element.getBoundingClientRect();
        return new Vector(rect.width, rect.height);
    }
}