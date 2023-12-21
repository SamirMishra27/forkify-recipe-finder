import { TIMEOUT_SEC } from "./config";

const timeout = function (s) {
    return new Promise(function (_, reject) {
        setTimeout(function () {
            reject(new Error(`Request took too long! Timeout after ${s} second`));
        }, s * 1000);
    });
};

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

export const getJSON = async function (url) {
    try {
        const response = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]);

        // Get data from response
        const data = await response.json();

        // Throw error if response is not ok
        if (!response.ok) throw new Error(`${data.message} (${res.status})`);

        return data;
    } catch (err) {
        throw err;
    }

};
