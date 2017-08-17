export class Utils {

    static isPresent(obj) {
        return obj !== undefined && obj !== null;
    }

    static isString(obj) {
        return typeof obj === 'string';
    }

    static isFunction(obj) {
        return typeof obj === 'function';
    }

    static isArray(obj) {
        return Array.isArray(obj);
    }
}
