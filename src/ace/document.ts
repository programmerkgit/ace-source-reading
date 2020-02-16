import {EventEmitter} from "./event-emitter";

export class Document extends EventEmitter {
    private readonly lines = [""];

    constructor(lines: string | string[]) {
        super();
        if (typeof lines === "string") {

        } else {

        }
        /* ensure line has at least one char */
        if (this.lines.length === 0) {
            this.lines = [""];
        }
    }

    getLine(row: number): string {
        return this.lines[row] || "";
    }

    getLines(firstRow: number, lastRow: number): string[] {
        return this.lines.slice(firstRow, lastRow + 1);
    }

    /**
     * return copy of lines
     * */
    getAllLines(): string[] {
        return this.getLines(0, this.getLength());
    }

    getLength(): number {
        return this.lines.length;
    }

}
