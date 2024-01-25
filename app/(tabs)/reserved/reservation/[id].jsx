import { useLocalSearchParams } from 'expo-router';
import React, { useMemo } from 'react';
import { Text, View } from 'react-native';
import Reservation from '../../../../components/Reservation';
import { useSelector } from 'react-redux';

const ReservationPage = () => {
  const { id } = useLocalSearchParams();
  const { storeBranches } = useSelector((state) => state.storeBranches);
  const activeStoreBranch = useMemo(
    () => storeBranches.find((store) => store.id === id),
    [id]
  );
  return (
    <View className='flex-[1] bg-colorDark1'>
      <Text className='font-roboto-medium text-lg text-left text-white px-2'>
        {activeStoreBranch.name}
      </Text>
      <View className='flex-[1]'>
        <Reservation data={activeStoreBranch} />
      </View>
    </View>
  );
};

export default ReservationPage;
