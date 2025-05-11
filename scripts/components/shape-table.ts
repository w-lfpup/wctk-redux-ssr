import { Wc } from "wctk";

class ShapeControls extends HTMLElement {
    #wc = new Wc({host: this});
}

customElements.define('shape-table', ShapeControls);