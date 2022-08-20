export default class Game {
  #players = [];
  #turn = 0;
  #grid = [[]];
  #state = true; // true : the game is on

  constructor() {}

  setPlayers(players) {
    this.#players = [...players];
  }

  getPlayers() {
    return this.#players;
  }

  setTurn(turn) {
    this.#turn = turn;
  }

  getTurn() {
    return this.#turn;
  }

  setGrid(grid) {
    this.#grid = grid;
  }

  getGrid() {
    return this.#grid;
  }

  setState(state) {
    this.#state = state;
  }

  getState() {
    return this.#state;
  }
}