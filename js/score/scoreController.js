export default class ScoreController {
  #view;
  #player;

  constructor(view, player) {
    this.#view = view;
    this.#player = player;

    this.#view.setName(this.#player.getName());
    this.#view.setScore(this.#player.getScore());
    this.#view.setIcon(this.#player.getIcon());
  }

  getPlayer() {
    return this.#player;
  }

  getView() {
    return this.#view;
  }

  addScore(score) {
    const newScore = this.#player.getScore() + score;
    this.#player.setScore(newScore);
    this.#view.setScore(newScore);
  }
}