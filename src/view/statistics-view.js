import AbstractView from './abstract-view.js';

const createStatisticsTemplate = (count) => `<p>${count} movies inside</p>`;

export default class StatisticsView extends AbstractView {
  #count = null;

  constructor(count) {
    super();
    this.#count = count;
  }

  get template() {
    return createStatisticsTemplate(this.#count);
  }
}
