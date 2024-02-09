import * as model from './model.js';
import * as helper from './helper.js';
import gameBoard from './gameBoardView.js';
import gameBoardView from './gameBoardView.js';

if (module.hot) {
  module.hot.accept();
}

let gameBoardEl = document.querySelector('.game-board');
const starterScreen = document.querySelector('.starter-screen');
let btnsLevel = document.querySelector('.levels-menu');
const screenInfo = document.querySelector('.starter-screen-info');
const successInfo = document.querySelector('.success-info');
const looseInfo = document.querySelector('.loose-info');

let level = 0;
let counter = 0;
let gamePlay = true;
let nowPlaying = false;

const startGame = function () {
  gameBoard.createElements();
  fillBoardBlur();
  screenInfo.classList.remove('game-over');
  starterScreen.addEventListener('click', async function () {
    gamePlay = false;
    starterScreen.classList.add('move-screen');
  });
};
const gameOver = function () {
  gameBoard.createElements();
  fillBoardBlur();
  starterScreen.classList.remove('move-screen');
  starterScreen.classList.add('game-over');
  screenInfo.textContent = 'GAME OVER';
  [...btnsLevel.children].forEach(btn =>
    btn.classList.remove('btn-level-active')
  );
  [...btnsLevel.children].forEach(btn =>
    btn.classList.remove('btn-level-disabled')
  );
  gameBoardView.dislpayGuessing('');
  gameBoardView.displayWord('');
  gameBoardView.displayScores(0);
  gameBoardView.displayCatchedWord(0);
  model.resetLives();
  model.resetScoreAndCatched();
  removelListeners();
  btnsLevel.replaceWith(btnsLevel.cloneNode(true));
  btnsLevel = document.querySelector('.levels-menu');
  nowPlaying = true;
  startGameListener();
};

const startGameListener = function () {
  btnsLevel.addEventListener('click', e => {
    if (!e.target.classList.contains('btn-level')) return;
    [...btnsLevel.children].forEach(btn =>
      btn.classList.remove('btn-level-active')
    );
    [...btnsLevel.children].forEach(btn =>
      btn.classList.add('btn-level-disabled')
    );
    e.target.classList.add('btn-level-active');
    if (e.target.classList.contains('easy')) {
      level = model.easy;
    } else if (e.target.classList.contains('normal')) {
      level = model.normal;
    } else if (e.target.classList.contains('hard')) {
      level = model.hard;
    }

    startGameLevel();
  });
};

const removelListeners = function () {
  gameBoardEl.replaceWith(gameBoardEl.cloneNode(true));
  gameBoardEl = document.querySelector('.game-board');
};

const gameLoop = function () {
  setInterval(() => {
    if (nowPlaying === false && model.getLives().length > 0) {
      removelListeners();
      fillBoard();
    }
  }, 3000);
};
const startGameLevel = function () {
  fillBoard();
  gameLoop();
};

const wait = function (sec) {
  return new Promise(resolve => setTimeout(() => resolve(), sec * 1000));
};
const randomLetter = function () {
  return model.letters[Math.floor(Math.random() * model.letters.length)];
};

const createLetter = async function (element) {
  const letter = document.createElement('div');
  letter.textContent = randomLetter();
  letter.classList.add('flow-down');
  element.insertAdjacentElement('afterbegin', letter);
  await wait(3);
  letter.remove();
};

const wordValidate = function () {
  let word = model.randomWord();
  gameBoard.displayWord(word);

  let check = [...word].map(el => '_').join('');
  gameBoard.dislpayGuessing(check);

  const validateCallback = function (e) {
    if (e.target.textContent === '') return;
    if (word.indexOf(e.target.textContent.toLowerCase()) !== -1) {
      gameBoardView.displayScores(model.manageScoreActual(10));
    } else {
      gameBoardView.displayScores(model.manageScoreActual(-5));
    }
    helper.findAllOccurrences(word, e.target.textContent).forEach(index => {
      check =
        check.slice(0, index) +
        e.target.textContent +
        check.slice(index + 1, check.length);
      gameBoard.dislpayGuessing(check);
      if (word === check.toLowerCase()) {
        helper.hideInfo('.success-info');
        gamePlay = false;
        wait(4).then(() => {
          gamePlay = true;
          nowPlaying = false;
          check = '';
          word = '';
          gameBoardView.displayCatchedWord(model.manageCatchedWords(1));
          gameBoardView.displayScores(model.manageScoreActual(100));
          return;
        });

        return true;
      }
    });
  };
  gameBoardEl.addEventListener('click', e => {
    validateCallback(e);
  });
};
const fillBoardBlur = async function () {
  let counter1 = 500;
  let workingArr = helper.sortedDivs();
  while (gamePlay) {
    counter--;
    if (workingArr.length > 0) {
      createLetter(workingArr.pop());
    } else {
      workingArr = helper.sortedDivs();
      createLetter(workingArr.pop());
    }
    await wait(0.3);
    if (counter1 === 0) {
      await wait(2);
      gamePlay = false;
    }
  }
};
const fillBoard = async function () {
  counter = level;
  gamePlay = true;
  nowPlaying = true;
  gameBoard.displayCounter(counter);
  gameBoard.displayLives(model.getLives());

  let workingArr = helper.sortedDivs();
  if (wordValidate()) return;

  if (!gamePlay) return;
  while (gamePlay) {
    counter--;
    if (workingArr.length > 0) {
      createLetter(workingArr.pop());
    } else {
      workingArr = helper.sortedDivs();
      createLetter(workingArr.pop());
    }
    await wait(0.4);
    gameBoard.displayCounter(counter);
    if (counter === 0 && model.getLives().length > 0) {
      helper.hideInfo('.loose-info');
      await wait(3);
      gamePlay = false;
      nowPlaying = false;
      model.decreaseLives();
      gameBoard.displayLives(model.getLives());
      if (counter === 0 && model.getLives().length <= 0) {
        gameOver();
      }
      return;
    }
  }
  return;
};

startGame();

startGameListener();
