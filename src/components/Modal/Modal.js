import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import "./Modal.css";

const modalRoot = document.getElementById("modal-root");
const Modal = (props) => {
  const el = document.createElement("div");

  //componentDidMount
  useEffect(() => {
    modalRoot.appendChild(el);
  }, []); //notice the empty array here

  //componentWillUnmount
  useEffect(() => {
    // return a function to execute at unmount
    return () => {
      modalRoot.removeChild(el);
    };
  }, []); // notice the empty array

  return ReactDOM.createPortal(props.children, el);
};

export default Modal;
