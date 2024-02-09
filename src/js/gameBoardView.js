class GameBoardView {
  element = document.querySelector('.game-board');
  wordEl = document.querySelector('.word-guess');
  guessEl = document.querySelector('.word-ans');
  livesEl = document.querySelector('.lives');
  catchedEl = document.querySelector('.catched');
  scoreEl = document.querySelector('.score');

  createElements() {
    for (let i = 0; i < 10; i++) {
      const el = document.createElement('div');
      el.classList.add(`letter-${i}`);
      this.element.insertAdjacentElement('beforeend', el);
    }
  }
  displayCounter(n) {
    const counterEl = document.querySelector('.counter');
    counterEl.textContent = '';
    counterEl.textContent = n;
  }
  displayWord(word) {
    this.wordEl.textContent = '';
    this.wordEl.textContent = word.toUpperCase();
  }
  dislpayGuessing(guess) {
    this.guessEl.textContent = '';
    this.guessEl.textContent = guess.toUpperCase();
  }
  displayLives(lives) {
    this.livesEl.textContent = '';
    this.livesEl.textContent = lives.join('');
  }
  displayCatchedWord(catched) {
    this.catchedEl.textContent = '';
    this.catchedEl.textContent = catched;
  }
  displayScores(score) {
    this.scoreEl.textContent = '';
    this.scoreEl.textContent = score;
  }
}
export default new GameBoardView();
