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
