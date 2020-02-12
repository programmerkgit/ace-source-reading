/* Gutterと呼ばれるパーツ */


import {EventEmitter} from "./event-emitter";

/* 何故EventEmitterなのか */
export class Gutter extends EventEmitter {
    element: Element;

    constructor(parentElement: Element) {
        super();

        const element = document.createElement("div");
        this.element = element;
        element.classList.add("ace_layer");
        element.classList.add("ace_gutter-layer");
        /* ?? */
        // this.setSh   owFoldWidgets(this.$showFoldWidgets);
        parentElement.appendChild(element);
    }

}
