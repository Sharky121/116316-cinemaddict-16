import {filmCounts, FilmsSectionType, COMMENTS_COUNT, BODY_CLASS_HIDE_OVERFLOW} from './consts.js';
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

const renderNoFilms = (filmsContainer) => {
  const noFilmElement = new NoFilmView();

  render(filmsContainer, noFilmElement);
};

const renderDetailsFilmCard = (film) => {
  const filmComments = film.comments.map((id) => comments[id]);
  const detailFilmCardComponent = new FilmDetailView(film, filmComments);

  const closeDetailsFilmCard = () => {
    NodesElement.body.removeChild(detailFilmCardComponent.element);
    NodesElement.body.classList.remove(BODY_CLASS_HIDE_OVERFLOW);
    detailFilmCardComponent.removeElement();
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

  detailFilmCardComponent.setButtonCloseHandler(closeDetailsFilmCard);
  document.addEventListener('keydown', onEscKeyDown);
};

const renderFilmCard = (containerElement, film) => {
  const filmCardComponent = new FilmCardView(film);

  render(containerElement, filmCardComponent);

  filmCardComponent.setClickHandler(() => {
    renderDetailsFilmCard(film);
  });
};

const renderFilmCards = (filmsList, isExtra) => {
  const filmsContainerElement = filmsList.element.querySelector('.films-list__container');
  const count = !isExtra
    ? films.length
    : filmCounts.EXTRA;

  for (let i = 0; i < Math.min(count, filmCounts.FILM_PER_STEP); i++) {
    renderFilmCard(filmsContainerElement, films[i]);
  }

  if (films.length > filmCounts.FILM_PER_STEP && !isExtra) {
    const showMoreButton = new ShowMoreButtonView();
    let renderedFilmCount = filmCounts.FILM_PER_STEP;

    render(filmsContainerElement, showMoreButton, RenderPosition.AFTEREND);

    showMoreButton.setClickHandler(() => {
      films
        .slice(renderedFilmCount, renderedFilmCount + filmCounts.FILM_PER_STEP)
        .forEach((film) => renderFilmCard(filmsContainerElement, film));

      renderedFilmCount += filmCounts.FILM_PER_STEP;

      if (renderedFilmCount >= films.length) {
        showMoreButton.element.remove();
        showMoreButton.removeElement();
      }
    });
  }
};

render(headerElement, new ProfileView(films));
render(mainElement, new NavigationView(filters), RenderPosition.AFTERBEGIN);
render(mainElement, new SortView());

const filmsElement = new FilmsView();

render(mainElement, filmsElement);

if (films.length === 0) {
  renderNoFilms(filmsElement);
} else {
  [...Object.values(FilmsSectionType)].forEach(({title, isExtra}) => {
    const filmsListElement = new FilmsListView(title, isExtra);

    render(filmsElement, filmsListElement);
    renderFilmCards(filmsListElement, isExtra);
  });
}

render(footerStatisticsElement, new StatisticsView(1345));
