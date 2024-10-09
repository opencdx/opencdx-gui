import React from 'react';
import { View, ActivityIndicator, Modal } from 'react-native';


interface LoaderProps {
  isVisible: boolean;
}

const Loading: React.FC<LoaderProps> = ({ isVisible }) => {
  return (
    <Modal
      transparent={true}
      visible={isVisible}
      animationType="fade"
      onRequestClose={() => {}}
    >
      <View className="flex-1 justify-center items-center bg-black/50">
        <View className="bg-white/90 p-5 rounded-lg items-center">
          <ActivityIndicator size="large" color="#006FEE" />
        </View>
      </View>
    </Modal>
  );
};

export default Loading;
