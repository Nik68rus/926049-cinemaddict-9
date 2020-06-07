import AbstractComponent from './abstract-component';

export default class Menu extends AbstractComponent {
  constructor(items) {
    super();
    this._items = items;
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
