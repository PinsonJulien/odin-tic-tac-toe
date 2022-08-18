"use strict";
import Modal from "../js/components/modal.js";
import Button from "../js/components/button.js";
import GameView from "../js/game/gameView.js";
import ScoreView from "../js/score/scoreView.js";
import Player from "../js/models/player.js";
import ScoreController from "../js/score/scoreController.js";
import GameController from "./game/gameController.js";

// Custom components definition
customElements.define('modal-component', Modal);
customElements.define('button-component', Button);

// Creating players
const player = new Player('Jean', 0);
const bot = new Player('Bot', 0);

// Creating views and controllers
const playerScoreView = new ScoreView();
const botScoreView = new ScoreView();

const playerScoreController = new ScoreController(playerScoreView, player);
const botScoreController = new ScoreController(botScoreView, bot);

const gameView = new GameView('board');
const gameController = new GameController(
  gameView, 
  playerScoreController, 
  botScoreController
);

// Populate the DOM
document.getElementById('main').appendChild(gameView.getView());
document.getElementById('scores').append(
  playerScoreView.getView(),
  botScoreView.getView()
);