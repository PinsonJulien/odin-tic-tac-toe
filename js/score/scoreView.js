export default class ScoreView {
  #root;
  #name;
  #score;
  #icon;

  constructor() {
    this.#root = document.createElement('div');
    this.#root.classList.add('container');
    this.#name = document.createElement('p');
    this.#score = document.createElement('p');
    this.#icon = document.createElement('p');

    this.#root.append(
      this.#name,
      this.#score,
      this.#icon,
    );
  }

  getRoot() {
    return this.#root;
  }

  setName(name) {
    this.#name.innerText = name;
  }

  setScore(score) {
    this.#score.innerText = score;
  }

  setIcon(icon) {
    this.#icon.innerText = icon;
  }
}