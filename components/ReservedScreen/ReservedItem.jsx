import { View, Text, Image } from 'react-native';
import React from 'react';
import { TouchableHighlight } from 'react-native-gesture-handler';
import {
  Entypo,
  MaterialCommunityIcons,
  FontAwesome
} from '@expo/vector-icons';
import { convertDateString } from '../../helper';
import { router } from 'expo-router';

const ReservedItem = ({ data, restaurants, onCancelClick }) => {
  const getInfoRestaurant = (restaurantId) => {
    return restaurants.find((restaurant) => restaurant.id === restaurantId);
  };
  const restaurantInfo = getInfoRestaurant(data.restaurantId);
  const dateParsed = convertDateString(data.bookingDate);
  return (
    <View className='flex p-4 my-1 mx-2 rounded-md bg-colorDark2'>
      <View className='flex-row h-24'>
        <View className='flex-[1] pr-1'>
          <Image
            source={{ uri: restaurantInfo?.restaurantImages[0]?.url }}
            className='w-full h-24'
          />
        </View>
        <View className='flex-[1] justify-between pl-1'>
          <View className='flex-[1.5]'>
            <Text className='pb-1 font-roboto-black text-base text-left text-white'>
              {restaurantInfo.name}
            </Text>
          </View>
          <View className='flex-[1] flex-row'>
            <Entypo name='calendar' size={14} color='white' />
            <Text className='pl-3 font-roboto-medium text-md text-left text-white'>
              {dateParsed[0]}
            </Text>
          </View>
          <View className='flex-[1] flex-row'>
            <MaterialCommunityIcons
              name='clock-time-five-outline'
              size={14}
              color='white'
            />
            <Text className='pl-3 font-roboto-medium text-md text-left text-white'>
              {dateParsed[1]}
            </Text>
          </View>
          <View className='flex-[1] flex-row'>
            <FontAwesome name='users' size={14} color='white' />
            <Text className='pl-3 font-roboto-medium text-md text-left text-white'>
              {data.numberOfPeople}
            </Text>
          </View>
        </View>
      </View>
      <View className='mt-2'>
        <View className='flex-row gap-3'>
          {data.bookingStatusId === 'Confirm' && (
            <View className='flex-[1]'>
              <TouchableHighlight
                style={{ borderRadius: 6 }}
                onPress={() => router.push(`/(tabs)/reserved/${data.id}`)}>
                <View className='border border-primary1 h-10 rounded-md flex justify-center items-center'>
                  <Text className='font-roboto-black text-md text-center text-white'>
                    Edit / Order
                  </Text>
                </View>
              </TouchableHighlight>
            </View>
          )}
          {data.bookingStatusId !== 'Cancelled' && (
            <View className='flex-[1]'>
              <TouchableHighlight
                style={{ borderRadius: 6 }}
                onPress={() => onCancelClick(true)}>
                <View className='border border-primary1 h-10 rounded-md flex justify-center items-center'>
                  <Text className='font-roboto-black text-md text-center text-white'>
                    Cancel
                  </Text>
                </View>
              </TouchableHighlight>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

export default ReservedItem;
