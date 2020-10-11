export function objectCleaner<T>(obj: T): T {
    if (obj) {
        if (typeof obj === 'object') {
            Object
                .keys(obj)
                .filter(key => {
                    if (
                        obj[key] === undefined ||
                        obj[key] === null ||
                        obj[key] === ''
                    ) {
                        return key;
                    }
                })
        }

        return obj;
    }

    return null;
}