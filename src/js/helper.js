export const findAllOccurrences = (str, substr) => {
  str = str.toUpperCase();

  let result = [];

  let idx = str.indexOf(substr);

  while (idx !== -1) {
    result.push(idx);
    idx = str.indexOf(substr, idx + 1);
  }
  return result;
};

export const wait = function (sec) {
  return new Promise(resolve => setTimeout(() => resolve(), sec * 1000));
};

export const sortedDivs = function () {
  const cells = [...document.querySelectorAll('.game-board > div')];

  const letterElems = cells
    .slice()
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
  return letterElems;
};

export const hideInfo = async function (selector) {
  document.querySelector(selector).classList.remove('hide-info');
  await wait(3);
  document.querySelector(selector).classList.add('hide-info');
};
