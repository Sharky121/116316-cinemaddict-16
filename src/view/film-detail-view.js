import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import {EMOTIONS} from '../consts.js';
import {humanizeTime} from '../utils/film.js';
import AbstractView from './abstract-view.js';

dayjs.extend(relativeTime);

const ControlButtonsMap = {
  watchList: {
    cssClass: 'watchlist',
    text: 'Add to watchlist',
  },
  alreadyWatched: {
    cssClass: 'watched',
    text: 'Already watched',
  },
  favorite: {
    cssClass: 'favorite',
    text: 'Add to favorites',
  },
};

const humanizeCommentDate = (date) => {
  const diff = dayjs().diff(date, 'day', false);

  return diff > 7
    ? dayjs(date).format('YYYY/MM/DD HH:mm')
    : dayjs(date).fromNow();
};

const createCommentTemplate = (comment = {}) => {
  const {author, text, date, emotion} = comment;

  return (
    `<li class="film-details__comment">
      <span class="film-details__comment-emoji">
        <img src="./images/emoji/${emotion}.png" width="55" height="55" alt="emoji-smile">
      </span>
      <div>
        <p class="film-details__comment-text">${text}</p>
        <p class="film-details__comment-info">
          <span class="film-details__comment-author">${author}</span>
          <span class="film-details__comment-day">${humanizeCommentDate(date)}</span>
          <button class="film-details__comment-delete">Delete</button>
        </p>
      </div>
    </li>`
  );
};

const createCommentsTemplate = (comments) => comments
  .map((comment) => createCommentTemplate(comment))
  .join('');

const createEmojisTemplate = (emotions) => emotions
  .map((item) => (
    `<input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-${item}" value="${item}">
        <label class="film-details__emoji-label" for="emoji-${item}">
          <img src="./images/emoji/${item}.png" width="30" height="30" alt="emoji">
        </label>`
  ))
  .join('');

const createControlButtonsTemplate = (userDetails) => Object
  .entries(ControlButtonsMap)
  .map((item) => {
    const [name, {cssClass, text}] = item;
    const isActive = userDetails[name];

    return `<button type="button" class="film-details__control-button film-details__control-button--${cssClass} ${isActive && 'film-details__control-button--active'}" id="${name}" name="${name}">${text}</button>`;
  })
  .join('');

const createGenresTemplate = (genres) => genres
  .map((genre) => `<span class="film-details__genre">${genre}</span>`)
  .join('');

const filmDetailTemplate = (film, comments) => {
  const {
    filmInfo: {
      title,
      alternativeTitle,
      poster,
      totalRating,
      ageRating,
      release: {
        date,
        releaseCountry,
      },
      director,
      writers,
      actors,
      genres,
      description,
      runtime,
    },
    userDetails,
  } = film;

  return (
    `<section class="film-details">
      <form class="film-details__inner" action="" method="get">
        <div class="film-details__top-container">
          <div class="film-details__close">
            <button class="film-details__close-btn" type="button">close</button>
          </div>
          <div class="film-details__info-wrap">
            <div class="film-details__poster">
              <img class="film-details__poster-img" src="${poster}" alt="${title}">

              <p class="film-details__age">${ageRating}+</p>
            </div>

            <div class="film-details__info">
              <div class="film-details__info-head">
                <div class="film-details__title-wrap">
                  <h3 class="film-details__title">${title}</h3>
                  <p class="film-details__title-original">Original: ${alternativeTitle}</p>
                </div>

                <div class="film-details__rating">
                  <p class="film-details__total-rating">${totalRating}</p>
                </div>
              </div>

              <table class="film-details__table">
                <tr class="film-details__row">
                  <td class="film-details__term">Director</td>
                  <td class="film-details__cell">${director}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Writers</td>
                  <td class="film-details__cell">${writers.join(', ')}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Actors</td>
                  <td class="film-details__cell">${actors.join(', ')}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Release Date</td>
                  <td class="film-details__cell">${dayjs(date).format('DD MMMM YYYY')}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Runtime</td>
                  <td class="film-details__cell">${humanizeTime(runtime)}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Country</td>
                  <td class="film-details__cell">${releaseCountry}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Genres</td>
                  <td class="film-details__cell">
                    ${createGenresTemplate(genres)}
                  </td>
                </tr>
              </table>

              <p class="film-details__film-description">${description}</p>
            </div>
          </div>

          <section class="film-details__controls">
            ${createControlButtonsTemplate(userDetails)}
          </section>
        </div>

        <div class="film-details__bottom-container">
          <section class="film-details__comments-wrap">
            <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>

            <ul class="film-details__comments-list">
              ${createCommentsTemplate(comments)}
            </ul>

            <div class="film-details__new-comment">
              <div class="film-details__add-emoji-label"></div>

              <label class="film-details__comment-label">
                <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
              </label>

              <div class="film-details__emoji-list">
                ${createEmojisTemplate(EMOTIONS)}
              </div>
            </div>
          </section>
        </div>
      </form>
    </section>`
  );
};

export default class FilmDetailView extends AbstractView {
  #film = null;
  #comments = null;

  constructor(film, comments) {
    super();
    this.#film = film;
    this.#comments = comments;
  }

  get template() {
    return filmDetailTemplate(this.#film, this.#comments);
  }
}
