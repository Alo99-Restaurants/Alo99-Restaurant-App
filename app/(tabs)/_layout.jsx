import React from 'react';
import { Tabs } from 'expo-router';
import {
  Entypo,
  MaterialIcons,
  Ionicons,
  FontAwesome
} from '@expo/vector-icons';
import Color from '../../constants/Color';

const Layout = () => {
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
