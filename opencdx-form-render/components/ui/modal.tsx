import React from 'react';
import { Modal, View, Text, TouchableOpacity, useWindowDimensions, Platform  } from 'react-native';

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
  animationType?: "slide" | "none" | "fade";
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
  buttonOneColor = 'bg-white border-blue-600',
  buttonTwoColor = 'bg-blue-600 border-blue-600',
  titleColor = 'text-black',
  contentColor = 'text-gray-700',
  animationType = "fade",

}: ModalComponentProps) => {

   const { width } = useWindowDimensions();
   const isMobile = width <= 768 || Platform.OS === 'ios' || Platform.OS === 'android';


    return (
        <Modal
            visible={visible}
            transparent={true}
            onRequestClose={onClose}
            tabIndex={0}
            animationType={animationType} // Use the passed animationType prop
            accessibilityLabel='Dialog box'
        >
           <View className='flex-1 justify-center items-center' style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                  <View className='w-4/5 md:w-1/3 bg-white p-5'>
                        <Text id="modal-title" className={`text-lg font-bold ${titleColor}`}>{title}</Text>
                        <Text id="modal-description" className={`my-4 ${contentColor}`}>{content}</Text>
                      <View className={`${isMobile ? 'w-full p-3 flex-col items-center' :  'flex-row justify-end mt-5'}`}>
                        <TouchableOpacity 
                            onPress={onButtonTwoPress} 
                            className= {`${buttonTwoColor} rounded-lg px-4 py-3 ${isMobile ? 'mb-4 w-full' :  'mr-3 w-[35%]'}`}>
                            <Text className='text-white text-center'>{buttonTwoText}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            onPress={onButtonOnePress} 
                            className= {`${buttonOneColor} border rounded-lg px-4 py-3 ${isMobile ? 'w-full' :  'w-[35%]'}`}>
                            <Text className='text-blue-600 text-center'>{buttonOneText}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
});

export default ModalComponent;
