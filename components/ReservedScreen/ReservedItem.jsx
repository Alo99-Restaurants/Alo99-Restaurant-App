import { View, Text, Image } from 'react-native';
import React from 'react';
import { TouchableHighlight } from 'react-native-gesture-handler';
import {
  Entypo,
  MaterialCommunityIcons,
  FontAwesome
} from '@expo/vector-icons';

const ReservedItem = () => {
  return (
    <View className='flex-row h-40 p-4 my-1 mx-2 rounded-md bg-colorDark2'>
      <View className='flex-[1]'>
        <View className='flex-[1] justify-between pr-1'>
          <Image
            source={require('../../assets/images/restaurant1.jpeg')}
            className='w-full h-20'
          />
          <TouchableHighlight
            style={{ borderRadius: 6 }}
            underlayColor={'#fff'}>
            <View className=' bg-primary1 h-10 rounded-md flex justify-center items-center'>
              <Text className='font-roboto-black text-md text-center text-white'>
                Edit
              </Text>
            </View>
          </TouchableHighlight>
        </View>
      </View>
      <View className='flex-[1] justify-between pl-1'>
        <Text className='pb-1 font-roboto-black text-md text-left text-white'>
          Alo99 restaurant 1
        </Text>
        <View className='flex-[1] flex-row'>
          <Entypo name='calendar' size={14} color='white' />
          <Text className='pl-3 font-roboto-medium text-md text-left text-white'>
            17 Dec
          </Text>
        </View>
        <View className='flex-[1] flex-row'>
          <MaterialCommunityIcons
            name='clock-time-five-outline'
            size={14}
            color='white'
          />
          <Text className='pl-3 font-roboto-medium text-md text-left text-white'>
            18:00
          </Text>
        </View>
        <View className='flex-[1] flex-row'>
          <FontAwesome name='users' size={14} color='white' />
          <Text className='pl-3 font-roboto-medium text-md text-left text-white'>
            2
          </Text>
        </View>
        <TouchableHighlight style={{ borderRadius: 6 }} underlayColor={'#fff'}>
          <View className=' bg-primary1 h-10 rounded-md flex justify-center items-center'>
            <Text className='font-roboto-black text-md text-center text-white'>
              Cancel
            </Text>
          </View>
        </TouchableHighlight>
      </View>
    </View>
  );
};

export default ReservedItem;
