import * as fs from 'fs'

export class FileStream {
    public totalSize: number;
    public processed: number;
    public path: string;
    public readonly stream: fs.ReadStream;

    constructor(path: string) {
        this.path = path;
        this.totalSize = fs.statSync(path).size;
        this.processed = 0;
        this.stream = fs.createReadStream(path, {
            // highWaterMark: 100
        });
    }

    public async readLines(callback: (line: string, processed?: number) => void): Promise<void> {
        return new Promise<void>((res, rej) => {

            let currentLine = "";

            this.stream.on('data', (chunk: Buffer) => {
                const str = chunk.toString();
                for (let i = 0; i < str.length; i++) {
                    if (str[i] === '\n') {
                        callback(currentLine, this.processed)
                        currentLine = "";
                    } else {
                        currentLine += str[i];
                    }
                    this.processed += Buffer.byteLength(str[i]);
                }
            })
    
            this.stream.on('end', () => {
                res();
            })

            this.stream.on('error', (e) => {
                rej(e);
            })
        })
        
    }

    public async pauseStreaming() {
        this.stream.pause();
    }

    public async resumeStreaming() {
        this.stream.resume();
    }
}