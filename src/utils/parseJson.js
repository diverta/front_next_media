export function parseJSON(value) {
    if (value === undefined || value === null) {
        // console.log('value is undefined or null')
        return null;
    };
    try {
        return value === 'undefined' ? null : JSON.parse(value ?? '')
    } catch {
        return null;
    }
}