import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { CancelButton } from "../styles";

const ConfirmationModal = ({
  isOpen,
  toggle,
  heading,
  message,
  confirmText = "Yes",
  cancelText = "No",
  onConfirm,
}) => {
  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader>{heading}</ModalHeader>
      <ModalBody className="d-flex align-items-center column-gap-3">
        {message}
      </ModalBody>
      <ModalFooter>
        <Button
          color="primary"
          className="rounded-1 px-3"
          style={{
            paddingBlock: "2px",
          }}
          onClick={() => {
            onConfirm();
            toggle();
          }}
        >
          {confirmText}
        </Button>
        <CancelButton className="px-3" onClick={toggle}>
          {cancelText}
        </CancelButton>
      </ModalFooter>
    </Modal>
  );
};

export default ConfirmationModal;
