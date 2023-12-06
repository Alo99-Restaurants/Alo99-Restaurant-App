import { View, Text } from 'react-native';
import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import DetailsMenu from './DetailsMenu';

const TabMenu = ({ menu, onChange, className, itemClassName, children }) => {
  const [menuActive, setMenuActive] = useState(0);
  const handlePressMenu = (menuActive) => {
    setMenuActive(menuActive);
    onChange(menuActive);
  };

  return (
    <View className={`flex-[1] ${className}`}>
      <View className='flex-[0.1] flex-row justify-around h-full'>
        {menu.map((menuItem, index) => (
          <TouchableOpacity key={index} onPress={() => handlePressMenu(index)}>
            <View
              className={`me-2 border-b-4 ${
                menuActive === index ? 'border-primary1' : 'border-colorDark1'
              } ${itemClassName}`}>
              <Text className='inline-block px-6 py-3 font-roboto-bold text-center text-white rounded-t-lg active'>
                {menuItem}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
      <View className='flex-[0.9]'>{children}</View>
    </View>
  );
};

export default TabMenu;
