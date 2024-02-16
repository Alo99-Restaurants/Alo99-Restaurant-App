import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams } from 'expo-router';
import Menu from '../../../../components/Menu';

const MenuInfo = () => {
  const { id } = useLocalSearchParams();
  return (
    <SafeAreaView className='flex-[1] bg-colorDark1 pt-[40px]'>
      <Menu categoryId={id} />
    </SafeAreaView>
  );
}

export default MenuInfo