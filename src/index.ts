import EventListenerPool from './eventListenerPool';
import { FileSystem } from './fileSystem';
import Path from './path';
import { Random } from './random';
import { List } from './structures/list';
import Tests, { Test } from './tests';
import Type from './type';
import { HInt } from './types/hint';
import WebUtils from './webUtils';
import { FileStream } from './fileStream';
import { Image } from './image';
import { Vector } from './math/vector';
import { Color } from './color';
import { CaseType, Casing } from './casing';

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
    Vector: Vector,
    Color: Color,
    Image: Image,
    Casing: Casing,
}

console.log(Casing.toType("velocityJump", CaseType.UpperCase));

export default HCore;