export function parseParams(query) {
    if (!query) return undefined;
    return query.split('&').reduce((obj, item) => {
        const i = item.split('=');
        return {
            ...obj,                                     // Concat with result object
            [i[0]]: !isNaN(i[1]) ?
                Number(i[1]) :
                (() => { try { return JSON.parse(decodeURI(i[1])) } catch { return decodeURI(i[1]) } })() // Cast right hand side to a number if it is a raw number, else try to parse as JSON, otherwise decode string
        }
    }, {});
}