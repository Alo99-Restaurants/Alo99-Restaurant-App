import { View, Text, Dimensions } from 'react-native';
import React, { useState } from 'react';
import {
  AntDesign,
  Fontisto,
  Ionicons,
  MaterialCommunityIcons
} from '@expo/vector-icons';
import ReservationStep from './ReservationStep';
import CalendarScreen from './Calendar';
import TableBooking from './TableBooking';
import { TouchableHighlight } from 'react-native-gesture-handler';

const menuStep = [
  {
    icon: <Fontisto name='date' size={24} color='white' />,
    label: 'Day'
  },
  {
    icon: <AntDesign name='clockcircleo' size={24} color='white' />,
    label: 'Time'
  },
  {
    icon: <Ionicons name='people-sharp' size={24} color='white' />,
    label: 'Guests'
  },
  {
    icon: <MaterialCommunityIcons name='table-chair' size={24} color='white' />,
    label: 'Table'
  }
];

const Reservation = ({ data }) => {
  console.log('data', data.restaurantFloors);
  const [bookingStep, setBookingStep] = useState('Day');

  const renderMenu = () => {
    switch (bookingStep) {
      case 'Day':
        return <CalendarScreen />;
      case 1:
        return null;
      case 2:
        return null;
      case 'Table':
        return <TableBooking restaurantFloors={data?.restaurantFloors} />;
      default:
        return null;
    }
  };

  return (
    <View className='flex-[1]'>
      <View className='flex-[1.5] reservation-step flex flex-row justify-around mt-4'>
        {menuStep.map((menu, index) => (
          <ReservationStep
            isActive={bookingStep === menu.label}
            key={index}
            classNameLabel={'mt-1'}
            icon={menu.icon}
            label={menu.label}
            onPress={setBookingStep}
          />
        ))}
      </View>
      <View className='flex-[8.5] reservation-detail px-2 mt-2'>
        {renderMenu()}
      </View>
      <View className='absolute px-2 bottom-5 left-0 w-full'>
        <TouchableHighlight style={{ borderRadius: 6 }} underlayColor={'#fff'}>
          <View className=' bg-primary1 h-10 rounded-md flex justify-center items-center'>
            <Text className=' font-roboto-black text-md text-center text-white'>
              Book Table
            </Text>
          </View>
        </TouchableHighlight>
      </View>
    </View>
  );
};

export default Reservation;
