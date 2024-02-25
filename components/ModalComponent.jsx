import React from 'react';
import { Keyboard, KeyboardAvoidingView, Modal, Pressable, Text, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import Color from '../constants/Color';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { LogBox } from 'react-native';

// Hide warning notifications on front-end
LogBox.ignoreLogs([
  /Warning: */
]);

const ModalComponent = ({ isOpen = false, onClose, children, height }) => {
  return (
    <Modal
      animationType='slide'
      transparent={true}
      visible={isOpen}
      onRequestClose={onClose}>
      <KeyboardAvoidingView
        style={{ height }}
        className='absolute bottom-0 w-full bg-white rounded-2xl shadow-md'
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View className='w-full h-full rounded-2xl py-2 px-4'>
          <View className='flex items-end mb-2'>
            <Pressable onPress={onClose}>
              <View className='flex justify-center items-center w-8 h-8 bg-gray-200 rounded-3xl'>
                <FontAwesome name='close' size={24} color={Color.colorDark2} />
              </View>
            </Pressable>
          </View>
          <TouchableWithoutFeedback
            onPress={Keyboard.dismiss}
            accessible={false}>
            {children}
          </TouchableWithoutFeedback>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default ModalComponent;


