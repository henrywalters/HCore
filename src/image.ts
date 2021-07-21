import Jimp from 'jimp/es'
import { Color } from './color';
import { Vector } from './math/vector';

export class Image {

    public readonly size: Vector;
    public readonly image: Jimp;

    constructor(image: Jimp) {
        this.image = image;
        this.size = new Vector(
            this.image.getWidth(),
            this.image.getHeight(),
        );
    }

    public static async FromFile(filename: string): Promise<Image> {
        return new Promise<Image>(async (res, rej) => {
            try {
                const rawImage = await Jimp.read(filename);
                res(new Image(rawImage));
            } catch (e) {
                rej(e);
            }
        })
    }

    public static async Empty(size: Vector): Promise<Image> {
        return new Promise<Image>(async (res, rej) => {
            new Jimp(size.x, size.y, (err, image) => {
                if (err) {
                    rej(err);
                }

                res(new Image(image));
            })
        })
    }

    public copy(): Image {
        return new Image(this.image);
    }

    public getPixels(): Color[][] {
        let data: Color[][] = [];
        for (let i = 0; i < this.size.y; i++) {
            let row = [];
            for (let j = 0; j < this.size.x; j++) {
                row.push(Color.FromInt(this.image.getPixelColor(j, i)));
            }
            data.push(row);
        }
        return data;
    }

    public getPixel(x: number, y: number): Color {
        return Color.FromInt(this.image.getPixelColor(x, y));
    }

    public getWindowAverage(pos: Vector, size: Vector) {
        let sum = new Vector(0, 0, 0, 0);
        for (let i = 0; i < size.x; i++) {
            for (let j = 0; j < size.y; j++) {
                const pixel = this.getPixel(pos.data[0] + i, pos.data[1] + j);
                sum.add(pixel.vector.pow(2));
            }
        }
        const sizeSq = size.pow(2);
        return sum.div(sizeSq).forEach(x => Math.sqrt(x));
    }

    public downscale(scale: number) {
        for (let i = 0; i < this.size.x / scale; i++) {
            for (let j = 0; j < this.size.y / scale; j++) {

                const avg = this.getWindowAverage(new Vector(i * scale, j * scale, 0, 0), Vector.Fill(4, scale));

                for (let x = 0; x < scale; x++) {
                    for (let y = 0; y < scale; y++) {
                        const pos = new Vector(i * scale + x, j * scale + y);
                        this.image.setPixelColor(Jimp.rgbaToInt(avg.x, avg.y, avg.z, 1), pos.x, pos.y);
                    }
                }
            }
        }

        return this;
    }

    public toAscii(scale: number): string[][] {
        const output = [];

        for (let i = 0; i < this.size.y / scale; i++) {

            let row = [];
            for (let j = 0; j < this.size.x / scale; j++) {

                const avg = this.getWindowAverage(new Vector(j * scale, i * scale, 0, 0), Vector.Fill(4, scale));
                row.push(new Color(avg.data).ascii);
            }
            output.push(row);
        }

        return output;
    }

    public toGrayscale() {
        for (let i = 0; i < this.size.y; i++) {
            for (let j = 0; j < this.size.x; j++) {
                const color = Color.FromInt(this.image.getPixelColor(j, i)).toGrayscale();
                this.image.setPixelColor(color.toInt(), j, i);
            }
        }

        return this;
    }
}