import AbstractView from './abstract-view.js';

const createNoFilmTemplate = (section = 'in our database') => (
  `<section class="films-list">
    <h2 class="films-list__title">There are no movies ${section}</h2>
   </section>`
);

export default class NoFilmView extends AbstractView {
  #section = null;

  constructor(section) {
    super();
    this.#section = section;
  }

  get template() {
    return createNoFilmTemplate(this.#section);
  }
}
