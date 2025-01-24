// src/components/CustomModal.tsx
import React from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from 'ui-library';
import { toast } from 'react-toastify';

interface CustomModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  body: React.ReactNode;
  onConfirm: () => void;
  confirmText: string;
  cancelText: string;
  toastMessage: string;
  length?: number;
}

const CustomModal: React.FC<CustomModalProps> = ({
  isOpen,
  onClose,
  title,
  body,
  onConfirm,
  confirmText,
  cancelText,
  toastMessage,
  length
}) => {
  const handleConfirm = () => {
    onConfirm();
    setTimeout(() => {
      toast.success(toastMessage);
    }, 0);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onClose} hideCloseButton radius="none">
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalBody>{body}</ModalBody>
        <ModalFooter>
          <Button color="primary" variant="bordered" onPress={onClose}>
            {cancelText}
          </Button>
          <Button color={(length || 0) > 0 ? 'primary' : 'default'} onPress={handleConfirm}>
            {confirmText}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CustomModal;