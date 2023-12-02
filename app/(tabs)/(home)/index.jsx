import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useHeaderHeight } from '@react-navigation/elements';
import { Stack } from 'expo-router';
import React, { useEffect } from 'react';
import { View } from 'react-native';
import { useDispatch } from 'react-redux';
import HomeHeader from '../../../components/HomeHeader';
import RestaurantsList from '../../../components/RestaurantsList';
import {
  setHeaderHeight,
  setNavigationBottomHeight
} from '../../../redux/appSlice';

const Page = () => {
  const dispatch = useDispatch();
  const tabBarHeight = useBottomTabBarHeight();
  const headerHeight = useHeaderHeight();

  useEffect(() => {
    dispatch(setNavigationBottomHeight(tabBarHeight));
  }, [tabBarHeight]);

  useEffect(() => {
    dispatch(setHeaderHeight(headerHeight));
  }, [setHeaderHeight]);

  return (
    <View className='bg-colorDark1 flex-[1]'>
      <Stack.Screen options={{ header: () => <HomeHeader /> }} />
      <View className='flex-[1]'>
        <RestaurantsList />
      </View>
    </View>
  );
};

export default Page;
