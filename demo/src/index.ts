import {H_SVGCircle} from "../../src/dom/svg/circle";
import {H_SVG} from "../../src/dom/svg";
import {Vector} from "../../src/math/vector";
import {H_SVGPath, H_SVGPathType} from "../../src/dom/svg/path";

let pathType: H_SVGPathType = H_SVGPathType.Line;
let weights: Vector = Vector.Zero(4);

const getWeights = () => {
    weights.data = [
        parseInt((document.getElementById('w0') as HTMLInputElement).value) / 100,
        parseInt((document.getElementById('w1') as HTMLInputElement).value) / 100,
        parseInt((document.getElementById('w2') as HTMLInputElement).value) / 100,
        parseInt((document.getElementById('w3') as HTMLInputElement).value) / 100,
    ];
}

const newPath = (parent: H_SVG): H_SVGPath => {
    let path = new H_SVGPath(centerPoint, mousePos);
    path.type = pathType
    path.fill = "transparent";
    path.stroke = "black";
    parent.insert(path);
    if (pathType === H_SVGPathType.Bezier) {
        path.fancyBracket(weights);
    }
    path.markerEnd = 'url(#arrow)';
    return path;
}

let mousePos: Vector = Vector.Zero(2);

const svg = new H_SVG(document.getElementById('svg'));
const centerPoint = Vector.Scalar(svg.elementSize, 0.5);

const indicatorCircle = new H_SVGCircle(0, mousePos);
svg.insert(indicatorCircle );

let pathIndicator: H_SVGPath = newPath(svg);
pathIndicator.start = centerPoint;
pathIndicator.end = mousePos;

document.getElementById('path-type').addEventListener('change', (e) => {
    pathType = (document.getElementById('path-type') as HTMLSelectElement).value as H_SVGPathType;
    pathIndicator = newPath(svg);
    pathIndicator.start = centerPoint;
    pathIndicator.end = mousePos;
})

for (let i = 0; i < 4; i++) {
    document.getElementById('w' + i).addEventListener('change', () => {
        getWeights();
        pathIndicator.fancyBracket(weights);
    })
}

const center = new H_SVGCircle(10, centerPoint);
center.fill = "red";
svg.insert(center);

svg.html.addEventListener('mousemove', (e) => {
    mousePos.x = e.clientX;
    mousePos.y = e.clientY;
    const svgPos = Vector.Sub(mousePos, svg.elementPos);
    indicatorCircle.pos = svgPos;
    pathIndicator.end = svgPos;

    if (pathType === H_SVGPathType.Bezier) {
        pathIndicator.fancyBracket(weights);
    }
});

svg.html.addEventListener('mouseup', (e) => {
    const circle = new H_SVGCircle(10, indicatorCircle.pos);
    circle.fill = "blue";
    svg.insert(circle);

    const path = newPath(svg);
    path.start = centerPoint;
    path.end = indicatorCircle.pos;
    path.stroke = "black";
    path.fill = "transparent";
    if (pathType === H_SVGPathType.Bezier) {
        path.fancyBracket(weights);
    }
})

