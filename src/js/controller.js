import * as model from './model.js';
import recipeView from './views/recipeView.js';

// Poly-filling everything else
import 'core-js/actual';
import 'regenerator-runtime/runtime';
import recipeView from './views/recipeView.js';

///////////////////////////////////////
const recipeContainer = document.querySelector('.recipe');

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
        // alert(error);
    };
};

const init = function() {
    recipeView.addHandlerRender(controlRecipes);
};
init();
