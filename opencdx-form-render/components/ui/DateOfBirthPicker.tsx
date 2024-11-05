import React, { useState } from 'react';
import { View, Text, Button, Modal, Platform } from 'react-native';
import DateTimePicker, { DateType } from 'react-native-ui-datepicker';
interface DateOfBirthPickerProps {
    initialDate: Date;
    onDateChange: (date: Date) => void;
  }
const DateOfBirthPicker: React.FC<DateOfBirthPickerProps> = ({ initialDate, onDateChange }) => {
  const [modalVisible, setModalVisible] = useState(true);
  const [selectedDate, setSelectedDate] = useState(initialDate);

  const handleConfirm = (date: Date) => {
    setSelectedDate(date);
    onDateChange(date);
    setModalVisible(false);
  };
  return ( modalVisible &&
    <Modal
    animationType="slide"
    transparent={true}
    visible={modalVisible}
    onRequestClose={() => setModalVisible(!modalVisible)}
  >
    <View className={"flex-1 justify-center items-center bg-[#00000050]"}>
      <View className={"w-100 h-100 bg-white rounded-lg p-4"}>
        <DateTimePicker
          mode="single"
          date={selectedDate}
          onChange={(params) => handleConfirm(params.date)}
        />
      </View>
    </View>
  </Modal>
  );
};

export default DateOfBirthPicker;
