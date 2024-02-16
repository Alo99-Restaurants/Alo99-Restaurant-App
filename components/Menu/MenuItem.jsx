import { View, Text, Image } from 'react-native';
import React from 'react';
import { TouchableHighlight } from 'react-native-gesture-handler';
import {
  FontAwesome5,
  MaterialCommunityIcons,
  MaterialIcons
} from '@expo/vector-icons';

const convertPrice = (price) => {
  if (price >= 1000000) {
    return `${price / 1000000}M`;
  } else if (price >= 1000) {
    return `${price / 1000}K`;
  } else {
    return price;
  }
};

const MenuItem = ({ data, categories }) => {
  return (
    <View className='flex-row h-20 my-1 mx-2 rounded-md bg-colorDark2'>
      <View className='flex-[1]'>
        <View className='flex-[1] justify-between pr-2 rounded-md'>
          <Image
            source={{ uri: data.menuUrl }}
            className='w-full h-20 rounded-l-md'
          />
        </View>
      </View>
      <View className='flex-[1.5] flex items-start p-2'>
        <Text className='flex-[1] font-roboto-black text-base text-left text-white'>
          {data.name}
        </Text>
        <View className='flex-[1] flex-row'>
          <MaterialIcons name='category' size={14} color='white' />
          <Text className='pl-3 font-roboto-medium text-md text-left text-white'>
            {
              categories.find(
                (category) => category.id === data.menuCategoryId
              )?.name
            }
          </Text>
        </View>
      </View>
      <View className='flex-[0.8] flex-row justify-center items-center'>
        <Text className='pl-3 font-roboto-medium text-base text-left text-white'>
          {convertPrice(data.price)}
        </Text>
      </View>
    </View>
  );
};

export default MenuItem;
