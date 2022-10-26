export function createHtmlElement(type: string, attribs: {[key: string]: string | number}, namespace: string | null = null): HTMLElement {
    let element: HTMLElement;
    if (namespace === null) {
        element = document.createElement(type);
    } else {
        element = document.createElementNS(namespace, type) as HTMLElement;
    }

    for (const key in attribs) {
        const value = attribs[key];
        element.setAttribute(key, typeof value === 'number' ? value.toString() : value);
    }

    return element;
}