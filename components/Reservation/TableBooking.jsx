import { Dimensions, Pressable, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Color from '../../constants/Color';
import data from './mockdata/data';
import { useDispatch, useSelector } from 'react-redux';
import { clearState, fetchFloorTables } from '../../redux/tableLayoutSlice';

const windowWidth = Dimensions.get('window').width - 16;
const scale = windowWidth / data.width;

const TableBooking = ({
  restaurantFloors,
  dataBooking,
  tableIds,
  onChange
}) => {
  const dispatch = useDispatch();
  const { layout } = useSelector((state) => state.layout);
  const [menuActive, setMenuActive] = useState(
    restaurantFloors[restaurantFloors.length - 1].id
  );
  const [selectedTableIds, setSelectedTableIds] = useState(tableIds);

  const menu = restaurantFloors.map((floor) => {
    return {
      value: floor.id,
      label: floor.name
    };
  });

  const unescapeStringData = (escapedString) => {
    var removeString = escapedString && escapedString.replace(/\\"/g, '"');
    const originalString = JSON.parse(removeString);

    return originalString;
  };

  const mapDataTables = layout.map((table) => {
    const extensionData = unescapeStringData(table.extensionData);
    return {
      id: table.id,
      type: table.tableType,
      width: extensionData.width,
      height: extensionData.height,
      position: extensionData.position,
      capacity: table.capacity,
      tableName: table.tableName
    };
  });

  const handleBoxSelection = (id) => {
    // const totalGuest =
    //   Number(dataBooking[2]?.data?.adults ?? 0) +
    //   Number(dataBooking[2]?.data?.children ?? 0);
    if (selectedTableIds.some((tableId) => tableId === id)) {
      onChange(selectedTableIds.filter((tableId) => tableId !== id));
      setSelectedTableIds(selectedTableIds.filter((tableId) => tableId !== id));
    } else {
      onChange([...selectedTableIds, id]);
      setSelectedTableIds([...selectedTableIds, id]);
    }
  };

  useEffect(() => {
    return () => {
      dispatch(clearState());
    };
  }, []);

  useEffect(() => {
    dispatch(fetchFloorTables(menuActive));
  }, [menuActive]);

  const Box = ({ w, h, x, y, scale, type, id }) => {
    return (
      <Pressable onPress={() => handleBoxSelection(id)}>
        <View
          style={{
            position: 'absolute',
            width: w * scale,
            height: h * scale,
            backgroundColor: '#F7BE20',
            borderColor: selectedTableIds.some((tableId) => tableId === id)
              ? 'red'
              : 'transparent', // Styling based on selectedTableIds
            borderWidth: selectedTableIds.some((tableId) => tableId === id)
              ? 2
              : 0,
            top: y * scale,
            left: x * scale
          }}>
          <View className='relative w-full h-full flex justify-center items-center'>
            <Text className='text-white font-roboto-black text-base'>
              {type}
            </Text>
          </View>
        </View>
      </Pressable>
    );
  };

  const handlePressFloorMenu = (id) => {
    setMenuActive(id);
  };

  return (
    <View>
      <View className='flex flex-row justify-around bg-colorDark2 rounded-xl p-2 mb-4'>
        {menu.reverse().map((item, index) => (
          <TouchableOpacity
            key={item.value}
            onPress={() => handlePressFloorMenu(item.value)}>
            <View className={`w-32 `}>
              <Text
                className={`inline-block px-6 py-3 font-roboto-bold text-center text-white rounded-t-lg active ${
                  menuActive === item.value ? 'text-primary1' : ''
                }`}>
                {item.label}
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
        {mapDataTables.map((table, index) => {
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

