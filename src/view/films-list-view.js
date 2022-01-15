import {createElement} from '../render.js';

const createFilmListEmptyTemplate = () => '<section class="films-list"></section>';

const createFilmListNoEmptyTemplate = (title, isExtra) => (
  `<section class="films-list ${isExtra ? 'films-list--extra' : ''}">
    <h2 class="films-list__title ${!isExtra ? 'visually-hidden' : ''}">${title}</h2>
    <div class="films-list__container"></div>
   </section>`
);

const createFilmsListTemplate = (title, isExtra = false, isEmpty = false) => isEmpty
  ? createFilmListEmptyTemplate()
  : createFilmListNoEmptyTemplate(title, isExtra);

export default class FilmsListView {
  #element = null;
  #title = null;
  #isExtra = null;
  #isEmpty = null;

  constructor(title, isExtra, isEmpty) {
    this.#title = title;
    this.#isExtra = isExtra;
    this.#isEmpty = isEmpty;
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template() {
    return createFilmsListTemplate(this.#title, this.#isExtra, this.#isEmpty);
  }

  remove(){
    this.#element = null;
  }
}
