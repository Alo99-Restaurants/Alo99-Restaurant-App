import { View, Text } from 'react-native';
import React from 'react';
import { TouchableHighlight } from 'react-native-gesture-handler';
import {
  AntDesign,
  Fontisto,
  Ionicons,
  MaterialCommunityIcons
} from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import { createBooking } from '../../redux/bookingSlice';
import { convertDateTime } from '../../helper';

const ConfirmBooking = ({ bookingData, restaurantName }) => {
  const dispatch = useDispatch();

  const totalGuest =
    Number(bookingData[2]?.data?.adults ?? 0) +
    Number(bookingData[2]?.data?.children ?? 0);

  const handleBooking = () => {
    console.log('bookingData', bookingData);
    const dateTime = convertDateTime(bookingData[1]?.data,bookingData[0]?.data);
    const payload = {
      tableIds: bookingData[3]?.data,
      bookingStatusId: 'New',
      bookingDate: dateTime,
      numberOfPeople: totalGuest
    };
        console.log('booking!!!!', payload);

    try {
      dispatch(createBooking(payload));
    } catch (error) {
      console.log('storeBranchesResponse error', error);
    }
  };
  return (
    <View className='flex-row h-72 px-2 pt-2 pb-6 my-1'>
      <View className='flex-[1] justify-between pl-1'>
        <Text className='pb-1 font-roboto-black text-xl text-left text-colorDark2'>
          {restaurantName}
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
          <Text className='pl-3 font-roboto-medium text-lg text-left text-colorDark2'>
            {totalGuest} people
          </Text>
        </View>
        <View className='flex-row'>
          <MaterialCommunityIcons name='table-chair' size={24} color='black' />
          <Text className='pl-3 font-roboto-medium text-lg text-left text-colorDark2'>
            {bookingData[3]?.data?.length ?? 0} tables
          </Text>
        </View>
        <TouchableHighlight
          onPress={handleBooking}
          style={{ borderRadius: 6, paddingTop: 10 }}
          underlayColor={'#fff'}>
          <View className='bg-primary1 h-10 rounded-md flex justify-center items-center'>
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
