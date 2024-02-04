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
          title: 'Profile',
          headerTintColor: Color.white,
          headerStyle: { backgroundColor: Color.colorDark1 }
        }}
      />
      <Stack.Screen
        name='edit'
        options={{
          title: 'Edit profile',
          headerTintColor: Color.white,
          headerStyle: { backgroundColor: Color.colorDark1 }
        }}
      />
    </Stack>
  );
};

export default Layout;
