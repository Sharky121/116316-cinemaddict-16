import {DESCRIPTION, EMOTIONS, COMMENT_AUTHORS} from '../consts.js';
import {generateDescription} from '../utils/film.js';
import {getRandomItemFromArray, generateRandomDate} from '../utils/common.js';

export const generateComment = (id) => ({
  id: id,
  author: getRandomItemFromArray(COMMENT_AUTHORS),
  text: generateDescription(DESCRIPTION),
  date: generateRandomDate(new Date(2021, 11, 1)),
  emotion: getRandomItemFromArray(EMOTIONS),
});
