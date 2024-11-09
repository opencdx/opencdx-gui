import React from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from '@nextui-org/react';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmLabel = 'Continue',
  cancelLabel = 'Cancel',
}) => {
  return (
    <Modal isOpen={isOpen} placement="center" hideCloseButton={true} radius="none">
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
        <ModalBody>
          <p>{message}</p>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" variant="bordered" onPress={onClose} aria-label={cancelLabel} tabIndex={0} size="lg">
            {cancelLabel}
          </Button>
          <Button
            color="danger"
            aria-label={confirmLabel}
            tabIndex={0}
            size="lg"
            onPress={() => {
              onConfirm();
              onClose();
            }}
          >
            {confirmLabel}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ConfirmationModal;
