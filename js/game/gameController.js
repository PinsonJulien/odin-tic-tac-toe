import Cell from "../../js/models/cell.js";

export default class GameController {
  #gameView;
  #game;
  #scoreControllers = [];

  constructor(gameView, game, scoreControllers) {
    this.#gameView = gameView;
    this.#game = game;
    this.#scoreControllers = scoreControllers;

    this.#gameView.setCellClickListener((cell) => this.playerTurn(cell));
  }
  
  playerTurn(cell) {
    const player = this.getCurrentTurnPlayer();

    // Check if it's human turn;
    if (this.isPlayerRobot(player)) return;
    
    // Check if the cell is available
    if (this.isCellOwned(cell)) return;

    this.makeMove(cell, player);
  }

  robotTurn() {
    const botPlayer = this.getCurrentTurnPlayer();
    
    // Bot algorithm, currently randomly play on any available cell.
    const availableCells = this.getAvailableCells();
    const cell = availableCells[Math.floor(Math.random()*availableCells.length)]; 

    this.makeMove(cell, botPlayer);
  }

  makeMove(cell, player) {
    // Set the owner and change the UI
    cell.setOwner(player);
    this.#gameView.updateCell(cell);

    // Checks if any player won or if it's a tie.
    if (this.winCondition(cell, player)) {
      this.gameOver(player);
      return;
    }
      

    // Tie if all cells are taken
    if (this.tieCondition()) {
      this.gameOver();
      return;
    }
      
    this.endTurn();
  }

  winCondition (cell, player) {
    const grid = this.#game.getGrid();
    const length = grid.length;

    const rowCell = grid.findIndex( row => row.includes(cell));
    const colCell = grid[rowCell].indexOf(cell);

    const isOwnedByPlayer = (cell) => {
      return cell.getOwner() === player;
    };
    
    // Row check -
    const rowCheck = () => {
      for (let i = 0; i < length; ++i) {
        if (!isOwnedByPlayer(grid[rowCell][i])) return false;        
      }

      return true;
    };

    if (rowCheck()) return true;

     // Column check |
    const columnCheck = () => {
      for (let i = 0; i < length; ++i) {
        if (!isOwnedByPlayer(grid[i][colCell])) return false;
      }

      return true;
    };

    if (columnCheck()) return true; 

    // If the cell isn't part of the central diagonals don't check them
    // diagonal check /
    if (colCell === ((length-1) - rowCell)) {
      const diagonalCheck = () => {
        for (let i = 0; i < length; ++i) {
          if (!isOwnedByPlayer(grid[length-1-i][i])) return false;
        }

        return true;
      };

      if (diagonalCheck()) return true;
    }
   
    // anti-diagonal check \
    if (rowCell === colCell) {
      const antiDiagonalCheck = () => {
        for (let i = 0; i < length; ++i) {
          if(!isOwnedByPlayer(grid[i][i])) return false;
        }

        return true;
      };

      if (antiDiagonalCheck()) return true;
    }

    return false;
  }

  tieCondition() {
    // If a cell don't have an owner, return false.
    return this.getAvailableCells().length === 0;
  }

  changeTurn() {
    const playerCount = this.#game.getPlayers().length;
    
    const currentTurn = this.#game.getTurn() + 1;
    this.#game.setTurn(
      (currentTurn === playerCount)
      ? 0
      : currentTurn
    );
  }

  endTurn() {
    this.changeTurn();

    // If the current player is a robot, let the algorithm do a move.
    const player = this.getCurrentTurnPlayer();
    if (this.isPlayerRobot(player)) this.robotTurn();
  }

  gameOver(winner) {
    // tie
    if (!winner) {

    } else {
      this.getScoreController(winner).addScore(1);
    }

    console.log('game over.');
  }

  getCurrentTurnPlayer() {
    return this.#game.getPlayers()[this.#game.getTurn()];
  }

  isPlayerRobot(player) {
    return player.getType() === 'robot';
  }

  getCell(cell) {
    return this.#game.getGrid()[cell];
  }

  isCellOwned(cell) {
    return cell.getOwner();
  }

  getAvailableCells() {
    const grid = this.#game.getGrid();
    const len = grid.length;
    const arr = [];

    for (let i = 0; i < len; ++i) {
      for (let j = 0; j < len; ++j) {
        const cell = grid[i][j];
        if (!cell.getOwner()) arr.push(cell);
      }
    }

    return arr;
  }

  generateGrid (length) {
    const arr = [];

    for (let i = 0; i < length ; ++i) {
      const subArr = [];
      for (let j = 0; j < length ; ++j) {
        subArr.push(new Cell());
      }
      arr.push(subArr);
    }

    this.#game.setGrid([...arr]);
    this.#gameView.generateGrid([...arr]);
  }

  getScoreController(player) {
    return this.#scoreControllers.find(e => e.getPlayer() === player);
  }
}