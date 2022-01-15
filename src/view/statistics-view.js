import {createElement} from '../render.js';

const createStatisticsTemplate = (count) => `<p>${count} movies inside</p>`;

export default class StatisticsView {
  #element = null;
  #count = null;

  constructor(count) {
    this.#count = count;
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template() {
    return createStatisticsTemplate(this.#count);
  }

  remove() {
    this.#element = null;
  }
}
