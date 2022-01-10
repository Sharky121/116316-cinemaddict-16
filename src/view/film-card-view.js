import dayjs from 'dayjs';
import {cropText, humanizeTime} from '../utils.js';

const FilmControlButtons = {
  watchList: {
    cssClass: 'add-to-watchlist',
    text: 'Add to watchlist',
  },
  alreadyWatched: {
    cssClass: 'mark-as-watched',
    text: 'Mark as watched',
  },
  favorite: {
    cssClass: 'favorite',
    text: 'Mark as favorite',
  },
};

const createFilmCardControlsTemplate = (userDetails) => Object
  .entries(FilmControlButtons)
  .map((item) => {
    const [name, {cssClass, text}] = item;
    const isActive = userDetails[name];

    return `<button class="film-card__controls-item film-card__controls-item--${cssClass} ${isActive && 'film-card__controls-item--active'}" type="button">${text}</button>`;
  })
  .join('');

export const createFilmCardTemplate = (film) => {
  const {
    filmInfo: {
      title,
      poster,
      totalRating,
      release: {date},
      genres,
      description,
      runtime,
    },
    userDetails,
    comments,
  } = film;

  return (
    `<article class="film-card">
      <a class="film-card__link">
        <h3 class="film-card__title">${title}</h3>
        <p class="film-card__rating">${totalRating}</p>
        <p class="film-card__info">
          <span class="film-card__year">${dayjs(date).format('YYYY')}</span>
          <span class="film-card__duration">${humanizeTime(runtime)}</span>
          <span class="film-card__genre">${genres[0]}</span>
        </p>
        <img src="${poster}" alt="${title}" class="film-card__poster">
        <p class="film-card__description">${cropText(description)}</p>
        <span class="film-card__comments">${comments.length} comments</span>
      </a>
      <div class="film-card__controls">
        ${createFilmCardControlsTemplate(userDetails)}
      </div>
    </article>`
  );
};

