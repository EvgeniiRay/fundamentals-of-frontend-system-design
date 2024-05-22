const defaultObserverConfig = { threshold: 0.25 };

/**
 * @param target   {HTMLElement[]}
 * @param callback {IntersectionObserverCallback}
 * @param config   {IntersectionObserverInit}
 * @return {IntersectionObserver}
 */
export function intersectionObserver(
    target,
    callback,
    config
) {
    const observerInit = Object.assign({}, defaultObserverConfig, config ?? {});
    const observer = new IntersectionObserver(callback, observerInit);
    setTimeout(() => {
        target.forEach(t => observer.observe(t))
    }, 100);
    return observer;
}
