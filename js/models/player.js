export default class Player {
  #name = "";
  #score = 0;
  #type; // either "human" or "robot"
  #icon;

  constructor(name, score, type, icon) {
    this.#name = name;
    this.#score = score;
    this.#type = type;
    this.#icon = icon;
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

  setType(type) {
    this.#type = type;
  }

  getType() {
    return this.#type;
  }

  setIcon(icon) {
    this.#icon = icon;
  }

  getIcon() {
    return this.#icon;
  }
}