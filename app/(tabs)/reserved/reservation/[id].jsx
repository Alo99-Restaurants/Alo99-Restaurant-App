import { useLocalSearchParams } from 'expo-router';
import React, { useMemo } from 'react';
import { Text, View } from 'react-native';
import Reservation from '../../../../components/Reservation';
import { useSelector } from 'react-redux';
import { formatTime } from '../../../../helper';

const ReservationPage = () => {
  const { id } = useLocalSearchParams();
  const { storeBranches } = useSelector((state) => state.storeBranches);
  const activeStoreBranch = useMemo(
    () => storeBranches.find((store) => store.id === id),
    [id]
  );

  // Format time for title
  const formattedOpenHours = formatTime(activeStoreBranch.openHours);
  const formattedCloseHours = formatTime(activeStoreBranch.closeHours);

  return (
    <View className='flex-[1] bg-colorDark1'>
      <Text className='font-roboto-medium text-lg text-left text-white px-2'>
        {activeStoreBranch.name}
        <Text className='font-roboto-medium text-sm'>{`(open ${formattedOpenHours} - close ${formattedCloseHours})`}</Text>
      </Text>
      <View className='flex-[1]'>
        <Reservation
          restaurant={activeStoreBranch}
          data={activeStoreBranch}
        />
      </View>
    </View>
  );
};

export default ReservationPage;
