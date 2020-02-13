
import {EventEmitter} from "./event-emitter";


type Theme = string;


/**
 * Represents a Virtual Renderer.
 * @constructor
 */
export class VirtualRenderer extends EventEmitter {
    constructor(container?: Element, theme?: Theme) {
        super();
        this.container = container || document.createElement("div");
        this.container.appendChild(this.gutter);
        this.container.appendChild(this.scroller);
        this.scroller.appendChild(this.content);
    }

    private static createScroller(): Element {
        const scroller = document.createElement("div");
        scroller.className = "ace_scroller";
        return scroller;
    }

    private static createGutter(): Element {
        const gutter = document.createElement("div");
        gutter.setAttribute("aria-hidden", "true");
        return gutter;
    };

    private static createContent(): Element {
        const content = document.createElement("div");
        content.className = "ace_content";
        return content;
    }

    private readonly container: Element;
    private readonly scroller = VirtualRenderer.createScroller();
    private readonly gutter = VirtualRenderer.createGutter();
    private readonly content = VirtualRenderer.createContent();

}
