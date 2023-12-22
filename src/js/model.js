import { convertSnakeCaseToCamelCase as convertData, getJSON } from './helpers.js'
import { API_URL } from './config.js';

export const state = {
    recipe: {},
    search: {
        query: '',
        results: [],
    },
};

export const loadRecipe = async function(id) {
    try {
        // Get the data from the API
        const data = await getJSON(`${API_URL}${id}`);

        // Store recipe in state
        state.recipe = convertData(data.data.recipe);
    } catch (err) {
        console.error(err);
        throw err;
    };
};

export const loadSearchResults = async function(query) {
    try {
        state.search.query = query;
        const data = await getJSON(`${API_URL}?search=${query}`);
        console.log(data);

        state.search.results = data.data.recipes.map(recipe => convertData(recipe));
    } catch (error) {
        console.error(error);
        throw error;
    };
};
loadSearchResults('pizza');
