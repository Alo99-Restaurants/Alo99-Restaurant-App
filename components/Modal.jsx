import React, { useState } from 'react';
import { Alert, Modal, Pressable, Text, View } from 'react-native';

const ModalComponent = ({isOpen = false, onClose}) => {
  return (
    <Modal
      animationType='slide'
      transparent={true}
      visible={isOpen}
      onRequestClose={onClose}>
      <View className='flex-[1] justify-center items-center'>
        <View className='m-5 bg-white rounded-20 p-8 items-center shadow-md'>
          <Text className='text-center mb-3'>Hello World!</Text>
          <Pressable className='bg-blue-500 rounded-20 p-2' onPress={onClose}>
            <Text className='text-white font-bold text-center'>Hide Modal</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

export default ModalComponent;
