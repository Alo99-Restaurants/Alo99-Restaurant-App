import { View, Text } from 'react-native';
import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import DetailsMenu from './DetailsMenu';

const TabMenu = ({ menu }) => {
  const [menuActive, setMenuActive] = useState(0);
  const handlePressMenu = (menuActive) => {
    setMenuActive(menuActive);
  };

  const renderMenu = () => {
    switch (menuActive) {
      case 0:
        return <DetailsMenu />;
      case 1:
        return (
          <View>
            <Text className='h-full text-white'>Menu</Text>
          </View>
        );
      case 2:
        return (
          <View>
            <Text className='h-full text-white'>Review</Text>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <View className='flex-[1]'>
      <View className='flex-[0.1] flex-row justify-around h-full'>
        {menu.map((menuItem, index) => (
          <TouchableOpacity key={index} onPress={() => handlePressMenu(index)}>
            <View
              className={`w-24 me-2 border-b-4 ${
                menuActive === index ? 'border-primary1' : 'border-colorDark1'
              }`}>
              <Text className='inline-block px-6 py-3 font-roboto-bold text-center text-white rounded-t-lg active'>
                {menuItem}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
      <View className='flex-[0.9]'>{renderMenu()}</View>
    </View>
  );
};

export default TabMenu;
