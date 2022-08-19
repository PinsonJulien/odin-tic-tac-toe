export default class Cell {
  #owner = null;

  constructor() {}

  setOwner(owner) {
    this.#owner = owner;
  }

  getOwner() {
    return this.#owner;
  }
}