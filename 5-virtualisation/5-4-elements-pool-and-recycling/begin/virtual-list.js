import {intersectionObserver} from "../../../utils/observer.js";
function getObservers() {
    return [
        document.getElementById('bottom-observer'),
        document.getElementById('top-observer')
    ];
}
function getList() {
    return document.getElementById('virtual-list');
}
export class VirtualList {
    /**
     * @param root {HTMLElement}
     * @param props {{
     *    getPage: <T>(page: number) => Promise<T[]>,
     *    pageSize: number,
     *    getTemplate: (...args:any) => HTMLElement,
     *    updateTemplate: <T>(target: HTMLElement, datum:T) => void,
     * }}
     */
    constructor(root, props) {
        this.props = {...props};
        this.root = root;
        this.start = 0;
        this.end = 0;
    }
    /**
     * Returns an HTML Representation of the component, should have the following structure:
     * #container >
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
    async #handleBottomObserver() {
        const list = getList();
        const data = await this.props.getPage(this.end++);
        const fragment = new DocumentFragment();
        data.map(datum => this.props.getTemplate(undefined,datum))
            .forEach(el => fragment.appendChild(el));
        list.appendChild(fragment);
    }

    /**
     * Handles Top Observer Intersection event
     * @returns Promise<void>
     */
    #handleTopObserver() {}

}