import React from 'react';
import { Modal, Pressable, Text, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import Color from '../constants/Color';

const ModalComponent = ({ isOpen = false, onClose, children, height = 600 }) => {
  return (
    <Modal
      animationType='slide'
      transparent={true}
      visible={isOpen}
      onRequestClose={onClose}>
      <View
        style={{ height }}
        className='absolute bottom-0 w-full bg-white rounded-2xl shadow-md'>
        <View className='w-full h-full rounded-2xl py-2 px-4'>
          <View className='flex items-end mb-2'>
            <Pressable onPress={onClose}>
              <View className='flex justify-center items-center w-8 h-8 bg-gray-200 rounded-3xl'>
                <FontAwesome name='close' size={24} color={Color.colorDark2} />
              </View>
            </Pressable>
          </View>
          {children}
        </View>
      </View>
    </Modal>
  );
};

export default ModalComponent;

