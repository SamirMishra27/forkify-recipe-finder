import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';

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

        // 0) Update results view to mark selected search result
        resultsView.update(model.getSearchResultsPage());

        // 1) Loading recipe
        await model.loadRecipe(id);

        // 2) Rendering recipe
        recipeView.render(model.state.recipe);
    } catch (error) {
        recipeView.renderError();
    };
};

const controlSearchResults = async function() {
    try {
        resultsView.renderSpinner();

        // 1) Get search query
        const query = searchView.getQuery();
        if (!query) return;

        // 2) Load search results
        await model.loadSearchResults(query);

        //  Render results
        resultsView.render(model.getSearchResultsPage(1));

        // 4) Render initial pagination buttons
        paginationView.render(model.state.search);
    } catch (error) {
        console.error(error);
    }
};

const controlPagination = function(goToPage) {
    // 1) Render NEW results
    resultsView.render(model.getSearchResultsPage(goToPage));

    //  Render NEW initial pagination buttons
    paginationView.render(model.state.search);
};

const controlServings = function(newServings) {
    // Update the recipe servings (in state)
    model.updateServings(newServings);

    // Update the recipe view
    recipeView.update(model.state.recipe);
};

const controlAddBookmark = function() {
    // 1) Add/remove bookmark
    if (!model.state.recipe.bookmarked)
        model.addBookmark(model.state.recipe);
    else
        model.deleteBookmark(model.state.recipe.id);

    // 2) Update recipe view
    recipeView.update(model.state.recipe);

    // 3) Render bookmarks
    bookmarksView.render(model.state.bookmarks);
};

const init = function() {
    recipeView.addHandlerRender(controlRecipes);
    recipeView.addHandlerUpdateServings(controlServings);
    recipeView.addHandlerBookmark(controlAddBookmark);
    searchView.addHandlerSearch(controlSearchResults);
    paginationView.addHandlerClick(controlPagination);
};
init();
