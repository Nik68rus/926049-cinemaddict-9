import AbstractComponent from './abstract-component';

export default class FilmsList extends AbstractComponent {
  constructor({ title, extra }) {
    super();
    this._title = title;
    this._extra = extra;
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
