// AlertView.js
import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { Image, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, ModalBackdrop, ButtonText, ModalCloseButton } from '@gluestack-ui/themed';

const AlertView = ({
  visible,
  onClose,
  title,
  content,
  buttonOneText,
  buttonTwoText,
  onButtonOnePress,
  onButtonTwoPress,
}) => {
  return (
    <Modal
      isOpen={visible}
      onClose={onClose}
    >
      <ModalBackdrop />
      <ModalContent>
        <ModalHeader>
          <Text style={styles.title}>{title}</Text>
        </ModalHeader>
        <ModalBody>
          <Text>{content}</Text>
        </ModalBody>
        <ModalFooter>
          {buttonOneText && (
            <Button
              variant="outline"
              size="sm"
              onPress={onButtonOnePress}
              style={styles.button}
            >
              <ButtonText>{buttonOneText}</ButtonText>
            </Button>
          )}
          {buttonTwoText && (
            <Button
              size="sm"
              onPress={onButtonTwoPress}
              style={[styles.button, styles.buttonPrimary]}
            >
            <ButtonText>{buttonTwoText}</ButtonText>
            </Button>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  button: {
    marginHorizontal: 5,
  },
  buttonPrimary: {
    backgroundColor: '#007BFF',
    borderColor: '#007BFF',
  },
});

export default AlertView;
