import { View, Text, Image, Pressable } from 'react-native';
import React from 'react';
import { convertPrice } from '../../helper';
import { TouchableOpacity } from 'react-native-gesture-handler';


const FoodItem = ({ data, onClickImg }) => {
  const AmountCounter = ({ count, adjustAmount }) => (
    <View>
      <View className='flex flex-row justify-center items-center'>
        <TouchableOpacity
          className='bg-colorDark2 rounded-2xl'
          onPress={() => adjustAmount(data.id, -1)}>
          <Text className='font-roboto-bold text-2xl text-white px-3'>-</Text>
        </TouchableOpacity>
        <Text className='font-roboto-bold text-lg text-white px-2'>
          {count}
        </Text>
        <TouchableOpacity
          className='bg-colorDark2 rounded-2xl'
          onPress={() => adjustAmount(data.id, 1)}>
          <Text className='font-roboto-bold text-2xl text-white px-3'>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const adjustAmount = (id , amount) => {
    console.log(id, amount);
  };

  return (
    <View className='flex-row h-20 my-1 mx-2 rounded-md bg-colorDark2'>
      <View className='flex-[1]'>
        <Pressable onPress={onClickImg}>
          <View className='flex-[1] justify-between pr-2 rounded-md'>
            <Image
              source={{ uri: data.menuUrl }}
              className='w-full h-20 rounded-l-md'
            />
          </View>
        </Pressable>
      </View>
      <View className='flex-[1.5] flex items-start justify-center p-2'>
        <Text className='flex-[1] font-roboto-black text-base text-left text-white'>
          {data.name}
        </Text>
        <Text className='flex-[1] font-roboto-medium text-base text-left text-white'>
          {convertPrice(data.price)}
        </Text>
      </View>
      <View className='flex-[1] flex-row justify-center items-center'>
        <AmountCounter count={0} adjustAmount={adjustAmount} />
      </View>
    </View>
  );
};

export default FoodItem;