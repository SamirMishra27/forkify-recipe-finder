const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
    return new Promise(function (_, reject) {
        setTimeout(function () {
            reject(new Error(`Request took too long! Timeout after ${s} second`));
        }, s * 1000);
    });
};

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////
import { convertSnakeCaseToCamelCase } from './utils.js'

const showRecipe = async function() {
    try {
        const response = await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bc886`);

        const data = await response.json();

        if (!response.ok) throw new Error(`${data.message} (${res.status})`);
        const recipe = convertSnakeCaseToCamelCase(data.data.recipe);
        console.log(recipe);

        // console.log(response, data);
    } catch (error) {
        alert(error)
    };
};

showRecipe();
