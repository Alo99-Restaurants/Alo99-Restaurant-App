import { Link } from 'expo-router';
import React, { memo } from 'react';
import {
  FlatList,
  Image,
  Pressable,
  RefreshControl,
  Text,
  View
} from 'react-native';
import Animated, { FadeInRight, FadeOutLeft } from 'react-native-reanimated';

const RestaurantCard = memo(({ restaurant }) => {
  return (
    <Link
      href={{
        pathname: '/(tabs)/(home)/restaurants/[id]',
        params: { id: restaurant.id }
      }}
      asChild>
      <Pressable>
        <Animated.View
          className='my-1 bg-colorDark2 border-none rounded-lg shadow'
          entering={FadeInRight}
          exiting={FadeOutLeft}>
          <Image
            className='rounded-t-lg w-full h-40'
            source={{ uri: restaurant?.restaurantImages[0]?.url ?? '' }}
          />
          <View className='p-5'>
            <Text className='mb-2 text-base font-bold tracking-tight text-primary2'>
              {restaurant.name}
            </Text>
            <Text
              className='mb-3 text-xs font-normal text-primary2'
              numberOfLines={4}>
              {restaurant.greetings}
            </Text>
          </View>
        </Animated.View>
      </Pressable>
    </Link>
  );
});

const RestaurantsList = ({ isLoading, storeBranches, fetchCallback }) => {
  return (
    <View className='px-2 bg-colorDark1 rounded-md h-full'>
      <Text className='font-roboto-regular text-base py-1 text-primary2'>
        Restaurants
      </Text>
      <FlatList
        data={storeBranches}
        initialNumToRender={4}
        renderItem={({ item }) => <RestaurantCard restaurant={item} />}
        keyExtractor={(_, index) => index}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            color='white'
            tintColor={'white'}
            refreshing={isLoading}
            onRefresh={fetchCallback}
          />
        }
      />
    </View>
  );
};

export default RestaurantsList;
