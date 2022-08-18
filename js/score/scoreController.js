export default class ScoreController {
  #view;
  #player;

  constructor(view, player) {
    this.#view = view;
    this.#player = player;

    this.#view.setName(this.#player.getName());
    this.#view.setScore(this.#player.getScore());
  }
}