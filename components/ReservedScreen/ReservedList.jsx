import { View, Text } from 'react-native'
import React from 'react'
import ReservedItem from './ReservedItem';

const ReservedList = () => {
  return (
    <View className='flex-[1] bg-colorDark1'>
      <ReservedItem />
      <ReservedItem />
      <ReservedItem />
    </View>
  );
}

export default ReservedList