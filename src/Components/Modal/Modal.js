import React from "react";

const Modal = (props) => {
  return (
    <div className="h-screen w-screen bg-black/20 fixed left-0 top-0 pt-13 z-[1000]" style={{ display: props.modalDisplay}}>
      <div className="w-4/5 max-w-[380px] h-32 mx-auto rounded-xl bg-white place-items-center relative grid">
      <i className="fas fa-window-close text-2xl absolute right-5 top-4 cursor-pointer" onClick={() => props.setModalDisplay("none")}></i>
        <h3 className="font-semibold text-xl">{props.content}</h3>
      </div>
    </div>
  );
};

export default Modal;
