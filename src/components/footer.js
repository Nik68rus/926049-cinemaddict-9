import { createElement } from '../utils/utils';

export class Footer {
  constructor(movies) {
    this._movies = movies;
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

  getTemplate() {
    return `
      <section class="footer__statistics">
        <p>${this._movies} movies inside</p>
      </section>
    `.trim();
  }
}
