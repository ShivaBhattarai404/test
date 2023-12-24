import { Fragment, useRef } from "react";
import { createPortal } from "react-dom";
import { Form } from "react-router-dom";

import classes from "./Modal.module.css";
import Button from "../Button/Button";

const Backdrop = (props) => {
  return (
    <div
      className={`${classes.backdrop} ${props.className}`}
      onClick={props.onClick}
      style={{ ...props.style }}
    />
  );
};

const ModalBox = (props) => {
  const formRef = useRef();
  const okClickHandler = () => {
    props.submitable && formRef.current.requestSubmit();
    props.onConfirm?.();
  };
  return (
    <div className={classes.modal}>
      <div className={classes.modal__title}>{props.title}</div>
      {props.submitable === "true" ? (
        <Form ref={formRef} className={classes.modal__content} method="POST">
          {props.content}
        </Form>
      ) : (
        <div className={classes.modal__content}>{props.content}</div>
      )}
      <div className={classes.modal__btnWrapper}>
        <Button
          className={classes.cancelBtn}
          onClick={props.onCancel}
          style={{
            backgroundColor: props.cancelColor,
            borderColor: props.cancelColor,
          }}
        >
          {props.cancelText}
        </Button>
        <Button
          className={classes.okBtn}
          style={{
            backgroundColor: props.confirmColor,
            borderColor: props.confirmColor,
          }}
          onClick={okClickHandler}
        >
          {props.confirmText}
        </Button>
      </div>
    </div>
  );
};

const Modal = (props) => {
  return (
    <Fragment>
      {createPortal(
        <ModalBox
          title={props.title || "Modal"}
          onConfirm={props.onConfirm}
          confirmText={props.confirmText || "Okay"}
          confirmColor={props.confirmColor || "blue"}
          onCancel={props.onCancel}
          cancelText={props.cancelText || "Cancel"}
          cancelColor={props.cancelColor || "#323232"}
          content={props.children}
          submitable={props.submitable || false}
        />,
        document.getElementById("modal-root")
      )}
      {createPortal(
        <Backdrop onClick={props.onCancel} />,
        document.getElementById("backdrop-root")
      )}
    </Fragment>
  );
};

export default Modal;
