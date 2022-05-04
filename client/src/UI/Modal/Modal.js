import React from "react";
import ReactDOM from "react-dom";
import "./Modal.css";

const Modal = (props) => {
  let content = null;
  if (props.show) {
    content = <div onClick={props.toggleModal} className="Modal"></div>;
  }
  return ReactDOM.createPortal(content, document.getElementById("modal"));
};

export default Modal;
