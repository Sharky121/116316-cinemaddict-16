import {COMMENTS_COUNT} from './consts.js';
import {RenderPosition, renderTemplate} from './render.js';
import {createProfileTemplate} from './view/profile-view.js';
import {createNavigationTemplate} from './view/navigation-view.js';
import {createSortTemplate} from './view/sort-view.js';
import {createFilmsElement} from './view/films-view.js';
import {createFilmsListTemplate} from './view/films-list-view.js';
import {createStatisticsTemplate} from './view/statistics-view.js';
import {createFilmCardTemplate} from './view/film-card-view.js';
import {createShowMoreButtonTemplate} from './view/show-more-button-view.js';
import {generateFilm} from './mock/film.js';
import {filmDetailTemplate} from './view/film-detail-view.js';
import {generateComment} from './mock/comment.js';
import {generateFilter} from './mock/filter.js';

const filmCounts = {
  ALL: 17,
  EXTRA: 2,
  FILM_PER_STEP: 5,
};

const FilmsSectionType = {
  ALL: {
    title: 'All movies. Upcoming',
    isExtra: false,
  },
  TOP: {
    title: 'Top rated',
    isExtra: true,
  },
  MOST_COMMENTED: {
    title: 'Most commented',
    isExtra: true,
  },
};

const films = Array.from({length: filmCounts.ALL}, generateFilm);
const comments = new Array(COMMENTS_COUNT)
  .fill(null)
  .map((item, index) => generateComment(index));

const filmComments = films[0].comments.map((id) => comments[id]);
const filters = generateFilter(films);

const bodyElement = document.querySelector('body');
const headerElement = document.querySelector('.header');
const mainElement = document.querySelector('.main');
const footerStatisticsElement = document.querySelector('.footer__statistics');

const renderFilmCards = (filmsList, isExtra) => {
  const filmsContainerElement = filmsList.querySelector('.films-list__container');
  const count = !isExtra ? films.length : filmCounts.EXTRA;

  for (let i = 0; i < Math.min(count, filmCounts.FILM_PER_STEP); i++) {
    renderTemplate(filmsContainerElement, createFilmCardTemplate(films[i]));
  }

  if (films.length > filmCounts.FILM_PER_STEP && !isExtra) {
    let renderedFilmCount = filmCounts.FILM_PER_STEP;

    renderTemplate(filmsContainerElement, createShowMoreButtonTemplate(), RenderPosition.AFTEREND);

    const showMoreButton = filmsList.querySelector('.films-list__show-more');

    showMoreButton.addEventListener('click', () => {
      films
        .slice(renderedFilmCount, renderedFilmCount + filmCounts.FILM_PER_STEP)
        .forEach((film) => renderTemplate(filmsContainerElement, createFilmCardTemplate(film)));

      renderedFilmCount += filmCounts.FILM_PER_STEP;

      if (renderedFilmCount >= films.length) {
        showMoreButton.remove();
      }
    });
  }
};

renderTemplate(headerElement, createProfileTemplate(films));
renderTemplate(mainElement, createNavigationTemplate(filters), RenderPosition.AFTERBEGIN);
renderTemplate(mainElement, createSortTemplate());
renderTemplate(mainElement, createFilmsElement());

const filmsElement = mainElement.querySelector('.films');

[...Object.values(FilmsSectionType)].forEach(({title, isExtra}) => {
  renderTemplate(filmsElement, createFilmsListTemplate(title, isExtra));
});

const filmsListElements = [...mainElement.querySelectorAll('.films-list')];

filmsListElements.forEach((element) => {
  const isExtra = element.classList.contains('films-list--extra');

  renderFilmCards(element, isExtra);
});

renderTemplate(footerStatisticsElement, createStatisticsTemplate());

renderTemplate(bodyElement, filmDetailTemplate(films[0], filmComments));
