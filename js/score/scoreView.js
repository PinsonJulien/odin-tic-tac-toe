export default class ScoreView {
  #view;
  #name;
  #score;

  constructor() {
    this.#view = document.createElement('div');
    this.#view.classList.add('container');
    this.#name = document.createElement('p');
    this.#score = document.createElement('p');

    this.#view.append(
      this.#name,
      this.#score,
    );
  }

  getView() {
    return this.#view;
  }

  resetView() {}

  setName(name) {
    this.#name.innerText = name;
  }

  setScore(score) {
    this.#score.innerText = score;
  }
}