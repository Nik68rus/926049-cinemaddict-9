import { createElement } from '../utils/utils';

export class Menu {
  constructor(items) {
    this._items = items;
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

  _getId(menuItem) {
    return menuItem.split(` `)[0].toLowerCase();
  }

  getTemplate() {
    return `
  <nav class="main-navigation">
    ${this._items.map(({ title, count, active }) => {
      const id = this._getId(title);
      return `
      <a href="#${id}" class="main-navigation__item ${active ? `main-navigation__item--active` : ``} ${id === `stats` ? `main-navigation__item--additional` : ``}">${title}${id === `all` || id === `stats` ? `` : ` <span class="main-navigation__item-count">${count}</span>`} </a>
    `;
    }).join(`\n`)}
  </nav>
  `.trim();
  }
}
