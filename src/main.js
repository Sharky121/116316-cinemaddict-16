import {RenderPosition, renderTemplate} from './render.js';
import {createProfileTemplate} from './view/profile-view.js';
import {createNavigationTemplate} from './view/navigation-view.js';
import {createSortTemplate} from './view/sort-view.js';
import {createFilmsElement} from './view/films-view.js';
import {createFilmsListTemplate} from './view/films-list-view.js';
import {createStatisticsTemplate} from './view/statistics-view.js';
import {createFilmCardTemplate} from './view/film-card-view.js';
import {createShowMoreButtonTemplate} from './view/show-more-button-view.js';

const Counts = {
  ALL: 5,
  EXTRA: 2,
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

const headerElement = document.querySelector('.header');
const mainElement = document.querySelector('.main');
const footerStatisticsElement = document.querySelector('.footer__statistics');

const renderFilmCards = (container, isExtra) => {
  const count = !isExtra ? Counts.ALL : Counts.EXTRA;

  for (let i = 0; i < count; i++) {
    renderTemplate(container, createFilmCardTemplate());
  }
};

renderTemplate(headerElement, createProfileTemplate());
renderTemplate(mainElement, createNavigationTemplate(), RenderPosition.AFTERBEGIN);
renderTemplate(mainElement, createSortTemplate());
renderTemplate(mainElement, createFilmsElement());

const filmsElement = mainElement.querySelector('.films');

[...Object.values(FilmsSectionType)].forEach(({title, isExtra}) => {
  renderTemplate(filmsElement, createFilmsListTemplate(title, isExtra));
});

const filmsListElements = [...mainElement.querySelectorAll('.films-list')];

filmsListElements.forEach((element) => {
  const filmsContainerElement = element.querySelector('.films-list__container');
  const isExtra = element.classList.contains('films-list--extra');

  if (!isExtra) {
    renderFilmCards(filmsContainerElement, isExtra);
    renderTemplate(filmsContainerElement, createShowMoreButtonTemplate(), RenderPosition.AFTEREND);
  } else {
    renderFilmCards(filmsContainerElement, isExtra);
  }
});

renderTemplate(footerStatisticsElement, createStatisticsTemplate());
