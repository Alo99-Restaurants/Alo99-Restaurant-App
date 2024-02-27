import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useHeaderHeight } from '@react-navigation/elements';
import { Stack } from 'expo-router';
import React, { useCallback, useEffect } from 'react';
import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import HomeHeader from '../../../components/HomeHeader';
import RestaurantsList from '../../../components/RestaurantsList';
import {
  setHeaderHeight,
  setNavigationBottomHeight
} from '../../../redux/appSlice';
import { fetchRestaurantList } from '../../../redux/storeBranchesSlice';

const Page = () => {
  const dispatch = useDispatch();
  const { isLoading, storeBranches } = useSelector(
    (state) => state.storeBranches
  );
  const tabBarHeight = useBottomTabBarHeight();
  const headerHeight = useHeaderHeight();

  const fetchDataRestaurantStore = useCallback(async () => {
    try {
      dispatch(fetchRestaurantList());
    } catch (error) {
      console.log('storeBranchesResponse error', error);
    }
  }, []);

  useEffect(() => {
    dispatch(setNavigationBottomHeight(tabBarHeight));
  }, [tabBarHeight]);

  useEffect(() => {
    dispatch(setHeaderHeight(headerHeight));
  }, [setHeaderHeight]);

  useEffect(() => {
    fetchDataRestaurantStore();
  }, []);

  return (
    <View className='bg-colorDark1 flex-[1]'>
      <Stack.Screen options={{ header: () => <HomeHeader /> }} />
      <View className='flex-[1]'>
        <RestaurantsList
          fetchCallback={fetchDataRestaurantStore}
          isLoading={isLoading}
          storeBranches={storeBranches}
        />
      </View>
    </View>
  );
};

export default Page;
