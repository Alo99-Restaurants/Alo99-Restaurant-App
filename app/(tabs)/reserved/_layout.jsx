import { View, Text } from 'react-native';
import React from 'react';
import { Stack } from 'expo-router';
import Color from '../../../constants/Color';

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen
        name='index'
        options={{
          title: 'Reservation',
          headerTintColor: Color.white,
          headerStyle: { backgroundColor: Color.colorDark1 }
        }}
      />
      <Stack.Screen
        name='[id]'
        options={{
          title: 'Order',
          headerTintColor: Color.white,
          headerStyle: { backgroundColor: Color.colorDark1 }
        }}
      />
      <Stack.Screen
        name='reservation/[id]'
        options={{
          title: 'Reservation',
          headerTintColor: Color.white,
          headerStyle: { backgroundColor: Color.colorDark1 }
        }}
      />
    </Stack>
  );
};

export default Layout;
