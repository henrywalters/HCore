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

export default HCore;