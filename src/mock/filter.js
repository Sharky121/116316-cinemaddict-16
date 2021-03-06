const filmToFilterMap = {
  watchlist: (films) => films
    .filter((film) => film.userDetails.watchList).length,
  history: (films) => films
    .filter((film) => film.userDetails.alreadyWatched).length,
  favorites: (films) => films
    .filter((film) => film.userDetails.favorite).length,
};

export const generateFilter = (films) => Object.entries(filmToFilterMap).map(
  ([filterName, countTasks]) => ({
    name: filterName,
    count: countTasks(films),
  }),
);
