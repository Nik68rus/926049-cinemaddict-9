import AbstractComponent from './abstract-component';

export default class FilmsArea extends AbstractComponent {
  getTemplate() {
    return `
      <section class="films"></section>
    `.trim();
  }
}
