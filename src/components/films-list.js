import { createElement } from '../utils/utils';

export class FilmsList {
  constructor({ title, extra }) {
    this._title = title;
    this._extra = extra;
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
      <section class="films-list${this._extra ? `--extra` : ``}">
        <h2 class="films-list__title ${this._extra ? `` : `visually-hidden`}">${this._title}</h2>
        <div class="films-list__container"></div>
      </section>
    `.trim();
  }
}
