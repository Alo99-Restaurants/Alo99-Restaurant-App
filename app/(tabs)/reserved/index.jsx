import { Link, router, useFocusEffect } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';
import ReservedList from '../../../components/ReservedScreen/ReservedList';
import { useGlobalSearchParams, useLocalSearchParams } from 'expo-router';
import { useEffect } from 'react';
import TabMenu from '../../../components/TabsMenu';
import { useState } from 'react';
import { TouchableHighlight } from 'react-native-gesture-handler';

const menu = ['Upcoming', 'History'];

const Reserved = () => {
  const { reservationId, random } = useLocalSearchParams();
  const [menuActive, setMenuActive] = useState(0);
  const handleChangeTabMenu = (newMenuActive) => {
    setMenuActive(newMenuActive);
  };

  useEffect(() => {
    if (reservationId) {
      router.push(`/(tabs)/reserved/reservation/${reservationId}`);
    }
  }, [reservationId, random]);

  return (
    <View className='flex-[1] bg-colorDark1'>
      <View className='p-2 w-full'>
        <TouchableHighlight
          style={{ borderRadius: 6 }}
          underlayColor={'#fff'}
          onPress={() => router.push(`/(tabs)/reserved/reservation/1`)}>
          <View className=' bg-primary1 h-10 rounded-md flex justify-center items-center'>
            <Text className=' font-roboto-black text-md text-center text-white'>
              Book Table
            </Text>
          </View>
        </TouchableHighlight>
      </View>
      <TabMenu
        itemClassName={'w-32'}
        menu={menu}
        onChange={handleChangeTabMenu}>
        <ReservedList />
      </TabMenu>
    </View>
  );
};

export default Reserved;
