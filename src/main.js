import {COMMENTS_COUNT, BODY_CLASS_HIDE_OVERFLOW} from './consts.js';
import {render, RenderPosition} from './render.js';
import ProfileView from './view/profile-view.js';
import NavigationView from './view/navigation-view.js';
import SortView from './view/sort-view.js';
import FilmsView from './view/films-view.js';
import FilmsListView from './view/films-list-view.js';
import StatisticsView from './view/statistics-view.js';
import FilmCardView from './view/film-card-view.js';
import FilmDetailView from './view/film-detail-view.js';
import ShowMoreButtonView from './view/show-more-button-view.js';
import NoFilmView from './view/no-film-view.js';
import {generateFilm} from './mock/film.js';
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
    isEmpty: false,
  },
  TOP: {
    title: 'Top rated',
    isExtra: true,
    isEmpty: false,
  },
  MOST_COMMENTED: {
    title: 'Most commented',
    isExtra: true,
    isEmpty: false,
  },
  EMPTY: {
    title: '',
    isExtra: false,
    isEmpty: true,
  }
};

const NodesElement = {
  body: document.querySelector('body'),
  header:  document.querySelector('.header'),
  main: document.querySelector('.main'),
  footerStatistics: document.querySelector('.footer__statistics'),
};

const films = Array.from({length: filmCounts.ALL}, generateFilm);
const comments = new Array(COMMENTS_COUNT)
  .fill(null)
  .map((item, index) => generateComment(index));

const filters = generateFilter(films);

const headerElement = document.querySelector('.header');
const mainElement = document.querySelector('.main');
const footerStatisticsElement = document.querySelector('.footer__statistics');

const renderDetailsFilmCard = (film) => {
  const filmComments = film.comments.map((id) => comments[id]);
  const detailFilmCardComponent = new FilmDetailView(film, filmComments);
  const closeButtonElement = detailFilmCardComponent.element.querySelector('.film-details__close-btn');

  const closeDetailsFilmCard = () => {
    NodesElement.body.removeChild(detailFilmCardComponent.element);
    NodesElement.body.classList.remove(BODY_CLASS_HIDE_OVERFLOW);
    detailFilmCardComponent.remove();
  };

  const onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      closeDetailsFilmCard();

      document.removeEventListener('keydown', onEscKeyDown);
    }
  };

  NodesElement.body.appendChild(detailFilmCardComponent.element);
  NodesElement.body.classList.add(BODY_CLASS_HIDE_OVERFLOW);

  closeButtonElement.addEventListener('click', closeDetailsFilmCard);
  document.addEventListener('keydown', onEscKeyDown);
};

const renderFilmCard = (containerElement, film) => {
  const filmCardComponent = new FilmCardView(film);
  const filmCardLinkElement = filmCardComponent
    .element
    .querySelector('.film-card__link');

  render(containerElement, filmCardComponent.element);

  filmCardLinkElement.addEventListener('click', () => {
    renderDetailsFilmCard(film);
  });
};

const renderFilmCards = (filmsList, isExtra) => {
  const filmsContainerElement = filmsList.querySelector('.films-list__container');
  const count = !isExtra
    ? films.length
    : filmCounts.EXTRA;

  for (let i = 0; i < Math.min(count, filmCounts.FILM_PER_STEP); i++) {
    renderFilmCard(filmsContainerElement, films[i]);
  }

  if (films.length > filmCounts.FILM_PER_STEP && !isExtra) {
    const showMoreButton = new ShowMoreButtonView().element;
    let renderedFilmCount = filmCounts.FILM_PER_STEP;

    render(filmsContainerElement, showMoreButton, RenderPosition.AFTEREND);

    showMoreButton.addEventListener('click', () => {
      films
        .slice(renderedFilmCount, renderedFilmCount + filmCounts.FILM_PER_STEP)
        .forEach((film) => renderFilmCard(filmsContainerElement, film));

      renderedFilmCount += filmCounts.FILM_PER_STEP;

      if (renderedFilmCount >= films.length) {
        showMoreButton.remove();
      }
    });
  }
};

render(headerElement, new ProfileView(films).element);
render(mainElement, new NavigationView(filters).element, RenderPosition.AFTERBEGIN);
render(mainElement, new SortView().element);

const filmsElement = new FilmsView().element;

render(mainElement, filmsElement);

if (films.length === 0) {
  const filmsListElement = new FilmsListView(FilmsSectionType.EMPTY.title, FilmsSectionType.EMPTY.isExtra, FilmsSectionType.EMPTY.isEmpty).element;
  const noFilmElement = new NoFilmView().element;

  render(filmsElement, filmsListElement);

  filmsListElement.appendChild(noFilmElement);
} else {
  [...Object.values(FilmsSectionType)].forEach(({title, isExtra}) => {
    const filmsListElement = new FilmsListView(title, isExtra).element;

    render(filmsElement, filmsListElement);
    renderFilmCards(filmsListElement, isExtra);
  });
}

render(footerStatisticsElement, new StatisticsView(1345).element);
