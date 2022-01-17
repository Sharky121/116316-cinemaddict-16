import {DESCRIPTION_CHAR_COUNT} from '../consts.js';
import {getRandomInteger, getRandomItemFromArray} from './common.js';

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

export const getImagePath = (images, path) => {
  const imagesPathArray = images.map((item) => path + item);

  return getRandomItemFromArray(imagesPathArray);
};
