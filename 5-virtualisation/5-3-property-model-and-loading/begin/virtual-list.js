import {intersectionObserver} from "../../../utils/observer.js";

function getObservers() {
    return [
        document.getElementById('bottom-observer'),
        document.getElementById('top-observer')
    ];
}

function getVirtualList() {
    return document.getElementById('virtual-list');
}

/**
 * Part 3 - Loading
 *
 * Define property model of VirtualList component
 * 1. `getPage`        -  A function that retrieves data for a given page number.
 * 2. `pageSize`       - A variable that determines how many elements to render, helping us understand the scope of each data chunk.
 * 3. `getTemplate`    - A function that takes a piece of data (datum) and returns an HTMLElement. This allows for flexible visual representation of each item.
 * 4. `updateTemplate` - updates an HTMLElement with new data.
 *
 * Load new elements
 * 1. Update index.html to use `initMockDB` function for mock data
 * 2. Create getTemplate and updateTemplate functions
 * 3. Init virtual list with a new set of properties
 * 4. Define state and end state variables on the Virtual List class
 * 5. Fetch data on bottom observer intersection
 * 6. Append new card elements
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
     *    .top-observer+
     *    #virtual-list+
     *    #bottom-observer
     * @returns {string}
     */
    toHTML() {
        return `<div id="container">
        <div id="top-observer">Top Observer</div>
        <main id="virtual-list"></main>
        <div id="bottom-observer">Bottom Observer</div>
        </div>`.trim();
    }

    /**
     * Renders the content to the provided root container and runs
     * any additional side effects
     * @returns void
     */
    render() {
        this.root.innerHTML = this.toHTML();
        this.#effect()
    }

    /**
     * Registers Events / Observers, this function is run after initial render
     * @returns void
     */
    #effect() {
        intersectionObserver(
            getObservers(),
             this.#handleIntersection(),
            {}
        )
    }

    /**
     * Callback implementation for Top and Bottom Intersection observers
     * @return {IntersectionObserverCallback}
     */
     #handleIntersection() {
        return (entries) => {
            for (const entry of entries) {
                if (entry.isIntersecting) {
                    const id = entry.target.id;
                    if (id === 'top-observer') {
                        void this.#handleTopObserver()
                    } else if (id === 'bottom-observer') {
                        void this.#handleBottomObserver()
                    }
                }
            }
        }
    }

    /**
     * Handles Bottom Observer Intersection event
     * @returns Promise<void>
     */
    async #handleBottomObserver() {}

    /**
     * Handles Top Observer Intersection event
     * @returns Promise<void>
     */
    async #handleTopObserver() {}

}