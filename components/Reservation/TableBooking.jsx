import { Dimensions, Text, View } from 'react-native';
import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Color from '../../constants/Color';
import data from './mockdata/data';

const windowWidth = Dimensions.get('window').width - 16;
const scale = windowWidth / data.width;
const menu = ['1st floor', '2nd floor'];

const TableBooking = () => {
  const [menuActive, setMenuActive] = useState(0);

  const Box = ({ w, h, x, y, scale, type, id }) => {
    const newPositionX = x * scale;
    const newPositionY = y * scale;

    const renderType = (type) => {
      switch (type) {
        case 'box2':
          return 'orange';
        case 'box3':
          return 'green';
        case 'box4':
          return 'blue';
        default:
          return 'red';
      }
    };

    return (
      <View
        style={{
          position: 'absolute',
          width: w * scale,
          height: h * scale,
          backgroundColor: renderType(type),
          top: newPositionY,
          left: newPositionX
        }}>
        <Text>{type}</Text>
      </View>
    );
  };

  const handlePressFloorMenu = (menuActive) => {
    setMenuActive(menuActive);
  };

  return (
    <View>
      <View className='flex flex-row justify-around bg-colorDark2 rounded-xl p-2 mb-4'>
        {menu.map((menuItem, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handlePressFloorMenu(index)}>
            <View className={`w-32 `}>
              <Text
                className={`inline-block px-6 py-3 font-roboto-bold text-center text-white rounded-t-lg active ${
                  menuActive === index ? 'text-primary1' : ''
                }`}>
                {menuItem}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
      <View
        style={{
          width: windowWidth,
          height: windowWidth * 0.7,
          backgroundColor: Color.colorDark2,
          borderRadius: 5
        }}>
        {data.tables.map((table, index) => {
          return (
            <Box
              key={index}
              id={table.id}
              w={table.width}
              h={table.height}
              x={table.position.x}
              y={table.position.y}
              type={table.type}
              scale={scale}
            />
          );
        })}
      </View>
    </View>
  );
};

export default TableBooking;
