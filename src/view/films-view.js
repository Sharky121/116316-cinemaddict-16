import AbstractView from './abstract-view.js';

const createFilmsElement = () => '<section class="films"></section>';

export default class FilmsView extends AbstractView {
  get template() {
    return createFilmsElement();
  }
}
