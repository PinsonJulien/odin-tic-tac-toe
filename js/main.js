"use strict";
import Modal from "../js/components/modal.js";
import Button from "../js/components/button.js";
import GameView from "../js/game/gameView.js";
import ScoreView from "../js/score/scoreView.js";
import Player from "../js/models/player.js";
import ScoreController from "../js/score/scoreController.js";
import GameController from "../js/game/gameController.js";
import Game from "../js/models/game.js";
import GameOverView from "../js/game/gameOverView.js";

// Custom components definition
customElements.define('modal-component', Modal);
customElements.define('button-component', Button);

// Creating models
const players = [
  new Player('Jean', 0, 'human', '❌'),
  new Player('Bot', 0, 'robot', '⭕'),
];

const scoreControllers = [];
players.forEach((player) => {
  scoreControllers.push(
    new ScoreController(new ScoreView(), player)
  );
});

const game = new Game();

game.setPlayers(players);
game.setTurn(0);

// Creating views and controllers
const gameView = new GameView('board');
const gameController = new GameController(
  gameView,
  game,
  scoreControllers,
  new GameOverView('game-over-modal'),   
);

gameController.generateGrid(3);

// Populate the DOM
document.getElementById('main').appendChild(gameView.getView());
document.getElementById('scores').append(
  ...scoreControllers.map((e) => e.getView().getRoot())
);

document.body.appendChild(
  gameController.getGameOverView().getRoot()
);