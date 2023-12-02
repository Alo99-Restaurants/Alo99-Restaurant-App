import { Stack } from 'expo-router';
import React, { useEffect } from 'react';
import { Dimensions, View } from 'react-native';
import HomeHeader from '../../../components/HomeHeader';
import RestaurantsList from '../../../components/RestaurantsList';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useDispatch } from 'react-redux';
import {
  setNavigationBottomHeight,
  setHeaderHeight
} from '../../../redux/appSlice';
import { useHeaderHeight } from '@react-navigation/elements';

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
    <View className='bg-colorDark1'>
      <Stack.Screen options={{ header: () => <HomeHeader /> }} />
      <RestaurantsList />
    </View>
  );
};

export default Page;
