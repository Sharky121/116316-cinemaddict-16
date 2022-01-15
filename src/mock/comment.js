import {DESCRIPTION, EMOTIONS, COMMENT_AUTHORS} from '../consts.js';
import {getRandomItemFromArray, generateDescription, generateRandomDate} from '../utils.js';

export const generateComment = (id) => ({
  id: id,
  author: getRandomItemFromArray(COMMENT_AUTHORS),
  text: generateDescription(DESCRIPTION),
  date: generateRandomDate(new Date(2021, 11, 1)),
  emotion: getRandomItemFromArray(EMOTIONS),
});
