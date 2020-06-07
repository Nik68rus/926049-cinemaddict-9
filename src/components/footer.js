import AbstractComponent from './abstract-component';

export default class Footer extends AbstractComponent {
  constructor(movies) {
    super();
    this._movies = movies;
  }

  getTemplate() {
    return `
      <section class="footer__statistics">
        <p>${this._movies} movies inside</p>
      </section>
    `.trim();
  }
}
