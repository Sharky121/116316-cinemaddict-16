import {createElement} from '../render.js';

const watchedToRating = (films) => {
  const watchedFilms = films.filter((film) => film.userDetails.alreadyWatched).length;

  if (watchedFilms >= 1 && watchedFilms <= 10) {
    return 'novice';
  }

  if (watchedFilms >= 11 && watchedFilms <= 20) {
    return 'fan';
  }

  if (watchedFilms >= 21) {
    return 'movie buff';
  }
};

const createProfileTemplate = (films) => {
  const profileTitle = watchedToRating(films);

  return (
    `<section class="header__profile profile">
      <p class="profile__rating">${profileTitle}</p>
      <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
   </section>`
  );
};

export default class ProfileView {
  #element = null;
  #films = null;

  constructor(films) {
    this.#films = films;
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template() {
    return createProfileTemplate(this.#films);
  }

  removeElement() {
    this.#element = null;
  }
}
