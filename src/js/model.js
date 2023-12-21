import { convertSnakeCaseToCamelCase as convertData, getJSON } from './helpers.js'
import { API_URL } from './config.js';

export const state = {
    recipe: {},
};

export const loadRecipe = async function(id) {
    try {
        // Get the data from the API
        const data = await getJSON(`${API_URL}${id}`);

        // Store recipe in state
        state.recipe = convertData(data.data.recipe);
    } catch (err) {
        alert(err);
        // Temp error handling
        console.error(err);
    };
};
