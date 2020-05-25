const MENU = [`All movies`, `Watchlist`, `History`, `Favorites`];

const getMoviesCount = (list, cb) => list.filter(cb).length;
const findWatchlistMovies = (movie) => movie.inWatchlist;
const findWatchedMovies = (movie) => movie.isWatched;
const findFavoriteMovies = (movie) => movie.isFavorite;

export const getMenuData = (movies) => {
  return [
    { title: `All movies`, count: movies.length, active: true },
    { title: `Watchlist`, count: getMoviesCount(movies, findWatchlistMovies), active: false },
    { title: `History`, count: getMoviesCount(movies, findWatchedMovies), active: false },
    { title: `Favorite`, count: getMoviesCount(movies, findFavoriteMovies), active: false },
    { title: `Stats`, active: false },
  ];
};

const getMenuId = (menuItem) => menuItem.split(` `)[0].toLowerCase();

export const getMenuMarkup = (items) => {
  return `
  <nav class="main-navigation">
    ${items.map(({ title, count, active }) => {
    const id = getMenuId(title);
    return `
      <a href="#${id}" class="main-navigation__item ${active ? `main-navigation__item--active` : ``} ${id === `stats` ? `main-navigation__item--additional` : ``}">${title}${id === `all` || id === `stats` ? `` : ` <span class="main-navigation__item-count">${count}</span>`} </a>
    `;
  }).join(`\n`)}
  </nav>
  `;
};
