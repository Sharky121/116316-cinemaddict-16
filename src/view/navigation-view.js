const createFilterItemTemplate = ({name, count}) => {
  const nameCapitalized = name.charAt(0).toUpperCase() + name.slice(1);

  return `<a href="#${name}" class="main-navigation__item">${nameCapitalized} <span class="main-navigation__item-count">${count}</span></a>`;
};

const createFiltersTemplate = (filterItems) => filterItems
  .map((filter) => createFilterItemTemplate(filter))
  .join('');


export const createNavigationTemplate = (filter) => {
  const filtersTemplate = createFiltersTemplate(filter);

  return `<nav class="main-navigation">
    <div class="main-navigation__items">
      <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
      ${filtersTemplate}
    </div>
    <a href="#stats" class="main-navigation__additional">Stats</a>
  </nav>`;
};

