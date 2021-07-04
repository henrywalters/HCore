import { TIMEOUT } from 'dns';
import EventListenerPool from './eventListenerPool';
import { FileSystem } from './fileSystem';
import Path from './path';
import { Random } from './random';
import Tests from './tests';
import Type from './type';
import WebUtils from './webUtils';

export {HashMap} from './structures/hashMap';
export {PathParameter, PathParameterMap} from './pathParameters';

const HCore = {
    Path: Path,
    Random: Random,
    EventListenerPool: EventListenerPool,
    Type: Type,
    Tests: Tests,
}

export const HCoreWeb = {
    WebUtils: WebUtils,
}

export const HCoreServer = {
    FileSystem: FileSystem,
}

export default HCore;