const getUserStatus = (quantity) => {
  switch (true) {
    case quantity === 0:
      return ``;
    case quantity <= 10:
      return `Novice`;
    case quantity > 10 && quantity <= 20:
      return `Fan`;
    case quantity >= 21:
      return `Movie Buff`;
  }
};

export const getUserLevelMarkup = (quantity) => {
  return `
  <section class="header__profile profile">
    <p class="profile__rating">${getUserStatus(quantity)}</p>
    <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
  </section>
  `;
};
