import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';
import Reservation from '../../../../components/Reservation';

const ReservationPage = () => {
  const { id } = useLocalSearchParams();
  return (
    <View className='flex-[1] bg-colorDark1'>
      <Text className='font-roboto-medium text-lg text-left text-white px-2'>
        Alo99 Restaurant {id}
      </Text>
      <View className='flex-[1]'>
        <Reservation />
      </View>
    </View>
  );
};

export default ReservationPage;
