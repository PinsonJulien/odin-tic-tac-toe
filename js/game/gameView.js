export default class GameView {
  #view;
  #grid = [];
  #cellClickListener = (cell) => null;
  #cellOn;

  constructor(id) {
    this.#view = document.createElement('div');
    this.#view.setAttribute('id', id);
  }

  setCellClickListener(cellClickListener) {
    this.#cellClickListener = cellClickListener;
  }

  getView() {
    return this.#view;
  }

  updateCell(cell) {
    const id = this.#grid.findIndex(e => e.cell === cell);
    const element = this.#grid[id].element;
    const icon = cell.getOwner().getIcon();
    const span = document.createElement('span');
    span.innerText = icon;
    element.append(span);
  }

  resetView() {}

  generateGrid(grid) {
    this.#grid = [];

    grid.forEach(row => {
      row.forEach(cell => {
        const element = document.createElement('div');
        element.classList.add('cell');

        element.addEventListener('click', (e) => {
          this.#cellClickListener(cell);
        });

        this.#grid.push({
          cell,
          element
        });        
      });
    });

    this.#view.replaceChildren(...this.#grid.map(e => e.element));
  }
}