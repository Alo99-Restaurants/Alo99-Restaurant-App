import React from 'react';
import { Modal, View } from 'react-native';
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler';

const ModalComponent = ({ isOpen = false, onClose, children }) => {
  return (
    <Modal
      animationType='slide'
      transparent={true}
      visible={isOpen}
      onRequestClose={onClose}>
      <TouchableOpacity
        className={'w-full h-full'}
        activeOpacity={1}
        onPressOut={onClose}>
        <View className='h-[600px] absolute bottom-0 w-full bg-white rounded-2xl shadow-md'>
          <TouchableWithoutFeedback>
            <View className='w-full h-full rounded-2xl py-2 px-4'>
              <View className='flex items-center mb-4'>
                <View className='w-20 h-1 bg-gray-400 rounded-2xl' />
              </View>
              {children}
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

export default ModalComponent;

