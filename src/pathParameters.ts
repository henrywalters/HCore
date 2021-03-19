import { HashMap } from "./structures/hashMap";

export type PathParameterType = string | number | undefined;
export type PathParameterMap = HashMap<PathParameterType>;

export interface PathParameter {
    varName: string;
    required: boolean;
    value: PathParameterType;
}

export function isUndefined(variable: PathParameterType): boolean {
    return typeof variable === 'undefined';
}

export default class PathParameters {

    private params: PathParameter[];
    private paramMap: HashMap<PathParameter>;

    constructor(parameters: PathParameter[], params: PathParameterMap = {}) {
        this.params = parameters;
        this.paramMap = {};

        for (const param of this.params) {
            this.paramMap[param.varName] = param;
        }
    }

    public setParam(varName: string, value: PathParameterType) {
        if (this.paramMap.hasOwnProperty(varName)) {
            this.paramMap[varName].value = value;
        }
    }

    public setParams(params: PathParameterMap) {
        for (const varName of Object.keys(params)) {
            this.setParam(varName, params[varName]);
        }
    }

    public getParam(varName: string) {
        if (this.paramMap.hasOwnProperty(varName)) {
            return this.paramMap[varName].value;
        }
    }
    
    public getParams(): PathParameterMap {
        const map: PathParameterMap = {};
        for (const param of this.params) {
            if (!isUndefined(param.value)) {
                map[param.varName] = param.value;
            }
        }
        return map;
    }

    public clearParam(varName: string) {
        if (this.paramMap.hasOwnProperty(varName)) {
            this.paramMap[varName].value = void 0;
        }
    }

    public clearParams(varNames?: string[]) {
        for (const varName of varNames ? varNames : this.params.map(p => p.varName)) {
            this.clearParam(varName);
        }
    }

    public hasValidParameters(): boolean {
        for (const param of this.params) {
            if (param.required && isUndefined(param.value)) {
                return false;
            }
        }
        return true;
    }
}