export default class ScoreView {
  #root;
  #name;
  #score;

  constructor() {
    this.#root = document.createElement('div');
    this.#root.classList.add('container');
    this.#name = document.createElement('p');
    this.#score = document.createElement('p');

    this.#root.append(
      this.#name,
      this.#score,
    );
  }

  getRoot() {
    return this.#root;
  }

  resetView() {}

  setName(name) {
    this.#name.innerText = name;
  }

  setScore(score) {
    this.#score.innerText = score;
  }
}