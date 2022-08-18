export default class Player {
  #name = "";
  #score = 0;

  constructor(name, score) {
    this.#name = name;
    this.#score = score;
  }

  setName(name) {
    this.#name = name;
  }

  getName() {
    return this.#name;
  }

  setScore(score) {
    this.#score = score;
  }

  getScore() {
    return this.#score;
  }
}