const getDateMarkup = (date) => {
  const newDate = new Date(date);
  return `${newDate.getFullYear()}-${newDate.getMonth() + 1}-${newDate.getDate()}`;
};

export const getCommentMarkup = ({ emotion, text, author, date }) => {
  return `
  <li class="film-details__comment">
    <span class="film-details__comment-emoji">
      <img src="./images/emoji/${emotion}.png" width="55" height="55" alt="emoji">
    </span>
    <div>
      <p class="film-details__comment-text">${text}</p>
      <p class="film-details__comment-info">
        <span class="film-details__comment-author">${author}</span>
        <span class="film-details__comment-day">${getDateMarkup(date)}</span>
        <button class="film-details__comment-delete">Delete</button>
      </p>
    </div>
  </li>
  `;
};
