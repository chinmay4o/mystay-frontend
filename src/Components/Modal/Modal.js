import React from "react";

const Modal = (props) => {
  return (
    <div className="modal-backdrop" style={{ display: props.modalDisplay}}>
      <div className="modal-content">
      <i class="fas fa-window-close" onClick={() => props.setModalDisplay("none")}></i>
        <h3>{props.content}</h3>
      </div>
    </div>
  );
};

export default Modal;
