import { View, Text, Image } from 'react-native'
import React from 'react'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';

const data = [1,2,3];

const RestaurantsList = () => {
  return (
    <View className='px-2 bg-colorDark1'>
      <Text className='font-roboto-regular text-base py-1 text-primary2'>
        Restaurants
      </Text>
      <ScrollView>
        {data.map((_, index) => {
          return (
            <View
              key={index}
              className='my-1 bg-colorDark2 border rounded-lg shadow dark:bg-gray-800 dark:border-gray-700'>
              <TouchableOpacity
                onPress={() => console.log('press RestaurantsList')}>
                <Image
                  className='rounded-t-lg w-full h-40'
                  source={require('../assets/images/restaurant1.jpeg')}
                />
              </TouchableOpacity>
              <View className='p-5'>
                <TouchableOpacity
                  onPress={() => console.log('press RestaurantsList')}>
                  <Text className='mb-2 text-base font-bold tracking-tight text-primary2'>
                    Noteworthy technology acquisitions 2021
                  </Text>
                </TouchableOpacity>
                <Text className='mb-3 text-xs font-normal text-primary2'>
                  Here are the biggest enterprise technology acquisitions of
                  2021
                </Text>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

export default RestaurantsList