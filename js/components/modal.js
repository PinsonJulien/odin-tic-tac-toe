import Component from "../components/component.js";

export default class Modal extends Component {
  modal;

  constructor() {
    super (
      /*css*/`
        .modal {
          display: none;
          position: fixed;
          z-index: 999;
          left: 0;
          top: 0;
          width: 100vw;
          height: 100vh;
          overflow: auto;
          backdrop-filter: contrast(40%);
        }

        .modal-content {
          margin: auto;
          max-width: 100%;
          max-height: 100%;
          align-self: center;
        }
      `,
      /*html*/`
        <div class="modal" part="modal">
          <div class="modal-content" part="container">
            <slot></slot>
          </div>
        </div>
      `
    );
    
    this.modal = this.shadowRoot.querySelector('.modal');
  }

  toggle (active) {
    this.modal.style.display = (active) ? "flex" : "";
  }
}