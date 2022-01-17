import {createElement} from '../render.js';

const createNoFilmTemplate = (section = 'in our database') => `<h2 class="films-list__title">There are no movies ${section}</h2>`;

export default class NoFilmView {
  #element = null;
  #section = null;

  constructor(section) {
    this.#section = section;
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template() {
    return createNoFilmTemplate(this.#section);
  }

  remove() {
    this.#element = null;
  }
}
