import {nanoid} from 'nanoid';
import {DESCRIPTION, TITLES, IMAGE_URL, POSTERS, DIRECTORS, WRITERS, RATINGS, ACTORS, GENRES, COUNTRIES} from '../consts.js';
import {getImagePath, generateDescription} from '../utils/film.js';
import {
  generateRandomArray,
  getRandomInteger,
  getRandomItemFromArray,
  getRandomFloat,
  generateRandomDate,
} from '../utils/common.js';

const generateCommentsArray = () => {
  const newRandomArray = new Array(getRandomInteger(1, 5))
    .fill(null)
    .map(() => getRandomInteger(1, 60));

  return [...new Set(newRandomArray)];
};

export const generateFilm = () => ({
  id: nanoid(),
  filmInfo: {
    title: getRandomItemFromArray(TITLES),
    alternativeTitle: getRandomItemFromArray(TITLES),
    totalRating: getRandomFloat(1, 10),
    ageRating: getRandomItemFromArray(RATINGS),
    poster: getImagePath(POSTERS, IMAGE_URL),
    description: generateDescription(DESCRIPTION),
    director: getRandomItemFromArray(DIRECTORS),
    writers: generateRandomArray(WRITERS),
    actors: generateRandomArray(ACTORS),
    genres: generateRandomArray(GENRES),
    runtime: getRandomInteger(30, 180),
    release: {
      date: generateRandomDate(new Date(2015, 0, 1)),
      releaseCountry: getRandomItemFromArray(COUNTRIES),
    },
  },
  userDetails: {
    watchingDate: generateRandomDate(new Date(2020, 0, 1)),
    watchList: Boolean(getRandomInteger()),
    alreadyWatched: Boolean(getRandomInteger()),
    favorite: Boolean(getRandomInteger()),
  },
  comments: generateCommentsArray(),
});
