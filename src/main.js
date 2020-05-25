import { Position } from './constants';
import { getSearchMarkup } from './components/search';
import { getUserLevelMarkup } from './components/user-level';
import { getMenuMarkup, getMenuData } from './components/menu';
import { getSortingMarkup } from './components/sorting';
import { getFilmsAreaMarkup } from './components/films-area';
import { getFilmsListMarkup } from './components/films-list';
import { getFilmsListExtraMarkup } from './components/films-list-extra';
import { getFilmCardMarkup } from './components/card';
import { getShowMoreBtnMarkup } from './components/show-more-button';
import { getFilmDetailsMarkup } from './components/film-details';
import { getStatisticMarkup } from './components/footer';
import { Mock } from './mock';

const LOAD_NUM = 5;
const FILMS_WATCHED = 25;

const header = document.querySelector(`.header`);
const mainContainer = document.querySelector(`.main`);
const body = document.querySelector(`body`);
const footer = document.querySelector(`.footer`);

const films = Mock.load();
let shownFilms = films.slice(0, LOAD_NUM);

const renderComponent = (container, component, position) => {
  container.insertAdjacentHTML(position, component);
};

renderComponent(header, getSearchMarkup(), Position.BEFOREEND);
renderComponent(header, getUserLevelMarkup(FILMS_WATCHED), Position.BEFOREEND);
renderComponent(mainContainer, getMenuMarkup(getMenuData(films)), Position.BEFOREEND);
renderComponent(mainContainer, getSortingMarkup(), Position.BEFOREEND);
renderComponent(mainContainer, getFilmsAreaMarkup(), Position.BEFOREEND);
renderComponent(footer, getStatisticMarkup(films), Position.BEFOREEND);

const filmsArea = document.querySelector(`.films`);

renderComponent(filmsArea, getFilmsListMarkup(), Position.BEFOREEND);

const filmsList = document.querySelector(`.films-list`);
const filmsContainer = filmsList.querySelector(`.films-list__container`);
shownFilms.forEach((film) => renderComponent(filmsContainer, getFilmCardMarkup(film), Position.BEFOREEND));
renderComponent(filmsList, getShowMoreBtnMarkup(), Position.BEFOREEND);

new Array(2).fill(``).forEach(() => {
  renderComponent(filmsArea, getFilmsListExtraMarkup(), Position.BEFOREEND);
});

const extraLists = filmsArea.querySelectorAll(`.films-list--extra`);
extraLists.forEach((list) => {
  const extraFilmsContainer = list.querySelector(`.films-list__container`);
  shownFilms.slice(0, 2).forEach((film) => renderComponent(extraFilmsContainer, getFilmCardMarkup(film), Position.BEFOREEND));
});

//  renderComponent(body, getFilmDetailsMarkup(shownFilms[0]), Position.BEFOREEND);

const showMoreButton = document.querySelector(`.films-list__show-more`);

const onShowMoreButtonClick = () => {
  const renderingFilms = films.slice(shownFilms.length, shownFilms.length + LOAD_NUM);
  renderingFilms.forEach((film) => renderComponent(filmsContainer, getFilmCardMarkup(film), Position.BEFOREEND));
  shownFilms = shownFilms.concat(renderingFilms);
  if (renderingFilms.length < LOAD_NUM) {
    showMoreButton.style.display = `none`;
    showMoreButton.removeEventListener(`click`, onShowMoreButtonClick);
  }
  //  updateMenu(getFilterElements(loadedTasks));
};

showMoreButton.addEventListener(`click`, onShowMoreButtonClick);
