import React, { useState } from 'react';
import { View, Text, Modal, Pressable } from 'react-native';
import DateTimePicker, { DateType } from 'react-native-ui-datepicker';
import { Button } from '~/components/ui/button';
interface DateOfBirthPickerProps {
    initialDate: Date;
    onDateChange: (date: Date) => void;
    onCancel: () => void | null;
  }
const DateOfBirthPicker: React.FC<DateOfBirthPickerProps> = ({ initialDate, onDateChange, onCancel}) => {
  const [modalVisible, setModalVisible] = useState(true);
  const [selectedDate, setSelectedDate] = useState(initialDate);

  const handleConfirm = (date: Date) => {
    onDateChange(selectedDate);
    setModalVisible(false);
  };
  return ( modalVisible &&
    <Modal
    animationType="fade"
    transparent={true}
    visible={modalVisible}
    onRequestClose={() => setModalVisible(!modalVisible)}
  >
    <View className={"flex-1 justify-center items-center bg-[#00000050]"}>
      <View className={"w-100 h-100 bg-white rounded-lg p-4"}>
        <DateTimePicker
          mode="single"
          date={selectedDate}
          onChange={(params) => setSelectedDate(params.date)}
        />
        <View className='flex flex-row justify-center'>
          
            <Pressable
              className={`w-[49%] p-3 mr-4 rounded-md bg-blue-600`}
              onPress={() => {
                onCancel();
              }}
              
              role="button"
            >
              <Text className={`text-white text-center`}>
                Cancel
              </Text>
            </Pressable>
            <Pressable
              className={`w-[49%] p-3 rounded-md bg-blue-600`}
              onPress={() => handleConfirm(selectedDate)}
              
              role="button"
            >
              <Text className={`text-white text-center`}>
                Submit
              </Text>
            </Pressable>
        </View>
      </View>
    </View>
  </Modal>
  );
};

export default DateOfBirthPicker;
