import * as model from './model.js';
import recipeView from './views/recipeView.js';

// Polyfilling everything else
import 'core-js/actual';
import 'regenerator-runtime/runtime';
import recipeView from './views/recipeView.js';

///////////////////////////////////////
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

// show-Recipe
const controlRecipes = async function() {
    try {
        const id = window.location.hash.slice(1);

        if (!id) return;
        recipeView.renderSpinner(recipeContainer);

        // 1) Loading recipe
        await model.loadRecipe(id);

        // 2) Rendering recipe
        recipeView.render(model.state.recipe);
    } catch (error) {
        console.error(error);
        alert(error);
    };
};

['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipes));
