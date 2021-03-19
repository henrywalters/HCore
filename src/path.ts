import PathParameters, { isUndefined, PathParameter, PathParameterMap } from "./pathParameters";

export interface VariablePathToken {
    var: string;
    required: boolean;
}

export interface RegularPathToken {
    token: string;
}

export function IsVariablePathToken(obj: PathToken): obj is VariablePathToken {
    return 'var' in obj && 'required' in obj;
}

export type PathToken = VariablePathToken | RegularPathToken;

export const RegularPathTokenRegex = /^[a-zA-Z]+$/
export const VariablePathTokenRegex = /(?:\:)\b(\w*)\b/
export const OptionalVariablePathTokenRegex = /(?:\:)\b(\w*)\b(?=\?)/

/**
 * Path is a class which allows variable parameters.
 * To use a variable parameter, start a part with :
 * To make a variable parameter optional, end it with
 * a ?
 * 
 * Ex: `api/:api/organization/:orgId?
 */
export default class Path {

    public raw: string;
    public tokens: PathToken[];
    public params: PathParameters;

    constructor(path: string, params: PathParameterMap = {}) {
        this.raw = path;
        this.tokens = Path.parseRawPath(this.raw);
        this.params = Path.initializePathParameters(this.tokens, params);
    }

    public static initializePathParameters(tokens: PathToken[], vals: PathParameterMap = {}): PathParameters {
        const params: PathParameter[] = [];
        
        for (const token of tokens) {
            if (IsVariablePathToken(token)) {
                params.push({
                    varName: token.var,
                    required: token.required,
                    value: vals.hasOwnProperty(token.var) ? vals[token.var] : void 0,
                })
            }
        }

        return new PathParameters(params, vals);
    }

    public static parseRawPath(path: string): PathToken[] {
        const tokens: PathToken[] = [];
        const rawParts = path.split('/');
        for (const part of rawParts) {
            // Leading or trailing parts
            if (part.length === 0) {
                continue;
            } else if (RegularPathTokenRegex.test(part)) {
                tokens.push({token: part});
            } else if (OptionalVariablePathTokenRegex.test(part)) {
                tokens.push({var: part.slice(1, part.length - 1), required: false});
            } else if (VariablePathTokenRegex.test(part)) {
                tokens.push({var: part.slice(1), required: true});
            } else {
                throw new Error("Invalid token for path: " + part);
            }
        }
        return tokens;
    }

    public get path() {

        if (!this.params.hasValidParameters()) {
            throw new Error("This path has invalid or missing parameters");
        }

        return this.tokens.filter(token => {
            if (IsVariablePathToken(token) && !token.required) {
                if (isUndefined(this.params.getParam(token.var))) {
                    return false;
                }
            }

            return true;
        }).map(token => {
            if (IsVariablePathToken(token)) {
                return this.params.getParam(token.var);
            } else {
                return token.token;
            }
        }).join('/');
    }
}