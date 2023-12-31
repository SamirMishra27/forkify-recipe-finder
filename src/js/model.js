import { convertSnakeCaseToCamelCase as convertData, AJAX } from './helpers.js'
import { API_URL, RES_PER_PAGE, FORKIFY_API_KEY } from './config.js';

export const state = {
    recipe: {},
    search: {
        query: '',
        results: [],
        page: 1,
        resultsPerPage: RES_PER_PAGE,
    },
    bookmarks: [],
};

export const loadRecipe = async function(id) {
    try {
        // Get the data from the API
        const data = await AJAX(`${API_URL}${id}?key=${FORKIFY_API_KEY}`);

        // Store recipe in state
        state.recipe = convertData(data.data.recipe);

        if (state.bookmarks.some(bookmark => bookmark.id === id))
            state.recipe.bookmarked = true;
        else state.recipe.bookmarked = false;

    } catch (err) {
        console.error(err);
        throw err;
    };
};

export const loadSearchResults = async function(query) {
    try {
        state.search.query = query;
        const data = await AJAX(`${API_URL}?search=${query}&key=${FORKIFY_API_KEY}`);
        // console.log(data);

        state.search.results = data.data.recipes.map(recipe => convertData(recipe));
        state.search.page = 1;
    } catch (error) {
        console.error(error);
        throw error;
    };
};
loadSearchResults('pizza');

export const getSearchResultsPage = function(page = state.search.page) {
    state.search.page = page;
    perPage = state.search.resultsPerPage;

    const start = (page - 1) * perPage;
    const end = page * perPage;  // 10 results per page

    return state.search.results.slice(start, end);
};

export const updateServings = function(newServings) {
    state.recipe.ingredients.forEach(item => {
        item.quantity = (item.quantity * newServings) / state.recipe.servings;
        // newQt = oldQt * newServings / oldServings // 2 * 8 / 4 = 4
        // Cross-multiply: newQt = oldQt * newServings
    });

    state.recipe.servings = newServings;
};

const persistBookmarks = function() {
    localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
};

export const addBookmark = function(recipe) {
    // Add bookmark
    state.bookmarks.push(recipe);

    // Mark current recipe as bookmarked
    if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;

    persistBookmarks();
};

export const deleteBookmark = function(id) {
    // Delete bookmark
    const index = state.bookmarks.findIndex(bookmark => bookmark.id === id);
    state.bookmarks.splice(index, 1);

    // Mark current recipe as NOT bookmarked
    if (id === state.recipe.id) state.recipe.bookmarked = false;

    persistBookmarks();
};

const init = function() {
    const storage = localStorage.getItem('bookmarks');
    if (storage) state.bookmarks = JSON.parse(storage);
};
init();

export const uploadRecipe = async function(newRecipe) {
    const ingredients = Object
        .entries(newRecipe)
        .filter(entry => entry[0].startsWith('ingredient') && entry[1] !== '')
        .map(item => {
            const itemArr = item[1].split(',').map(value => value.trim());

            if (itemArr.length !== 3) {
                throw new Error('Wrong ingredient format! Please use the correct format :)');
            };

            const [quantity, unit, description] = itemArr;

            return { quantity: quantity ? +quantity : null, unit, description };
        });

    const recipe = {
        title: newRecipe.title,
        source_url: newRecipe.sourceUrl,
        image_url: newRecipe.image,
        publisher: newRecipe.publisher,
        cooking_time: +newRecipe.cookingTime,
        servings: +newRecipe.servings,
        ingredients
    };

    const data = await AJAX(`${API_URL}?key=${FORKIFY_API_KEY}`, recipe);
    // Key is already there.
    state.recipe = convertData(data.data.recipe);
    addBookmark(state.recipe);
};
