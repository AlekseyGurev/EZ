export const getRandomId = (min = 1, max = 10000) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min).toString();
};
