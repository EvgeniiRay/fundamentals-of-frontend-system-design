import {intersectionObserver} from "../../../utils/observer.js";

/**
 * Standard Margin between cards
 * @type {number}
 */
const MARGIN = 16;

/**
 * Returns top and bottom observer elements
 * @returns {[HTMLElement,HTMLElement]}
 */
const getObservers = () => [
    document.getElementById('top-observer'),
    document.getElementById('bottom-observer')
]

/**
 * Returns a virtual list container
 * @returns {HTMLElement}
 */
function getVirtualList() {
    return document.getElementById('virtual-list');
}

/**
 * Returns a main app container
 * @returns {HTMLElement}
 */
function getContainer() {
    return document.getElementById('container');
}

/**
 * Returns `data-y` attribute of the HTMLElement, if value is provided
 * additionally updates the attribute
 *
 * @param element {HTMLElement}
 * @param value {string | number}
 * @returns {?string}
 */
function y(element, value = undefined) {
    if (value != null) {
        element?.setAttribute('data-y', value);
    }
    return element?.getAttribute('data-y');
}

/**
 * Returns a CSS Transform Style string to Move Element by certain amount of pixels
 * @param value      - value in pixels
 * @returns {string}
 */
function translateY(value) {
    return `translateY(${value}px)`;
}

/**
 * Part 1 - Building skeleton
 *
 * @todo
 * 1. Update toHTML to return the structure described in goal.png
 * 2. Run index.html to see if we render it
 */
export class VirtualList {
    /**
     * @param root
     * @param props {{}}
     */
    constructor(root, props) {
        this.props = {...props};
        this.root = root;
    }

    /**
     * Returns an HTML Representation of the component, should have the following structure:
     * #container>
     *    #top-observer+
     *    #virtual-list+
     *    #bottom-observer
     * @returns {string}
     */
    toHTML() {
        /**
         * Part 1 - App Skeleton
         *  @todo
         */
        return `<div id="container">
            <div id="top-observer">Top Observer</div>
            <div id="virtual-list"></div>
            <div id="bottom-observer">Bottom Observer</div>
        </div>`.trim();
    }

    /**
     * @returns void
     */
    #effect() {
    }

    /**
     * @returns void
     */
    render() {
        this.root.innerHTML = this.toHTML();
        this.#effect()
    }
}