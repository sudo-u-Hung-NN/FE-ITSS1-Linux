export const getRandomArrayNumber = (maxValue, arrNum) => {
  let arr = [];
  for (let i = 0; i < arrNum; i++) {
    arr.push(Math.floor(Math.random() * maxValue));
  }
  return arr;
};
export const convertMatrix = (one_dimensional_array, n) => {
  let result = [];
  while (one_dimensional_array.length)
    result.push(one_dimensional_array.splice(0, n));
  return result;
};
