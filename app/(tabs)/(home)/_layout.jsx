import { View, Text } from 'react-native';
import React from 'react';
import { Stack } from 'expo-router';
import Color from '../../../constants/Color';

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen name='index' />
      <Stack.Screen
        name='restaurants/[id]'
        options={{
          headerTitle: 'Restaurant',
          headerTintColor: Color.white,
          headerTransparent: true
        }}
      />
    </Stack>
  );
};

export default Layout;
