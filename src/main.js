import { Position } from './constants';
import { getSearchMarkup } from './components/search';
import { getUserLevelMarkup } from './components/user-level';
import { getMenuMarkup } from './components/menu';
import { getSortingMarkup } from './components/sorting';
import { getFilmsAreaMarkup } from './components/films-area';
import { getFilmsListMarkup } from './components/films-list';
import { getFilmsListExtraMarkup } from './components/films-list-extra';
import { getFilmCardMarkup } from './components/card';
import { getShowMoreBtnMarkup } from './components/show-more-button';
import { getFilmDetailsMarkup } from './components/film-details';
import { Mock } from './mock';

const LOAD_NUM = 5;

const header = document.querySelector(`.header`);
const mainContainer = document.querySelector(`.main`);
const body = document.querySelector(`body`);

const films = Mock.load();
let shownFilms = films.slice(0, LOAD_NUM);

const renderComponent = (container, component, position) => {
  container.insertAdjacentHTML(position, component);
};

renderComponent(header, getSearchMarkup(), Position.BEFOREEND);
renderComponent(header, getUserLevelMarkup(), Position.BEFOREEND);
renderComponent(mainContainer, getMenuMarkup(), Position.BEFOREEND);
renderComponent(mainContainer, getSortingMarkup(), Position.BEFOREEND);
renderComponent(mainContainer, getFilmsAreaMarkup(), Position.BEFOREEND);

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

renderComponent(body, getFilmDetailsMarkup(shownFilms[0]), Position.BEFOREEND);

console.log(films);
