const filmTitles = [
  `Shawshank Redemtion`,
  `The Green Mile`,
  `Forrest Gump`,
  `Schindlers list`,
  `1 + 1`,
  `Inception`,
  `Leon`,
  `The Lion King`,
  `Fight club`,
  `Godfather`,
  `Pulp fiction`,
  `Prestige`,
  `A beautiful mind`,
  `Interstellar`,
  `Gladiator`,
];

const filmPosters = [
  `./images/posters/made-for-each-other.png`,
  `./images/posters/popeye-meets-sinbad.png`,
  `./images/posters/sagebrush-trail.jpg`,
  `./images/posters/santa-claus-conquers-the-martians.jpg`,
  `./images/posters/the-dance-of-life.jpg`,
  `./images/posters/the-great-flamarion.jpg`,
  `./images/posters/the-man-with-the-golden-arm.jpg`,
];

const sentences = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
  `Cras aliquet varius magna, non porta ligula feugiat eget.`,
  `Fusce tristique felis at fermentum pharetra.`,
  `Aliquam id orci ut lectus varius viverra.`,
  `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
  `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
  `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
  `Sed sed nisi sed augue convallis suscipit in sed felis.`,
  `Aliquam erat volutpat.`,
  `Nunc fermentum tortor ac porta dapibus.`,
  `In rutrum ac purus sit amet tempus.`,
];

const GENRES = [
  `Drama`,
  `Film-Noir`,
  `Mystery`,
  `Musical`,
  `Western`,
  `Comedy`,
  `Cartoon`,
];

const getRandomBool = (chance = 0.5) => Math.random() > chance;
const getRandomItem = (array) => array[Math.floor(Math.random() * array.length)];
const getRandomNumber = (min = 0, max) => Math.floor(Math.random() * (max - min + 1)) + min;

export const getFilm = () => ({
  title: getRandomItem(filmTitles),
  poster: getRandomItem(filmPosters),
});
