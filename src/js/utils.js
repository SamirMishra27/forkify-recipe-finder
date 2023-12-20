/**
 * Convert given object's keys from snake_case to camelCase
 * @param object The object with snake_case like keys
 * @returns A new object with camelCase like keys. Values are not modified
 */
export function convertSnakeCaseToCamelCase(object) {
    return {
        ...Object.keys(object).reduce(
            (newObject, key) => {
                const camelCaseKey = key.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
                newObject[camelCaseKey] = object[key];

                return newObject
            },
            {}  // Initial value
        )
    };
};
