import { Stack } from 'expo-router';
import React from 'react';
import Color from '../../../constants/Color';

const Layout = () => {
  return (
    <Stack initialRouteName='index'>
      <Stack.Screen name='index' />
      <Stack.Screen
        name='restaurants/[id]'
        options={{
          headerTitle: 'Restaurant',
          headerTintColor: Color.white,
          headerTransparent: true
        }}
      />
      <Stack.Screen
        name='menu/[id]'
        options={{
          headerTitle: 'Menu',
          headerTintColor: Color.white,
          headerTransparent: true
        }}
      />
    </Stack>
  );
};

export default Layout;
