import Modal from "../../js/components/modal.js";
import Button from "../../js/components/button.js";

export default class GameOverView {
  #root;
  #victoryText;
  #button;

  constructor(id) {
    this.#root = new Modal();
    this.#root.setAttribute('id', id);
    
    this.#victoryText = document.createElement('p');
    this.#button = new Button();
    this.#button.innerHTML = "Replay";

    this.#root.append(
      this.#victoryText,
      this.#button
    )
  }

  getRoot() {
    return this.#root;
  }

  setVictoryText(text) {
    this.#victoryText.textContent = text;
  }

  setVisible(visible) {
    this.#root.toggle(visible);
  }

  setOnButtonClickListener(fct) {
    this.#button.setOnClick(fct);
  }
}