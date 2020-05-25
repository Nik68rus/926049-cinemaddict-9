export const getStatisticMarkup = (movies) => {
  return `
    <section class="footer__statistics">
      <p>${movies.length} movies inside</p>
    </section>
  `;
};
