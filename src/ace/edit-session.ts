import {Event, EventEmitter} from "./event-emitter";

const initialFoldData: any[] = [];
initialFoldData.toString = function () {
    return this.join("\n");
};
const config: any = {};

export class EditSession extends EventEmitter {
    constructor(text: any, mode: any) {
        super();
        this.addEventListener("changeFold", this.onChangeFold);
    }

    private breakpoints = [];
    private decorators = [];

    /* ?? */
    private frontMarkers = {};
    private backMarkers = {};
    private markerId = 1;
    private undoSelect = true;
    private readonly foldData = initialFoldData;
    static uid = 0;
    id = "editor" + ++EditSession.uid;

    onChangeFold(e: Event) {
        var fold = e.data;
        this.resetRowCache(fold.start.row);
    };

    private resetRowCache(docRow: number) {
        if (!docRow) {
            this.docRowCache = [];
            this.screenRowCache = [];
            return;
        }
        const l = this.docRowCache.length;
        const i = this.getRowCacheIndex(this.docRowCache, docRow) + 1;
        if (i < l) {
            this.docRowCache.splice(i, l);
            this.screenRowCache.splice(i, l);
        }
    }

    docRowCache: any[] = [];
    screenRowCache: any[] = [];


    private getRowCacheIndex(cacheArray: any[], val: any): number {
        let low = 0;
        let hi = cacheArray.length - 1;

        /* ?? what is val and cacheArray[mid] */
        while (low <= hi) {
            const mid = (low + hi) >> 1;
            const c = cacheArray[mid];
            if (val < c) {
                hi = mid - 1;
            } else if (val === c) {
                return mid;
            } else if (c < val) {
                low = mid + 1;
            }
        }
        return low - 1;
    };

    /**
     * Returns the current [[Document `Document`]] as a string.
     * @alias EditSession.toString
     **/
    getValue = this.toString = function (): string {
        return this.doc.getValue();
    };

    getTokens(row: number) {
        return this.bgTokenizer.getTokens(row);
    }

    bgTokenizer: any;

    startWorker() {
        try {
            this.worker = this.mode.createWorker(this);
        } catch (e) {
            config.warn("Could not load worker", e);
            this.worker = null;
        }
    }

    mode: any;

    stopWorker() {
        if (this.worker) {
            this.worker.terminate();
            this.worker = null;
        }
    }

    private worker: any;

    getMode() {
        return this.mode;
    }

    /**
     * Returns selection object.
     **/
    getSelection() {
        return this.selection;
    }

    private selection: any;

    private doc: any;

}
