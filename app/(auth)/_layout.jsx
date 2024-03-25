import { View, Text } from 'react-native';
import React from 'react';
import { Stack } from 'expo-router';
import Color from '../../constants/Color';

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen
        name='sign-in/index'
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name='sign-up/index'
        options={{
          title: 'Create new account',
          headerTintColor: Color.white,
          headerStyle: { backgroundColor: Color.colorDark1 }
        }}
      />
      <Stack.Screen
        name='forgot-password/index'
        options={{
          title: 'Forgot password',
          headerTintColor: Color.white,
          headerStyle: { backgroundColor: Color.colorDark1 }
        }}
      />
    </Stack>
  );
};

export default Layout;
