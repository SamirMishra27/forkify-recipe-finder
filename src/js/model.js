import { convertSnakeCaseToCamelCase as convertData } from './utils.js'

export const state = {
    recipe: {},
};

export const loadRecipe = async function(id) {
    try {
        const response = await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes/${id}`);

        // Get data from response
        const data = await response.json();

        // Throw error if response is not ok
        if (!response.ok) throw new Error(`${data.message} (${res.status})`);

        // Store recipe in state
        state.recipe = convertData(data.data.recipe);
    } catch (err) {
        alert(err);
    };
};
