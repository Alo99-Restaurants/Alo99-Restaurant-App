import React, { useState } from 'react';
import { Alert, Modal, Pressable, Text, View } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
const ModalComponent = ({ isOpen = false, onClose, storeBranches }) => {
  const [selectedStore, setSelectedStore] = useState(null);

  return (
    <Modal
      animationType='slide'
      transparent={true}
      visible={isOpen}
      onRequestClose={onClose}>
      <View className='flex-[1] justify-center items-center '>
        <View className='w-full m-5 bg-white rounded-20 p-8 items-center shadow-md rounded-xl'>
          <RNPickerSelect
            onValueChange={(value) => console.log(value)}
            items={[
              { label: 'Football', value: 'football' },
              { label: 'Baseball', value: 'baseball' },
              { label: 'Hockey', value: 'hockey' }
            ]}
          />
          <Pressable className='bg-blue-500 rounded-20 p-2' onPress={onClose}>
            <Text className='text-white font-bold text-center'>Hide Modal</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

export default ModalComponent;

