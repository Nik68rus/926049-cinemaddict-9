import { Position } from './constants';
import { Mock } from './mock';
import { render } from './utils/utils';

import {
  Search, UserLevel
} from './components';

import PageController from './controllers/page';

const FILMS_WATCHED = 25;
const header = document.querySelector(`.header`);
const mainContainer = document.querySelector(`.main`);

const films = Mock.load();

const renderSearch = (container) => {
  const search = new Search();
  render(container, search.getElement(), Position.BEFOREEND);
};

const renderUserLevel = (container, quantity) => {
  const userLevel = new UserLevel(quantity);
  render(container, userLevel.getElement(), Position.BEFOREEND);
};

renderSearch(header);
renderUserLevel(header, FILMS_WATCHED);

const pageController = new PageController(mainContainer, films);
pageController.init();
