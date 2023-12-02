import { View, Text, Image, FlatList } from 'react-native';
import Animated, { FadeInRight, FadeOutLeft } from 'react-native-reanimated';
import React from 'react';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Link } from 'expo-router';

const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

const RestaurantCard = ({ data }) => {
  return (
    <Link href={`(tabs)/(home)/restaurants/${data}`}>
      <TouchableOpacity onPress={() => console.log('press RestaurantsList')}>
        <Animated.View
          className='my-1 bg-colorDark2 border-none rounded-lg shadow'
          entering={FadeInRight}
          exiting={FadeOutLeft}>
          <Image
            className='rounded-t-lg w-full h-40'
            source={require('../assets/images/restaurant1.jpeg')}
          />

          <View className='p-5'>
            <Text className='mb-2 text-base font-bold tracking-tight text-primary2'>
              Noteworthy technology acquisitions {data}
            </Text>
            <Text className='mb-3 text-xs font-normal text-primary2'>
              Here are the biggest enterprise technology acquisitions of 2021.
            </Text>
          </View>
        </Animated.View>
      </TouchableOpacity>
    </Link>
  );
};

const RestaurantsList = () => {
  return (
    <View className='px-2 bg-colorDark1 rounded-md h-full'>
      <Text className='font-roboto-regular text-base py-1 text-primary2'>
        Restaurants
      </Text>
      <FlatList
        data={data}
        initialNumToRender={4}
        renderItem={({ item }) => <RestaurantCard data={item} />}
        keyExtractor={(_, index) => index}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default RestaurantsList;
