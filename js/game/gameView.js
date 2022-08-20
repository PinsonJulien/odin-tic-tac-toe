export default class GameView {
  #root;
  #grid = [];
  #cellClickListener = (cell) => null;

  constructor(id) {
    this.#root = document.createElement('div');
    this.#root.setAttribute('id', id);
  }

  setCellClickListener(cellClickListener) {
    this.#cellClickListener = cellClickListener;
  }

  getRoot() {
    return this.#root;
  }

  updateCell(cell) {
    const id = this.#grid.findIndex(e => e.cell === cell);
    const element = this.#grid[id].element;
    const icon = (cell.getOwner()) ? cell.getOwner().getIcon() : "";
    const span = document.createElement('span');
    span.innerText = icon;
    element.replaceChildren(span);
  }

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

    this.#root.replaceChildren(...this.#grid.map(e => e.element));
  }
}