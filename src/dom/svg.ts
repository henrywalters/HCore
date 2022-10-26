import {H_Element} from "./element";
import {createHtmlElement} from "./utils";

export const SVG_NAMESPACE = "http://www.w3.org/2000/svg";

export class H_SVG extends H_Element {
    protected constructElement(): HTMLElement {
        return createHtmlElement('svg', {}, SVG_NAMESPACE);
    }
}