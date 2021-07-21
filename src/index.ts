import { TIMEOUT } from 'dns';
import EventListenerPool from './eventListenerPool';
import { FileSystem } from './fileSystem';
import Path from './path';
import { Random } from './random';
import { List } from './structures/list';
import Tests from './tests';
import Type from './type';
import { HInt } from './types/hint';
import WebUtils from './webUtils';
import * as fs from 'fs';
import { FileStream } from './fileStream';
import { Image } from './image';
import { Vector } from './math/vector';

const { performance } = require('perf_hooks');

export {HashMap} from './structures/hashMap';
export {PathParameter, PathParameterMap} from './pathParameters';

const HCore = {
    Path: Path,
    Random: Random,
    EventListenerPool: EventListenerPool,
    Type: Type,
    Tests: Tests,
    WebUtils: WebUtils,
    FileSystem: FileSystem,
    FileStream: FileStream,
    List: List,
}

async function testImages() {
    const t0 = performance.now();
    const raw = await Image.FromFile("/home/henry/Pictures/woman.png");
    const t1 = performance.now();
    const ascii = raw.toAscii(10);
    const t2 = performance.now();
    console.log(new Vector(1 + 1, 1 + 2, 1 + 3, 1 + 4));
    const t3 = performance.now();
    console.log(`Image load: ${t1 - t0}`);
    console.log(`Ascii conversion: ${t2 - t1}`);
    console.log(`test ${t3 - t2}`)
    console.log(ascii.map(x => x.map(y => y + y).join('')).join('\n'));
    raw.downscale(10).toGrayscale();
    raw.image.write("/home/henry/Pictures/woman_output.png");
}

let t0 = performance.now();

(async () => {

    const raw = await Image.FromFile("/home/henry/Pictures/simple.png");

    for (let i = 0; i < 100; i++) {
        const t1 = performance.now();
        console.log(t1 - t0);
        raw.toAscii(1);
        t0 = t1;
    }
})()


//testImages();

export default HCore;