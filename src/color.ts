import Jimp from 'jimp/es';
import { ASCII_COLOR_CHARACTERS } from './constants';
import { Vector } from './math/vector';

export interface IColor {
    rgba: number[];
}

export class Color implements IColor {
    public rgba: number[];

    constructor(rgba: number[] = [0, 0, 0, 255]) {
        this.rgba = rgba;
    }

    private static FromJimp(color: any) {
        return new Color([
            color.r,
            color.g,
            color.b,
            color.a,
        ]);
    }

    public static FromInt(int: number) {
        const color = Jimp.intToRGBA(int);
        return this.FromJimp(color);
    }

    public static FromHex(hex: string) {
        const color = Jimp.cssColorToHex(hex);
        return this.FromJimp(color);
    }

    public intensity(): number {
        return this.rgba[0] * 0.3 + this.rgba[1] * 0.59 + this.rgba[2] * 0.11;
    }

    public get int(): number {
        return Jimp.rgbaToInt(this.rgba[0], this.rgba[1], this.rgba[2], this.rgba[3]);
    }

    public get ascii(): string {
        const intensity = this.isGrayscale() ? this.rgba[0] : this.intensity();
        let index = ASCII_COLOR_CHARACTERS.length - Math.floor((intensity / 255) * ASCII_COLOR_CHARACTERS.length) - 1;
        index = index < 0 ? 0 : index;
        return ASCII_COLOR_CHARACTERS[index];
    }

    public get vector(): Vector {
        return new Vector(...this.rgba);
    }

    public isGrayscale(): boolean {
        return this.rgba[0] === this.rgba[1] && this.rgba[1] === this.rgba[2];
    }

    public toGrayscale(): Color {
        const sum = this.intensity();
        return new Color([
            sum,
            sum,
            sum,
            this.rgba[3],
        ])
    }

    public toInt(): number {
        return Jimp.rgbaToInt(this.rgba[0], this.rgba[1], this.rgba[2], this.rgba[3]);
    }
}