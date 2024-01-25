import {
  FontAwesome,
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons
} from '@expo/vector-icons';
import React, { useMemo } from 'react';
import { Text, View } from 'react-native';
import {
  TouchableHighlight,
  TouchableOpacity
} from 'react-native-gesture-handler';
import Color from '../../constants/Color';
import { router } from 'expo-router';
import { generateRandomString } from '../../helper';
import { useSelector } from 'react-redux';

const DetailsMenu = ({ activeStoreBranch }) => {
  const randomMixedCaseString = generateRandomString(5);
  return (
    <>
      <View className='px-2 h-full'>
        <View className='flex flex-row justify-between items-center py-2'>
          <Text className='font-roboto-medium text-lg text-center text-white '>
            {activeStoreBranch.name}
          </Text>
          <TouchableOpacity hitSlop={{ top: 5, bottom: 5, left: 5, right: 5 }}>
            <View className='flex flex-row justify-between items-center'>
              <FontAwesome name='star' size={24} color={Color.primary} />
              <Text className='font-roboto-regular text-xs text-center text-white ml-2'>
                4.8 (123)
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        {/* Location */}
        <View className='flex flex-row items-center py-3'>
          <View className='flex-[2]'>
            <View className='flex flex-row justify-start items-center pr-5'>
              <Ionicons name='location-sharp' size={20} color='white' />
              <Text
                className='text-left font-roboto-regular text-sm text-white ml-2 text-ellipsis overflow-hidden'
                numberOfLines={1}>
                {activeStoreBranch.address}
              </Text>
            </View>
          </View>
          <View className='flex-[1]'>
            <TouchableOpacity
              hitSlop={{ top: 5, bottom: 5, left: 5, right: 5 }}>
              <View className='flex flex-row justify-between items-center'>
                <Text className='font-roboto-regular text-xs text-left text-white ml-2'>
                  Show on map
                </Text>
                <FontAwesome5 name='angle-right' size={20} color='white' />
              </View>
            </TouchableOpacity>
          </View>
        </View>
        {/* Phone */}
        <View className='flex flex-row items-center py-3'>
          <View className='flex-[2]'>
            <View className='flex flex-row justify-start items-center pr-5'>
              <Ionicons
                name='ios-phone-portrait-sharp'
                size={20}
                color='white'
              />
              <Text className='text-left font-roboto-regular text-sm text-white ml-2 text-ellipsis overflow-hidden'>
                {activeStoreBranch.phoneNumber}
              </Text>
            </View>
          </View>
          <View className='flex-[1]'>
            <TouchableOpacity
              hitSlop={{ top: 5, bottom: 5, left: 5, right: 5 }}>
              <View className='flex flex-row justify-between items-center'>
                <Text className='font-roboto-regular text-xs text-left text-white ml-2'>
                  Call up
                </Text>
                <FontAwesome5 name='angle-right' size={20} color='white' />
              </View>
            </TouchableOpacity>
          </View>
        </View>
        {/* Time */}
        <View className='flex flex-row items-center py-3'>
          <View className='flex-[2]'>
            <View className='flex flex-row justify-start items-center pr-5'>
              <MaterialCommunityIcons
                name='clock-time-five-outline'
                size={20}
                color='white'
              />
              <Text className='text-left font-roboto-regular text-sm text-white ml-2 text-ellipsis overflow-hidden'>
                {`${activeStoreBranch.openHours} - ${activeStoreBranch.closeHours}`}
              </Text>
            </View>
          </View>
          <View className='flex-[1]'>
            <TouchableOpacity
              hitSlop={{ top: 5, bottom: 5, left: 5, right: 5 }}>
              <View className='flex flex-row justify-between items-center'>
                <Text className='font-roboto-regular text-xs text-left text-white ml-2'>
                  Show schedule
                </Text>
                <FontAwesome5 name='angle-right' size={20} color='white' />
              </View>
            </TouchableOpacity>
          </View>
        </View>
        {/* Website */}
        <View className='flex flex-row items-center py-3'>
          <View className='flex-[2]'>
            <View className='flex flex-row justify-start items-center pr-5'>
              <MaterialCommunityIcons name='web' size={20} color='white' />
              <Text className='text-left font-roboto-regular text-sm text-white ml-2 text-ellipsis overflow-hidden'>
                https://alo99.com/
              </Text>
            </View>
          </View>
          <View className='flex-[1]'>
            <TouchableOpacity
              hitSlop={{ top: 5, bottom: 5, left: 5, right: 5 }}>
              <View className='flex flex-row justify-between items-center'>
                <Text className='font-roboto-regular text-xs text-left text-white ml-2'>
                  Open website
                </Text>
                <FontAwesome5 name='angle-right' size={20} color='white' />
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <Text
          className='mt-5 text-left font-roboto-regular text-sm text-white'
          numberOfLines={6}>
          {activeStoreBranch.greetings}
        </Text>
      </View>
      <View className='absolute px-2 bottom-2 left-0 w-full'>
        <TouchableHighlight
          style={{ borderRadius: 6 }}
          underlayColor={'#fff'}
          onPress={() =>
            router.push(
              `/(tabs)/reserved?reservationId=${activeStoreBranch.id}&random=${randomMixedCaseString}`
            )
          }>
          <View className=' bg-primary1 h-10 rounded-md flex justify-center items-center'>
            <Text className=' font-roboto-black text-md text-center text-white'>
              Book Table
            </Text>
          </View>
        </TouchableHighlight>
      </View>
    </>
  );
};

export default DetailsMenu;
