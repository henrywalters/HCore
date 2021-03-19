import { ALPHABET, AMBIGUOUS_CHARACTERS, DIGITS, SPECIAL_CHARACTERS } from "./constants";

export class Random {

    private static generateString(length: number, func: () => string): string {
        let str = '';
        for (let i = 0; i < length; i++) {
            str += func();
        }
        return str;
    }

    // Return a random float within [min, max];
    public static float(min: number = 0, max: number = 1): number {
        return (Math.random() * (max - min)) + min;
    }

    // Return a random int within [min, max);
    public static int(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    // Return a random letter in the alphabet
    public static letter(): string {
        return ALPHABET[Random.int(0, ALPHABET.length)];
    }

    // Return a non-ambiguous letter in the alphabet
    public static letterNonAmbig(): string {
        let ambig = true;
        let letter = '';
        while (ambig) {
            letter = Random.letter();
            if (AMBIGUOUS_CHARACTERS.indexOf(letter) === -1) {
                ambig = false;
            }
        }
        return letter;
    }

    // Return a random digit
    public static digit(): string {
        return DIGITS[Random.int(0, DIGITS.length)];
    }

    // Return a non-ambiguous random digit
    public static digitNonAmbig(): string {
        let ambig = true;
        let digit = '';
        while (ambig) {
            digit = Random.digit();
            if (AMBIGUOUS_CHARACTERS.indexOf(digit) === -1) {
                ambig = false;
            }
        }
        return digit;
    }

    // Return a random special character
    public static specialCharacter(): string {
        return SPECIAL_CHARACTERS[Random.int(0, SPECIAL_CHARACTERS.length)];
    }

    // Return a string of random letters
    public static letters(length: number): string {
        return this.generateString(length, this.letter);
    }

    // Return a string of non-ambiguous random letters
    public static lettersNonAmbig(length: number): string {
        return this.generateString(length, this.letterNonAmbig);
    }

    // Return a string of random digits
    public static digits(length: number): string {
        return this.generateString(length, this.digit);
    }

    // Return a string of non-ambiguous random digits
    public static digitsNonAmbig(length: number): string {
        return this.generateString(length, this.digitNonAmbig);
    }

    // Return a string of random special characters
    public static specialCharacters(length: number): string {
        return this.generateString(length, this.specialCharacter);
    }

    // Return a random alphanumeric string
    public static alphanumeric(length: number): string {
        return this.generateString(length, () => {
            if (Random.int(0, 2) === 1) {
                return Random.digit();
            } else {
                return Random.letter();
            }
        });
    }

    // Return a random alphanumeric string containing no ambiguous characters
    public static alphanumericNonAmbig(length: number): string {
        return this.generateString(length, () => {
            if (Random.int(0, 2) === 1) {
                return Random.digitNonAmbig();
            } else {
                return Random.letterNonAmbig();
            }
        });
    }

    // Return a random token including letters, digits and special characters
    public static token(length: number): string {
        return this.generateString(length, () => {
            const rand = Random.int(0, 3);
            if (rand === 2) {
                return Random.digit();
            } else if (rand === 1) {
                return Random.specialCharacter();
            } else {
                return Random.letter();
            }
        });
    }

}