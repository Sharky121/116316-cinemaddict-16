import {DESCRIPTION_CHAR_COUNT} from './consts.js';

export const getRandomFloat = (a = 1, b = 0, digits = 1) => {
  const lower = Math.min(a, b);
  const upper = Math.max(a, b);
  const someNumber = (lower + Math.random() * (upper - lower)).toFixed(digits);

  return parseFloat(someNumber);
};

export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const getRandomItemFromArray = (array) => array[getRandomInteger(0, array.length - 1)];

export const generateRandomArray = (array, maxSize = 3) => new Array(getRandomInteger(1, maxSize))
  .fill(null)
  .map(() => getRandomItemFromArray(array));

export const generateRandomDate = (start, end = new Date()) => new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));

export const getImagePath = (images, path) => {
  const imagesPathArray = images.map((item) => path + item);

  return getRandomItemFromArray(imagesPathArray);
};

export const cropText = (str, charCount = DESCRIPTION_CHAR_COUNT) => str.length > charCount
  ? `${str.slice(0, charCount - 1)  }...`
  : str;

export const humanizeTime = (runtime) => {
  const hours = Math.floor(runtime / 60);
  const minutes = runtime % 60;

  if (hours === 0){
    return `${minutes}m`;
  }

  if (minutes === 0) {
    return `${hours}m`;
  }

  return `${hours}h ${minutes}m`;
};

export const generateDescription = (array) => new Array(getRandomInteger(1, 5))
  .fill(null)
  .map(() => getRandomItemFromArray(array))
  .join(' ');
