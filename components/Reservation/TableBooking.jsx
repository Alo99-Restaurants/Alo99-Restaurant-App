import { Dimensions, Image, Pressable, Text, View } from 'react-native';
import React, { useEffect, useState, useCallback } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Color from '../../constants/Color';
import data from './mockdata/data';
import { useDispatch, useSelector } from 'react-redux';
import { clearState, fetchFloorTables } from '../../redux/tableLayoutSlice';
import { checkTablesBookingService } from '../../services/restaurant.booking.service';
import { convertDateTime } from '../../helper';

const windowWidth = Dimensions.get('window').width - 16;
const scale = windowWidth / data.width;

export const TABLE_ICONS = [
  {
    type: '2',
    url: require('../../assets/table_icon/Table2.png'),
    url_activate: require('../../assets/table_icon/Table2_activate.png'),
    url_disabled: require('../../assets/table_icon/Table2_disabled.png')
  },
  {
    type: '4',
    url: require('../../assets/table_icon/Table4.png'),
    url_activate: require('../../assets/table_icon/Table4_activate.png'),
    url_disabled: require('../../assets/table_icon/Table4_disabled.png')
  },
  {
    type: '6',
    url: require('../../assets/table_icon/Table6.png'),
    url_activate: require('../../assets/table_icon/Table6_activate.png'),
    url_disabled: require('../../assets/table_icon/Table6_disabled.png')
  },
  {
    type: '8',
    url: require('../../assets/table_icon/Table8.png'),
    url_activate: require('../../assets/table_icon/Table8_activate.png'),
    url_disabled: require('../../assets/table_icon/Table8_disabled.png')
  },
  {
    type: '10',
    url: require('../../assets/table_icon/Table10.png'),
    url_activate: require('../../assets/table_icon/Table10_activate.png'),
    url_disabled: require('../../assets/table_icon/Table10_disabled.png')
  },
  {
    type: '12',
    url: require('../../assets/table_icon/Table12.png'),
    url_activate: require('../../assets/table_icon/Table12_activate.png'),
    url_disabled: require('../../assets/table_icon/Table12_disabled.png')
  }
];

const TableIcon = React.memo(({ w, h, x, y, scale, type, id, direction, handleBoxSelection, isBooked, tableIds, timeBookingSelected }) => {
  const textStyle = isBooked ? 'text-gray-200 border' : 'text-black';

  return (
    <Pressable onPress={() => handleBoxSelection(id)} disabled={isBooked}>
      <View
        className={`${direction === 'horizontal' ? 'rotate-90' : ''}`}
        style={{
          position: 'absolute',
          width: w * scale,
          height: h * scale,
          top: y * scale,
          left: x * scale
        }}>
        <Image
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            justifyContent: 'center',
            alignItems: 'center',
            width: w * scale,
            height: h * scale,
            aspectRatio: Number(w) / Number(h)
          }}
          source={
            isBooked
              ? TABLE_ICONS.find((item) => item.type == type)?.url_disabled
              : tableIds.some((tableId) => tableId === id)
                ? TABLE_ICONS.find((item) => item.type == type)?.url_activate
                : TABLE_ICONS.find((item) => item.type == type)?.url
          }
        />
        <View className={`${direction === 'horizontal' ? '-rotate-90' : ''} absolute w-full h-full flex justify-center items-center`}>
          <Text className={`${textStyle} font-roboto-black text-base`}>
            {type}
          </Text>
        </View>
      </View>
    </Pressable>
  );
});

const TableBooking = ({
  restaurantFloors,
  dataBooking,
  tableIds,
  onChange,
  restaurant
}) => {
  const dispatch = useDispatch();
  const { layout } = useSelector((state) => state.layout);
  const [menuActive, setMenuActive] = useState(
    restaurantFloors[0]?.id
  );
  const [allBookingsOnDay, setAllBookingsOnDay] = useState();
  const timeBookingSelected = dataBooking[1]?.data;
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
      direction: extensionData.direction ?? 'horizontal',
      capacity: table.capacity,
      tableName: table.tableName
    };
  });

  const handleBoxSelection = useCallback((id) => {
    if (tableIds.some((tableId) => tableId === id)) {
      onChange(tableIds.filter((tableId) => tableId !== id));
    } else {
      onChange([...tableIds, id]);
    }
  }, [tableIds, onChange]);

  const handlePressFloorMenu = (id) => {
    setMenuActive(id);
  };

  useEffect(() => {
    onChange([]);
  }, []);

  useEffect(() => {
    return () => {
      dispatch(clearState());
    };
  }, []);

  useEffect(() => {
    dispatch(fetchFloorTables(menuActive));
  }, [menuActive]);

  useEffect(() => {
    const fetchTablesBookingStatus = async () => {
      const totalGuest =
        Number(dataBooking[2]?.data?.adults ?? 0) +
        Number(dataBooking[2]?.data?.children ?? 0);
      const dateTime = convertDateTime(
        dataBooking[1]?.data,
        dataBooking[0]?.data
      );
      const payload = {
        restaurantId: restaurant.id,
        capacity: totalGuest,
        bookingDate: dateTime
      };
      try {
        const response = await checkTablesBookingService(payload);
        const dataBooking = response?.data?.data;
        const getAllBookings = (array) => {
          return array.reduce((bookingsArray, obj) => {
            obj.bookings.forEach((booking) => {
              bookingsArray.push({ ...booking, tableId: obj.id });
            });
            return bookingsArray;
          }, []);
        };
        if (dataBooking) {
          setAllBookingsOnDay(getAllBookings(dataBooking));
        } else {
          setAllBookingsOnDay([]);
        }
      } catch (error) {}
    };
    fetchTablesBookingStatus();
  }, [dataBooking]);

  if(!allBookingsOnDay) return null;

  return (
    <View>
      <View className='flex flex-row justify-around bg-colorDark2 rounded-xl p-2 mb-4'>
        {menu.map((item, index) => (
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
            <TableIcon
              key={index}
              id={table.id}
              w={table.width}
              h={table.height}
              x={table.position.x}
              y={table.position.y}
              type={table.type}
              direction={table.direction}
              scale={scale}
              handleBoxSelection={handleBoxSelection}
              isBooked={allBookingsOnDay.some((booking) => {
                const bookingDateTime = new Date(booking.bookingDate);
                const timeBookingSelectedMinus1Hour30Mins = new Date(
                  new Date().setHours(
                    parseInt(timeBookingSelected.split(':')[0]),
                    parseInt(timeBookingSelected.split(':')[1]) - 90
                  )
                ); // Subtract 1 hour 30 minutes
                return (
                  booking.tableId === table.id &&
                  bookingDateTime > timeBookingSelectedMinus1Hour30Mins
                );
              })}
              tableIds={tableIds}
              timeBookingSelected={timeBookingSelected}
            />
          );
        })}
      </View>
    </View>
  );
};

export default TableBooking;

