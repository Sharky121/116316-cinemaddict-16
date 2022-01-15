import {createElement} from '../render.js';

const createFilterItemTemplate = ({name, count}) => {
  const nameCapitalized = name.charAt(0).toUpperCase() + name.slice(1);

  return `<a href="#${name}" class="main-navigation__item">${nameCapitalized} <span class="main-navigation__item-count">${count}</span></a>`;
};

const createFiltersTemplate = (filterItems) => filterItems
  .map((filter) => createFilterItemTemplate(filter))
  .join('');


const createNavigationTemplate = (filters) => {
  const filtersTemplate = createFiltersTemplate(filters);

  return `<nav class="main-navigation">
    <div class="main-navigation__items">
      <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
      ${filtersTemplate}
    </div>
    <a href="#stats" class="main-navigation__additional">Stats</a>
  </nav>`;
};

export default class NavigationView {
  #element = null;
  #filter = null;

  constructor(filters) {
    this.#filter = filters;
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template() {
    return createNavigationTemplate(this.#filter);
  }

  removeElement() {
    this.#element = null;
  }
}
