import { View, Text, FlatList } from 'react-native';
import React from 'react';
import MenuItem from './MenuItem';
import Color from '../../constants/Color';

const Menu = () => {
  const menuItems = [1, 2, 3, 4, 5, 6, 7, 8, 9]; // Example menu items data

  return (
    <FlatList
      data={menuItems}
      keyExtractor={(item) => item.toString()}
      renderItem={({ item }) => <MenuItem key={item} />}
      contentContainerStyle={{ flexGrow: 1, backgroundColor: Color.colorDark1 }}
    />
  );
};

export default Menu;
