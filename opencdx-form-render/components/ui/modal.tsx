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
  variant?: string;
}

const ModalComponent = React.memo(({
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
 variant = 'outline',
}: ModalComponentProps) => {


  if (visible) {
    return (
      <>
        <Modal
          isOpen={visible}
          onClose={() => {
            onClose();
          }}
          className="w-[10px]"
        >            <ModalBackdrop />

          <ModalContent style={{ backgroundColor }}>
            <ModalHeader>
              <Text className={`text-lg font-bold ${titleColor}`}>{title}</Text>
            </ModalHeader>
            <ModalBody>
              <Text className={contentColor}>{content}</Text>
            </ModalBody>
            <ModalFooter>
              <View className='flex flex-row justify-end space-x-2 gap-2'>
              <Button
                onPress={() => {
                  onButtonOnePress();
                }}
                
                className={`w-full p-2 px-4 py-2 rounded ${buttonOneColor}`}
                variant={'outline'}
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
              </View>
            </ModalFooter>
          </ModalContent>
        </Modal>
        
      </>
    );
  }

  return null;
});

export default ModalComponent;