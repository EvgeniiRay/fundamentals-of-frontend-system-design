/**
 * @param sample {object}
 * @param count {number}
 * @param page {number}
 */
export function initMockDB(sample, count = 100, page = 10) {
    let data = Array.from({length: count}, (_, i) => {
        return Object.fromEntries(
            Object
                .entries(sample)
                .map(([k, v]) => [k, `[Entry ${i}] - ${v}`]))
    });

    data = Array.from({length: Math.ceil(data.length / page)}, (x, i) => data.slice(
        i * page,
        i * page + page
    ));
    let index = -1;
    function getPage(pointer) {
        return new Promise((res) => {
            setTimeout(() => {
                pointer < 0 || pointer > data.length - 1
                    ? res([])
                    : res(data[index=pointer]);
            }, 1000);
        });
    }
    return { getPage }
}