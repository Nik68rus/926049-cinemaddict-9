import { Menu, Sorting, FilmsArea, FilmsList, Card, FilmDetails, ShowMoreBtn, Footer } from '../components';
import { render, unrender } from '../utils/utils';
import { Position, LOAD_NUM } from '../constants';

export default class PageController {
  constructor(container, movies) {
    this._container = container;
    this._movies = movies;
    this._menu = new Menu(this._getMenuData(this._movies));
    this._sorting = new Sorting();
    this._filmsArea = new FilmsArea();
    this._shownFilms = 0;
    this._mainFilmsContainer = null;
    this._body = document.querySelector(`body`);
    this._footerStatistic = new Footer(this._movies.length);
    this._showMoreBtn = new ShowMoreBtn();
    this._onShowMoreBtnClick = this._onShowMoreBtnClick.bind(this);
    this._sortedMovies = movies;
  }

  init() {
    render(this._container, this._menu.getElement(), Position.AFTERBEGIN);
    render(this._container, this._sorting.getElement(), Position.BEFOREEND);
    render(this._container, this._filmsArea.getElement(), Position.BEFOREEND);
    render(document.querySelector(`.footer`), this._footerStatistic.getElement(), Position.BEFOREEND);

    this._getFilmListsData().forEach((list) => {
      const filmList = new FilmsList(list);
      render(this._filmsArea.getElement(), filmList.getElement(), Position.BEFOREEND);
    });

    this._mainFilmsContainer = this._filmsArea.getElement().querySelector(`.films-list__container`);
    this._movies.slice(this._shownFilms, this._shownFilms + LOAD_NUM).forEach((movie) => this._renderMovie(this._mainFilmsContainer, movie));
    this._shownFilms += LOAD_NUM;
    render(this._filmsArea.getElement().querySelector(`.films-list`), this._showMoreBtn.getElement(), Position.BEFOREEND);
    this._showMoreBtn.getElement().addEventListener(`click`, this._onShowMoreBtnClick);
    this._updateExtraLists();
    this._sorting.getElement().addEventListener(`click`, (evt) => this._onSortLinkClick(evt));
  }

  _getMenuData(movies) {
    const getMoviesCount = (list, cb) => list.filter(cb).length;
    const findWatchlistMovies = (movie) => movie.inWatchlist;
    const findWatchedMovies = (movie) => movie.isWatched;
    const findFavoriteMovies = (movie) => movie.isFavorite;

    return [
      { title: `All movies`, count: movies.length, active: true },
      { title: `Watchlist`, count: getMoviesCount(movies, findWatchlistMovies), active: false },
      { title: `History`, count: getMoviesCount(movies, findWatchedMovies), active: false },
      { title: `Favorite`, count: getMoviesCount(movies, findFavoriteMovies), active: false },
      { title: `Stats`, active: false },
    ];
  }

  _getFilmListsData() {
    return [
      { title: `All movies. Upcomming` },
      { title: `Top rated`, extra: true },
      { title: `Most commented`, extra: true },
    ];
  }

  _renderMovie(container, movie) {
    const movieCard = new Card(movie);
    const filmDetails = new FilmDetails(movie);
    const cardElement = movieCard.getElement();
    const poster = cardElement.querySelector(`img`);
    const title = cardElement.querySelector(`.film-card__title`);
    const comments = cardElement.querySelector(`.film-card__comments`);
    const closeBtn = filmDetails.getElement().querySelector(`.film-details__close-btn`);

    const showPopup = () => {
      render(this._body, filmDetails.getElement(), Position.BEFOREEND);
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

    render(container, movieCard.getElement(), Position.BEFOREEND);
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

    filmDetails.getElement().querySelector(`textarea`)
      .addEventListener(`focus`, () => {
        document.removeEventListener(`keydown`, onEscKeyDown);
      });

    filmDetails.getElement().querySelector(`textarea`)
      .addEventListener(`blur`, () => {
        document.addEventListener(`keydown`, onEscKeyDown);
      });
  }

  _onShowMoreBtnClick() {
    const renderingFilms = this._movies.slice(this._shownFilms, this._shownFilms + LOAD_NUM);
    this._shownFilms += LOAD_NUM;
    renderingFilms.forEach((movie) => this._renderMovie(this._mainFilmsContainer, movie));
    if (renderingFilms.length < LOAD_NUM) {
      this._showMoreBtn.getElement().style.display = `none`;
      this._showMoreBtn.getElement().removeEventListener(`click`, this._onShowMoreBtnClick);
    }
  }

  _updateExtraLists() {
    const topRatedList = this._filmsArea.getElement().querySelectorAll(`.films-list--extra`)[0];
    const mostCommentedList = this._filmsArea.getElement().querySelectorAll(`.films-list--extra`)[1];
    const topRatedMovies = this._movies.sort((a, b) => b.rating - a.rating).slice(0, 2);
    const mostCommentedMovies = this._movies.sort((a, b) => b.comments.length - a.comments.length).slice(2, 4);
    topRatedMovies.forEach((movie) => {
      this._renderMovie(topRatedList.querySelector(`.films-list__container`), movie);
    });
    mostCommentedMovies.forEach((movie) => {
      this._renderMovie(mostCommentedList.querySelector(`.films-list__container`), movie);
    });
  }

  _onSortLinkClick(evt) {
    evt.preventDefault();
    if (evt.target.tagName.toLowerCase() !== `a`) {
      return;
    }
    this._mainFilmsContainer.innerHTML = ``;

    switch (evt.target.dataset.sort) {
      case `default`:
        this._sortedMovies = this._movies;
        break;
      case `date`:
        this._sortedMovies = this._movies.slice().sort((a, b) => b.year - a.year);
        break;
      case `rate`:
        this._sortedMovies = this._movies.slice().sort((a, b) => b.rating - a.rating);
        break;
    }

    this._sortedMovies.slice(0, this._shownFilms).forEach((movie) => this._renderMovie(this._mainFilmsContainer, movie));

  }
}
