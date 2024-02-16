import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useMemo, useState } from 'react';
import { Text, View } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';
import ReservedList from '../../../components/ReservedScreen/ReservedList';
import TabMenu from '../../../components/TabsMenu';
import { useDispatch, useSelector } from 'react-redux';
import RNPickerSelect from 'react-native-picker-select';
import { clearState } from '../../../redux/tableLayoutSlice';

const menu = ['Upcoming', 'History'];

const Reserved = () => {
  const { storeId, random } = useLocalSearchParams();
  const { storeBranches } = useSelector((state) => state.storeBranches);
  const [activeStoreBranchId, setActiveStoreBranchId] = useState();
  const restaurantOptions = storeBranches.map((restaurant) => {
    return { label: restaurant.name, value: restaurant.id };
  });
  const [menuActive, setMenuActive] = useState(0);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const dispatch = useDispatch();

  const handleChangeTabMenu = (newMenuActive) => {
    setMenuActive(newMenuActive);
  };

  const handleOnClickBookTable = () => {
    if (activeStoreBranchId) {
      dispatch(clearState());
      router.push(`/(tabs)/reserved/reservation/${activeStoreBranchId}`);
    }
  };

  useEffect(() => {
    if (storeId) {
      dispatch(clearState());
      router.push(`/(tabs)/reserved/reservation/${storeId}`);
    }
  }, [storeId, random]);

  return (
    <View className='flex-[1] bg-colorDark1'>
      <View className='h-10 flex justify-center rounded-md mx-2 px-2 border border-primary1 text-white'>
        <RNPickerSelect
          style={{
            inputIOS: { color: 'white' },
            inputAndroid: { color: 'white' }
          }}
          placeholder={{
            label: 'Please choose a restaurant...',
            value: ''
          }}
          onValueChange={(value) => setActiveStoreBranchId(value)}
          items={restaurantOptions}
        />
      </View>
      <View className='p-2 w-full'>
        <TouchableHighlight
          style={{ borderRadius: 6 }}
          underlayColor={'#fff'}
          onPress={handleOnClickBookTable}>
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
