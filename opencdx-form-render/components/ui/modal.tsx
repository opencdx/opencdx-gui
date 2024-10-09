import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, ModalBackdrop, ButtonText, Button } from '@gluestack-ui/themed';

interface ModalComponentProps {
  visible: boolean;
  onClose: () => void;
  title: string;
  content: string;
  buttonOneText: string;
  buttonTwoText: string;
  onButtonOnePress: () => void;
  onButtonTwoPress: () => void;
  // New props for styling
  backgroundColor?: string;
  buttonOneColor?: string;
  buttonTwoColor?: string;
  titleColor?: string;
  contentColor?: string;
}

const ModalComponent = ({
  visible,
  onClose,
  title,
  content,
  buttonOneText,
  buttonTwoText,
  onButtonOnePress,
  onButtonTwoPress,
  // Default values for new styling props
  backgroundColor = 'white',
  buttonOneColor = 'bg-white border-blue-500',
  buttonTwoColor = 'bg-blue-500 border-blue-500',
  titleColor = 'text-black',
  contentColor = 'text-gray-700',
}: ModalComponentProps) => {


  if (visible) {
    return (
      <>
        <Modal
          isOpen={visible}
          onClose={() => {
            onClose();
          }}
          className="w-full"
        >
          <ModalContent style={{ backgroundColor }}>
            <ModalHeader>
              <Text className={`text-lg font-bold ${titleColor}`}>{title}</Text>
            </ModalHeader>
            <ModalBody>
              <Text className={contentColor}>{content}</Text>
            </ModalBody>
            <ModalFooter className='flex flex-row justify-end space-x-2'>
              <Button
                onPress={() => {
                  onButtonOnePress();
                }}
                className={`w-full p-2 px-4 py-2 rounded ${buttonOneColor}`}
                //variant="outline"
              >
                <ButtonText className="text-sm font-medium">{buttonOneText}</ButtonText>
              </Button>
              <Button
                onPress={() => {
                  onButtonTwoPress();
                }}
                className={`w-full p-2 px-4 py-2 rounded ${buttonTwoColor}`}
              >
                <ButtonText className="text-sm font-medium text-white ">{buttonTwoText}</ButtonText>
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
        {/* Fallback render */}
        <View className='absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center'>
          <View className='bg-white rounded-lg w-[90%] max-w-[400px] p-6'>
            <Text className='text-xl font-semibold text-blue-600 mb-4'>{title}</Text>
            <Text className='text-gray-700 mb-6'>{content}</Text>
            <View className='flex-row justify-end space-x-4'>
              {buttonOneText && (
                <Button onPress={onButtonOnePress} className={buttonOneColor}>
                  <ButtonText>{buttonOneText}</ButtonText>
                </Button>
              )}
              {buttonTwoText && (
                <Button onPress={onButtonTwoPress} className={buttonTwoColor}>
                  <ButtonText>{buttonTwoText}</ButtonText>
                </Button>
              )}
            </View>
          </View>
        </View>
      </>
    );
  }

  return null;
};

export default ModalComponent;