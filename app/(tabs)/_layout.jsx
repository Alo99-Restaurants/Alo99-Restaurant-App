import React, { useContext } from 'react';
import { Redirect, Tabs } from 'expo-router';
import {
  Entypo,
  MaterialIcons,
  Ionicons,
  FontAwesome
} from '@expo/vector-icons';
import Color from '../../constants/Color';
import { AuthContext } from '../../context/AuthContext';

const Layout = () => {
  const { isLoading, userInfo, splashLoading, register, login, logout } =
    useContext(AuthContext);
  if (!userInfo.token) {
    // On web, static rendering will stop here as the user is not authenticated
    // in the headless Node process that the pages are rendered in.
    return <Redirect href='/sign-in' />;
  }
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Color.primary,
          tabBarInactiveTintColor: Color.grey,
          tabBarStyle: {
            backgroundColor: Color.colorDark1,
            borderTopColor: Color.colorDark1
          }
        }}>
        <Tabs.Screen
          name='(home)'
          options={{
            headerShown: false,
            tabBarLabel: 'Home',
            tabBarIcon: ({ color, size }) => (
              <Entypo name='home' color={color} size={size} />
            )
          }}
        />
        <Tabs.Screen
          name='explore'
          options={{
            tabBarLabel: 'Explore',
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name='explore' color={color} size={size} />
            )
          }}
        />
        <Tabs.Screen
          name='reserved'
          options={{
            tabBarLabel: 'Reserved',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name='md-fast-food' size={size} color={color} />
            ),
            headerShown: false
            // href: '/(tabs)/reserved'
          }}
        />
        <Tabs.Screen
          name='profile'
          options={{
            tabBarLabel: 'Profile',
            tabBarIcon: ({ color, size }) => (
              <FontAwesome name='user' size={size} color={color} />
            )
          }}
        />
      </Tabs>
    </>
  );
};

export default Layout;
