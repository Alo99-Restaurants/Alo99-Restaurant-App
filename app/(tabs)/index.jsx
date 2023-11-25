import { View } from 'react-native';
import React from 'react';
import { Link, Stack } from 'expo-router';
import HomeHeader from '../../components/HomeHeader';
import RestaurantsList from '../../components/RestaurantsList';

const Page = () => {
  return (
    <View className='bg-colorDark1 h-full'>
      <Stack.Screen options={{ header: () => <HomeHeader /> }} />
      <RestaurantsList />
      {/* <View className='bg-orange-200 h-24 flex flex-row items-center justify-center'>
        <Link
          className='text-red-600 font-roboto-light text-2xl mx-2'
          href={'/(modals)/login'}>
          Login
        </Link>
        <Link
          className='text-red-600 font-roboto-light text-2xl mx-2'
          href={'/(modals)/booking'}>
          Booking
        </Link>
      </View> */}
    </View>
  );
};

export default Page;
