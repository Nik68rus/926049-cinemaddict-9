import { Position } from './constants';
import { Mock } from './mock';
import { render, unrender } from './utils/utils';

import {
  Card, FilmDetails, FilmsArea, FilmsList, Footer, Menu, Search, ShowMoreBtn, Sorting, UserLevel
} from './components';

const LOAD_NUM = 5;
const FILMS_WATCHED = 25;

const header = document.querySelector(`.header`);
const mainContainer = document.querySelector(`.main`);
const body = document.querySelector(`body`);
const footer = document.querySelector(`.footer`);

const films = Mock.load();
const menuItems = Mock.menu(films);
const filmsLists = Mock.lists();

let shownFilms = films.slice(0, LOAD_NUM);

const renderSearch = (container) => {
  const search = new Search();
  render(container, search.getElement(), Position.BEFOREEND);
};

const renderUserLevel = (container, quantity) => {
  const userLevel = new UserLevel(quantity);
  render(container, userLevel.getElement(), Position.BEFOREEND);
};

const renderMenu = (container, menuElements) => {
  const menu = new Menu(menuElements);
  render(container, menu.getElement(), Position.AFTERBEGIN);
};

const renderSorting = (container) => {
  const sorting = new Sorting();
  render(container, sorting.getElement(), Position.BEFOREEND);
};

const renderFilmsArea = (container) => {
  const filmsArea = new FilmsArea();
  render(container, filmsArea.getElement(), Position.BEFOREEND);
};

const renderFilmsList = (container, list) => {
  const filmsList = new FilmsList(list);
  render(container, filmsList.getElement(), Position.BEFOREEND);
};

const renderFooterStatistic = (container, moviesCount) => {
  const footer = new Footer(moviesCount);
  render(container, footer.getElement(), Position.BEFOREEND);
};

const renderMovieCard = (container, movie) => {
  const card = new Card(movie);
  const filmDetails = new FilmDetails(movie);
  const cardElement = card.getElement();
  const poster = cardElement.querySelector(`img`);
  const title = cardElement.querySelector(`.film-card__title`);
  const comments = cardElement.querySelector(`.film-card__comments`);
  const closeBtn = filmDetails.getElement().querySelector(`.film-details__close-btn`);

  const showPopup = () => {
    render(body, filmDetails.getElement(), Position.BEFOREEND);
    document.addEventListener(`keydown`, onEscKeyDown);
  };

  const closePopup = () => {
    unrender(filmDetails.getElement());
  };

  const onEscKeyDown = (evt) => {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      closePopup();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  render(container, card.getElement(), Position.BEFOREEND);
  if (poster) {
    poster.addEventListener(`click`, showPopup);
  }

  if (title) {
    title.addEventListener(`click`, showPopup);
  }

  if (comments) {
    comments.addEventListener(`click`, showPopup);
  }

  if (closeBtn) {
    closeBtn.addEventListener(`click`, closePopup);
  }
};

const renderShowMoreBtn = (container) => {
  const btn = new ShowMoreBtn();
  render(container, btn.getElement(), Position.BEFOREEND);
};

renderSearch(header);
renderUserLevel(header, FILMS_WATCHED);
renderMenu(mainContainer, menuItems);
renderSorting(mainContainer);
renderFilmsArea(mainContainer);
renderFooterStatistic(footer, films.length);

const filmListsContainer = document.querySelector(`.films`);

filmsLists.forEach((list) => renderFilmsList(filmListsContainer, list));

const mainFilmsContainer = document.querySelector(`.films-list .films-list__container`);
const mainFilmsList = document.querySelector(`.films-list`);
const extraFilmsLists = filmListsContainer.querySelectorAll(`.films-list--extra`);


shownFilms.forEach((film) => renderMovieCard(mainFilmsContainer, film));
renderShowMoreBtn(mainFilmsList);
extraFilmsLists.forEach((list) => {
  const extraFilmsContainer = list.querySelector(`.films-list__container`);
  shownFilms.slice(0, 2).forEach((film) => renderMovieCard(extraFilmsContainer, film));
});

const showMoreButton = document.querySelector(`.films-list__show-more`);

const onShowMoreButtonClick = () => {
  const renderingFilms = films.slice(shownFilms.length, shownFilms.length + LOAD_NUM);
  renderingFilms.forEach((film) => renderMovieCard(mainFilmsContainer, film));
  shownFilms = shownFilms.concat(renderingFilms);
  if (renderingFilms.length < LOAD_NUM) {
    showMoreButton.style.display = `none`;
    showMoreButton.removeEventListener(`click`, onShowMoreButtonClick);
  }
};

showMoreButton.addEventListener(`click`, onShowMoreButtonClick);
