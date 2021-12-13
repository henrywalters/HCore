export enum CaseType {
    CapCase = 'CAP CASE',
    UpperCase = 'Upper Case',
    LowerCase = 'lower case',
    SnakeCase = 'snake_case',
    KebabCase = 'kebab-case',
    CamelCase = 'camelCase',
    PascalCase = 'PascalCase',
}

export const CASE_TYPE_SEPERATORS = {
    [CaseType.CapCase]: ' ',
    [CaseType.UpperCase]: ' ',
    [CaseType.LowerCase]: ' ',
    [CaseType.SnakeCase]: '_',
    [CaseType.KebabCase]: '-',
    [CaseType.CamelCase]: '',
    [CaseType.PascalCase]: '',
}

export class Casing {
    private static toFirstLetterUpperCase(input: string) {
        return input.slice(0, 1).toLocaleUpperCase() + input.slice(1, input.length).toLocaleLowerCase();
    }

    private static convertWordToCaseTypeLetterType(input: string, sentenceIndex: number, caseType: CaseType) {
        if (CASE_TYPE_SEPERATORS[caseType] !== '' && input.split(CASE_TYPE_SEPERATORS[caseType]).length !== 1) {
            throw new Error("Input must only be 1 word");
        }
    
        if (caseType === CaseType.CamelCase) {
            return sentenceIndex === 0 ? input.toLocaleLowerCase() : Casing.toFirstLetterUpperCase(input);
        } else if (caseType === CaseType.PascalCase || caseType === CaseType.UpperCase) {
            return Casing.toFirstLetterUpperCase(input);
        } else if (caseType === CaseType.CapCase) {
            return input.toLocaleUpperCase();
        } else {
            return input.toLocaleLowerCase();
        }
    }

    public static split(input: string, caseType: CaseType): string[] {
        let parts: string[] = [];
    
        if (caseType === CaseType.CamelCase || caseType === CaseType.PascalCase) {
            // Split by upper case 
    
            let currString = '';
    
            for (let i = 0; i < input.length; i++) {
                if (input[i].toLocaleUpperCase() === input[i]) {
                    if (currString !== '') {
                        parts.push(currString);
                    }
                    currString = '';
                }
                currString += input[i];
            }
            
            if (currString !== '') {
                parts.push(currString);
            }
    
        } else {
            // Split by seperator
            parts = input.split(CASE_TYPE_SEPERATORS[caseType]).filter(word => word !== '')
        }
    
        return parts;
    }

    public static join(input: string[], caseType: CaseType) {
        return input.join(CASE_TYPE_SEPERATORS[caseType]);
    }

    public static getType(input: string): CaseType {
        let type: CaseType;
        let hasType = false;
    
        let seperator: string | null = null;
        const seperators = [' ', '-', '_'];
    
        for (const sep of seperators) {
            if (input.indexOf(sep) !== -1) {
                if (hasType) {
                    throw new Error("Ambiguous Case Type: " + input);
                }
                seperator = sep;
                hasType = true;
            }
        }
    
        if (seperator === null) {
            return input[0] === input[0].toLocaleUpperCase() ? CaseType.PascalCase : CaseType.CamelCase;
        }
    
        if (seperator === ' ') {
            return input.toLocaleUpperCase() === input ? CaseType.CapCase : (input.toLocaleLowerCase() === input ? CaseType.LowerCase : CaseType.UpperCase);
        }
    
        return seperator === '-' ? CaseType.KebabCase : CaseType.SnakeCase;
    }

    public static toType(input: string, caseType: CaseType) {
        const type = Casing.getType(input);
        const parts = Casing.split(input, type);
    
        for (let i = 0; i < parts.length; i++) {
            parts[i] = Casing.convertWordToCaseTypeLetterType(parts[i], i, caseType);
        }
    
        return Casing.join(parts, caseType);
    }
}