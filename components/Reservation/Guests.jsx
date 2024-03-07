import { View, Text, TouchableOpacity } from 'react-native';
import React, { useState } from 'react'

const GuestCounter = ({ type, count, adjustGuests }) => (
  <View className='pb-4'>
    <Text className='font-roboto-bold text-lg text-white pb-3'>
      {type.charAt(0).toUpperCase() + type.slice(1)}
    </Text>
    <View className='flex flex-row justify-center items-center'>
      <TouchableOpacity
        className='bg-colorDark2 rounded-2xl'
        onPress={() => adjustGuests(type, -1)}>
        <Text className='font-roboto-bold text-2xl text-white px-4'>-</Text>
      </TouchableOpacity>
      <Text className='font-roboto-bold text-lg text-white px-4'>
        {count}
      </Text>
      <TouchableOpacity
        className='bg-colorDark2 rounded-2xl'
        onPress={() => adjustGuests(type, 1)}>
        <Text className='font-roboto-bold text-2xl text-white px-4'>+</Text>
      </TouchableOpacity>
    </View>
  </View>
);

const Guests = ({ guests, onChange }) => {
  const adjustGuests = (type, delta) => {
    onChange((prevGuests) => ({
      ...prevGuests,
      [type]: Math.max(0, prevGuests[type] + delta)
    }));
  };

  return (
    <View className='px-2'>
      <GuestCounter
        type='adults'
        count={guests.adults}
        adjustGuests={adjustGuests}
      />
      <GuestCounter
        type='children'
        count={guests.children}
        adjustGuests={adjustGuests}
      />
    </View>
  );
};

export default Guests
