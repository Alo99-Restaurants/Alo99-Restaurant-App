import { View, Text, Image, TouchableHighlight } from 'react-native';
import React from 'react';
import {
  Entypo,
  MaterialCommunityIcons,
  FontAwesome,
  Ionicons,
  MaterialIcons
} from '@expo/vector-icons';
import { convertDateString } from '../../helper';
import { router } from 'expo-router';
import Color from '../../constants/Color';

const ReservedItem = ({
  data,
  restaurants,
  onCancelClick,
  isHistoryStatus
}) => {
  const getInfoRestaurant = (restaurantId) => {
    return restaurants.find((restaurant) => restaurant.id === restaurantId);
  };
  const restaurantInfo = getInfoRestaurant(data.restaurantId);
  const dateParsed = convertDateString(data.bookingDate);
  const styleInfoItem = `pl-3 font-roboto-medium text-md text-left ${
    data?.bookingStatusId !== 'New' ? 'text-white' : 'text-[#6c6c6c]'
  }`;

  const renderBookingStatus = () => {
    switch (data?.bookingStatusId) {
      case 'New':
        return (
          <View className='flex-[1] flex-row'>
            <MaterialCommunityIcons name='timer-sand' size={14} color='white' />
            <Text className='pl-3 font-roboto-medium text-md text-left text-white'>
              Pending...
            </Text>
          </View>
        );
      case 'Confirm':
        return (
          <View className='flex-[1] flex-row'>
            <Ionicons name='checkmark-circle' size={14} color='white' />
            <Text className='pl-3 font-roboto-medium text-md text-left text-white'>
              Confirmed
            </Text>
          </View>
        );
      case 'Using':
        return (
          <View className='flex-[1] flex-row'>
            <MaterialCommunityIcons
              name='account-check'
              size={14}
              color='white'
            />
            <Text className='pl-3 font-roboto-medium text-md text-left text-white'>
              Using
            </Text>
          </View>
        );
      case 'Completed':
        return (
          <View className='flex-[1] flex-row'>
            <FontAwesome name='money' size={14} color='white' />
            <Text className='pl-3 font-roboto-medium text-md text-left text-white'>
              Paid
            </Text>
          </View>
        );
      case 'Cancelled':
        return (
          <View className='flex-[1] flex-row'>
            <MaterialIcons name='cancel' size={14} color='white' />
            <Text className='pl-3 font-roboto-medium text-md text-left text-white'>
              Cancelled
            </Text>
          </View>
        );
      default:
        break;
    }
  };

  return (
    <View className='flex p-4 my-1 mx-2 rounded-md bg-colorDark2'>
      <TouchableHighlight
        underlayColor={Color.colorDark2}
        style={{ borderRadius: 6 }}
        onPress={() => router.push(`/(tabs)/reserved/${data.id}`)}>
        <View className='flex-row h-28'>
          <View className='flex-[1] pr-1'>
            <Image
              source={{ uri: restaurantInfo?.restaurantImages[0]?.url }}
              className='w-full h-28'
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
              <Text className={styleInfoItem}>{dateParsed[0]}</Text>
            </View>
            <View className='flex-[1] flex-row'>
              <MaterialCommunityIcons
                name='clock-time-five-outline'
                size={14}
                color='white'
              />
              <Text className={styleInfoItem}>{dateParsed[1]}</Text>
            </View>
            <View className='flex-[1] flex-row'>
              <FontAwesome name='users' size={14} color='white' />
              <Text className={styleInfoItem}>{data.numberOfPeople}</Text>
            </View>
            {renderBookingStatus()}
          </View>
        </View>
      </TouchableHighlight>

      {/* Action Button */}
      {!isHistoryStatus &&
        (data.bookingStatusId === 'Confirm' ||
          data.bookingStatusId === 'New' ||
          data.bookingStatusId === 'Using') && (
          <View className='mt-2'>
            <View className='flex-row gap-3'>
                <View className='flex-[1]'>
                  <TouchableHighlight
                    style={{ borderRadius: 6 }}
                    onPress={() =>
                      router.push(`/(tabs)/reserved/${data.id}?pay=true`)
                    }>
                    <View className='border border-primary1 h-10 rounded-md flex justify-center items-center'>
                      <Text className='font-roboto-black text-md text-center text-white'>
                        {data.bookingStatusId !== 'Using' ? 'Order' : 'Pay'}
                      </Text>
                    </View>
                  </TouchableHighlight>
                </View>
              {data.bookingStatusId !== 'Cancelled' &&
                data.bookingStatusId !== 'Using' && (
                  <View className='flex-[1]'>
                    <TouchableHighlight
                      style={{ borderRadius: 6 }}
                      onPress={() => onCancelClick(data.id)}>
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
        )}
    </View>
  );
};

export default ReservedItem;
