
import AbstractComponent from './abstract-component';

export default class UserLevel extends AbstractComponent {
  constructor(filmsWatched) {
    super();
    this._filmsWatched = filmsWatched;
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
