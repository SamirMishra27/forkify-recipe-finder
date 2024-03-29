import View from "./View.js";
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
    _parentElement = document.querySelector('.pagination');

    addHandlerClick(handler) {
        this._parentElement.addEventListener('click', function(e) {
            const btn = e.target.closest('.btn--inline');
            if (!btn) return;

            const goToPage = +btn.dataset.goto;
            handler(goToPage);
        })
    }

    _getPrevButtonMarkup(pageNo) {
        return `
        <button data-goto="${pageNo}" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
                <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${pageNo}</span>
        </button>
        `;
    }

    _getNextButtonMarkup(pageNo) {
        return `
        <button data-goto="${pageNo}" class="btn--inline pagination__btn--next">
            <span>Page ${pageNo}</span>
            <svg class="search__icon">
                <use href="${icons}#icon-arrow-right"></use>
            </svg>
        </button>
        `;
    }

    _generateMarkup() {
        const currentPage = this._data.page;
        const numPages = Math.ceil(this._data.results.length / this._data.resultsPerPage);

        // Page 1, and there are other pages
        if (currentPage === 1 && numPages > 1) {
            return this._getNextButtonMarkup(currentPage + 1);
        }

        // Last page
        if (currentPage === numPages && numPages > 1) {
            return this._getPrevButtonMarkup(currentPage - 1);
        }

        // Other page
        if (currentPage < numPages) {
            return `
            ${this._getPrevButtonMarkup(currentPage - 1)}
            ${this._getNextButtonMarkup(currentPage + 1)}
            `;
        }

        // Page 1, and there are NO other pages
        return '';
    }
};

export default new PaginationView();
