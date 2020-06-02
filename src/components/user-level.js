
import { createElement } from '../utils/utils';

export class UserLevel {
  constructor(filmsWatched) {
    this._filmsWatched = filmsWatched;
    this._element = null;
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }

  _getUserStatus(quantity) {
    switch (true) {
      case quantity === 0:
        return ``;
      case quantity <= 10:
        return `Novice`;
      case quantity > 10 && quantity <= 20:
        return `Fan`;
    }
    return `Movie Buff`;
  }

  getTemplate() {
    return `
      <section class="header__profile profile">
        <p class="profile__rating">${this._getUserStatus(this._filmsWatched)}</p>
        <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
      </section>
    `.trim();
  }
}
