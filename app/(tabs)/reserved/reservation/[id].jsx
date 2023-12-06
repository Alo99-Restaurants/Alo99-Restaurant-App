import { View, Text, Button } from 'react-native';
import React from 'react';
import { Link, router, useLocalSearchParams } from 'expo-router';

const Reservation = () => {
  const { id } = useLocalSearchParams();
  return (
    <View className='flex-[1]'>
      <Text>Reservation {id}</Text>
    </View>
  );
};

export default Reservation;
