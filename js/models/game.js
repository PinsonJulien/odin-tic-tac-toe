export default class Game {
  #players = [];
  #turn;
  #grid = [[]];

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
}