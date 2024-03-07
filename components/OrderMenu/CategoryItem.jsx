import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';

const CategoryItem = ({ classStyle, label, img, uri, id, onChange }) => {
  const handlePushRouter = () => {
    onChange(id);
  };
  return (
    <TouchableOpacity onPress={handlePushRouter}>
      <View
        className={`w-20 h-20 justify-center items-center py-1 px-3 my-1 bg-colorDark2 rounded-2xl ${classStyle}`}>
        <Image source={uri ? { uri: uri } : img} className='w-11 h-11' />
        <Text className='font-roboto-regular text-xs pt-1 text-primary2'>
          {label}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default CategoryItem;
