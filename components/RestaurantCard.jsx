import React from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import Animated, { FadeInRight, FadeOutLeft } from 'react-native-reanimated';
import { FontAwesome } from '@expo/vector-icons';
import Color from '../constants/Color';

const RestaurantCard = ({ restaurant }) => {
  return (
    <Animated.View
      className=' w-[300px] my-1 bg-colorDark2 rounded-lg'
      entering={FadeInRight}
      exiting={FadeOutLeft}>
      <Image
        className='rounded-t-lg w-full h-20'
        source={{
          uri: restaurant?.restaurantImages[0]?.url ?? ''
        }}
      />
      <View className='p-2'>
        <View className='flex flex-row justify-between items-center py-2'>
          <Text className='font-roboto-medium text-lg text-center text-white '>
            {restaurant.name}
          </Text>
          <View className='flex flex-row justify-between items-center'>
            <FontAwesome name='star' size={20} color={Color.primary} />
            <Text className='font-roboto-regular text-xs text-center text-white ml-2'>
              4.8 (123)
            </Text>
          </View>
        </View>
        <Text
          className='mb-3 text-xs font-normal text-primary2'
          numberOfLines={4}>
          {restaurant.address}
        </Text>
      </View>
    </Animated.View>
  );
};

export default RestaurantCard;
