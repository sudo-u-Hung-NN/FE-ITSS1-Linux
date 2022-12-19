export const getRandomArrayNumber = (maxValue, arrNum) => {
  let arr = [];
  for (let i = 0; i < arrNum; i++) {
    arr.push(Math.floor(Math.random() * maxValue));
  }
  return arr;
};
