export default class GameView {
  #view;
  #cells = [];

  constructor(id) {
    this.#view = document.createElement('div');
    this.#view.setAttribute('id', id);

    for (let i = 0; i < 9; i++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      this.#cells.push(cell);
      this.#view.appendChild(cell);
    }
  }

  getView() {
    return this.#view;
  }

  resetView() {}
}