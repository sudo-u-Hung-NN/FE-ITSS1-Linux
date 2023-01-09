import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import { setShowFalse, setShowTrue } from "../../../Redux/isShow.slice";
import FormLoginModal from "./FormLoginModal";
import "./modalLogin.scss";
export default function ModalLogin({ handleClick }) {
  const isUser = useSelector((state) => state.auth.login.currentUser);
  // const isUser = localStorage.getItem('access_token');
  const isShow = useSelector((state) => state.isShow.show);
  const dispatch = useDispatch();
  const handleClose = () => dispatch(setShowFalse());

  const handleClickButton = () => {
    if (isUser === null) {
      dispatch(setShowTrue());
    } else {
      handleClick();
    }
  };

  return (
    <>
      <Button
        className="vote-button"
        variant="primary"
        onClick={handleClickButton}
      >
        Bình chọn
      </Button>

      <Modal show={isShow} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Bạn phải đăng nhập</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormLoginModal hide={handleClose} />
        </Modal.Body>
      </Modal>
    </>
  );
}
