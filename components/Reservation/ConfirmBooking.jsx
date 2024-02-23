import { View, Text } from 'react-native';
import React from 'react';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { Fontisto, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import {
  createBooking
} from '../../redux/bookingSlice';
import { convertDateTime } from '../../helper';

const ConfirmBooking = ({ bookingData, restaurant }) => {
  const dispatch = useDispatch();
  const { isLoading, isAddNewBookingSuccess } = useSelector(
    (state) => state.booking
  );

  const totalGuest =
    Number(bookingData[2]?.data?.adults ?? 0) +
    Number(bookingData[2]?.data?.children ?? 0);

  const isAbleToSubmitBooking =
    bookingData[3]?.data.length > 1 && totalGuest > 0;

  const handleBooking = () => {
    const dateTime = convertDateTime(
      bookingData[1]?.data,
      bookingData[0]?.data
    );
    const payload = {
      tableIds: bookingData[3]?.data,
      bookingStatusId: 'New',
      bookingDate: dateTime,
      numberOfPeople: totalGuest
    };
    
    if (isAbleToSubmitBooking) dispatch(createBooking(payload));
  };

  if (isAddNewBookingSuccess)
    return (
      <View className='flex-[1] flex-row justify-between items-center pb-20'>
        <Text className='flex-[1] pb-1 font-roboto-black text-2xl text-center text-colorDark2'>
          Đặt bàn thành công!!
        </Text>
      </View>
    );

  return (
    <View className='flex-row h-72 px-2 pt-2 pb-6 my-1'>
      <View className='flex-[1] justify-between pl-1'>
        <Text className='pb-1 font-roboto-black text-xl text-left text-colorDark2'>
          {restaurant.name}
        </Text>
        <View className=' flex-row'>
          <Fontisto name='date' size={24} color='black' />
          <Text className='pl-3 font-roboto-medium text-lg text-left text-colorDark2'>
            {bookingData[0]?.data}
          </Text>
        </View>
        <View className=' flex-row'>
          <MaterialCommunityIcons
            name='clock-time-five-outline'
            size={23}
            color='black'
          />
          <Text className='pl-3 font-roboto-medium text-lg text-left text-colorDark2'>
            {bookingData[1]?.data}
          </Text>
        </View>
        <View className='flex-row'>
          <Ionicons name='people-sharp' size={24} color='black' />
          <Text
            className={`pl-3 font-roboto-medium text-lg text-left ${
              totalGuest > 0 ? ' text-colorDark2' : 'text-red-600 text-xl'
            }`}>
            {totalGuest} people
          </Text>
        </View>
        <View className='flex-row'>
          <MaterialCommunityIcons name='table-chair' size={24} color='black' />
          <Text
            className={`pl-3 font-roboto-medium text-lg text-left ${
              bookingData[3]?.data?.length > 0
                ? ' text-colorDark2'
                : 'text-red-600 text-xl'
            }`}>
            {bookingData[3]?.data?.length ?? 0}
            {bookingData[3]?.data?.length > 1 ? ' tables' : ' table'}
          </Text>
        </View>
        <TouchableHighlight
          disabled={!isAbleToSubmitBooking}
          onPress={handleBooking}
          style={{ borderRadius: 6, paddingTop: 10 }}
          underlayColor={'#fff'}>
          <View
            className={`${
              isAbleToSubmitBooking ? 'bg-primary1' : 'bg-gray-300'
            }  h-10 rounded-md flex justify-center items-center`}>
            <Text className='font-roboto-black text-lg text-center text-white'>
              Book
            </Text>
          </View>
        </TouchableHighlight>
      </View>
    </View>
  );
};

export default ConfirmBooking;
