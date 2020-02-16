import { EventEmitter } from './event-emitter';
import { Ace } from '../../ace';
import Point = Ace.Point;

export class Document extends EventEmitter {
    private readonly lines = [ '' ];
    private autoNewLine: string = '';
    private newLineMode = 'auto';

    constructor(lines: string | string[]) {
        super();
        if (typeof lines === 'string') {

        } else {

        }
        /* ensure line has at least one char */
        if (this.lines.length === 0) {
            this.lines = [ '' ];
        }
    }

    getLine(row: number): string {
        return this.lines[ row ] || '';
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

    positionToIndex(pos: Point, startRow: number = 0) {
        const lines = this.getAllLines();
        const newlineLength = this.getNewLineCharacter().length;
        let index = 0;
        const row = Math.min(pos.row, lines.length);
        for (let i = startRow; i < row; i++) {
            index += lines[ i ].length + newlineLength;
        }
        return index + pos.column;
    }

    getNewLineCharacter(): string {
        switch (this.newLineMode) {
            case 'windows':
                return '\r\n';
            case 'unix':
                return '\n';
            default:
                return this.autoNewLine || '\n';
        }
    }

    setNewLineMode(newLineMode: string) {
        if (this.newLineMode !== newLineMode) {
            this.newLineMode = newLineMode;
            this.signal('changeNewLineMode');
        }
    }

    isNewLine(text: string) {
        return text === '\r\n' || text === '\n' || text === '\r';
    }

    insertFullLines(row: number, lines: string[]) {
        // Clip to document.
        // Allow one past the document end.
        row = Math.min(Math.max(row, 0), this.getLength());

        // Calculate insertion point.
        var column = 0;
        if (row < this.getLength()) {
            // Insert before the specified row.
            lines = lines.concat([ '' ]);
            column = 0;
        } else {
            // Insert after the last row in the document.
            lines = [ '' ].concat(lines);
            row--;
            column = this.lines[ row ].length;
        }

        // Insert.
        this.insertMergedLines({row: row, column: column}, lines);
    };

}
