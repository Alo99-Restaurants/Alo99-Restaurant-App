import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';
import Modal from '../../../components/Modal';
import ReservedList from '../../../components/ReservedScreen/ReservedList';
import TabMenu from '../../../components/TabsMenu';

const menu = ['Upcoming', 'History'];

const Reserved = () => {
  const { reservationId, random } = useLocalSearchParams();
  const [menuActive, setMenuActive] = useState(0);
  const [isOpenModal, setIsOpenModal] = useState(false);

  const handleChangeTabMenu = (newMenuActive) => {
    setMenuActive(newMenuActive);
  };

  const handleOnCloseModal = (value) => {
    setIsOpenModal(!value);
  }

  useEffect(() => {
    if (reservationId) {
      router.push(`/(tabs)/reserved/reservation/${reservationId}`);
    }
  }, [reservationId, random]);

  return (
    <View className='flex-[1] bg-colorDark1'>
      <Modal isOpen={isOpenModal} onClose={handleOnCloseModal}/>
      <View className='p-2 w-full'>
        <TouchableHighlight
          style={{ borderRadius: 6 }}
          underlayColor={'#fff'}
          onPress={() => setIsOpenModal(!isOpenModal)}>
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
