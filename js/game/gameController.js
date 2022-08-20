import Cell from "../../js/models/cell.js";

export default class GameController {
  #gameView;
  #game;
  #scoreControllers = [];
  #gameOverView;

  constructor(gameView, game, scoreControllers, gameOverView) {
    this.#gameView = gameView;
    this.#game = game;
    this.#scoreControllers = scoreControllers;
    this.#gameOverView = gameOverView;

    this.#gameView.setCellClickListener((cell) => this.playerTurn(cell));
    this.#gameOverView.setOnButtonClickListener(() => this.newGame());

    this.setTurn(this.#game.getTurn());
  }

  // Game mechanic methods

  // Reset the game
  newGame() {
    // The game must be over
    if (this.#game.getState()) return;

    this.#game.setState(true);
    this.setTurn(0);

    // Hide modal
    this.#gameOverView.setVisible(false);

    // reset the grid
    this.#game.getGrid().forEach((row) => {
      row.forEach((cell) => {
        cell.setOwner(null);
        this.#gameView.updateCell(cell);
      })
    });
  }

  // Shows the game over modal and prepare for the next game
  gameOver(winner) {
    this.#game.setState(false);
    let victoryText;
    // tie
    if (!winner) {
      victoryText = "It's a tie !"
    } 
    else {
      victoryText = `${winner.getName()} won !`;
      this.getScoreController(winner).addScore(1);
    }

    this.#gameOverView.setVictoryText(victoryText);
    this.#gameOverView.setVisible(true);
  }
 
  // Ensure the player can play it's turn
  playerTurn(cell) {
    const player = this.getCurrentTurnPlayer();

    // Check if it's human turn;
    if (this.isPlayerRobot(player)) return;
    
    // Check if the cell is available
    if (this.isCellOwned(cell)) return;

    this.makeMove(cell, player);
  }

  // Robot algorithm to pick a move
  robotTurn() {
    const botPlayer = this.getCurrentTurnPlayer();
    
    // Bot algorithm, currently randomly play on any available cell.
    const availableCells = this.getAvailableCells();
    const cell = availableCells[Math.floor(Math.random()*availableCells.length)]; 

    this.makeMove(cell, botPlayer);
  }

  // Plays the selected move on the board and check if the game is over
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

  // Checks every winning conditions, boolean return
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

  // Check if all cells are taken
  tieCondition() {
    // If a cell don't have an owner, return false.
    return this.getAvailableCells().length === 0;
  }

  // Turn related methods

  setTurn(turn) {
    const setPlayerSelection = (player, selected) => {
      this.getScoreController(player).setSelected(selected);
    };

    // removes the border from last player
    setPlayerSelection(this.getCurrentTurnPlayer(), false);

    this.#game.setTurn(turn);

    // show the ones of the new player
    setPlayerSelection(this.getCurrentTurnPlayer(), true);
  }

  // Changes the current turn
  changeTurn() {
    const playerCount = this.#game.getPlayers().length;
    
    const currentTurn = this.#game.getTurn() + 1;
    this.setTurn(
      (currentTurn === playerCount)
      ? 0
      : currentTurn
    );
  }

  // Whenever a player did a move, change the turn and check if the new player is a bot.
  endTurn() {
    // Skip the turn of last player
    this.changeTurn();

    // If the current player is a robot, let the algorithm do a move.
    const player = this.getCurrentTurnPlayer();
    this.getScoreController(player).setSelected(true);
    if (this.isPlayerRobot(player)) this.robotTurn();
  }

  // Utility methods
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

  // Getters 
  getScoreController(player) {
    return this.#scoreControllers.find(e => e.getPlayer() === player);
  }

  getGameOverView() {
    return this.#gameOverView;
  }

  getGameModel() {
    return this.#game;
  }

  getGameView() {
    return this.#gameView;
  }
}