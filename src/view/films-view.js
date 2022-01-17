import {createElement} from '../render.js';

const createFilmsElement = () => '<section class="films"></section>';

export default class FilmsView {
  #element = null;

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template() {
    return createFilmsElement();
  }

  remove() {
    this.#element = null;
  }
}
