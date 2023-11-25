import { View, Text, Image } from 'react-native';
import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';

const FoodCategory = ({ classStyle, label, img }) => {
  return (
    <TouchableOpacity onPress={() => console.log('press FoodCategory')}>
      <View
        className={`w-20 h-20 justify-center items-center py-1 px-3 my-1 bg-colorDark2 rounded-2xl ${classStyle}`}>
        <Image source={img} className='w-11 h-11' />
        <Text className='font-roboto-regular text-xs pt-1 text-primary2'>
          {label}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default FoodCategory;
