import { View, Text, SafeAreaView } from 'react-native';
import React from 'react';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import Color from '../constants/Color';
import FoodCategory from './FoodCategory';
import { iconCategories } from '../assets/data/iconCategories';

const HomeHeader = () => {
  return (
    <SafeAreaView className='pt-[25px] bg-colorDark1'>
      <View className='header px-2'>
        <Text className='font-roboto-bold text-xl py-1 text-primary2'>
          Hello, Ky Phan!
        </Text>
        <Text className='font-roboto-regular text-base py-1 text-primary2'>
          Let's reserved a table for you
        </Text>
        <View className='search-tool flex-row items-center py-1'>
          <View className='search grow-[0.9]'>
            <TouchableOpacity onPress={() => console.log('press..')}>
              <View className='flex-row items-center py-1 px-3 my-1 bg-colorDark2 rounded-2xl'>
                <View className='pr-4'>
                  <Ionicons name='search' size={24} color='white' />
                </View>
                <Text className='font-roboto-regular text-base py-1 text-primary2'>
                  Search...
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <View className='filter grow-[0.1] flex items-center'>
            <TouchableOpacity
              hitSlop={{ top: 5, bottom: 5, left: 5, right: 5 }}
              onPress={() => console.log('press..')}>
              <Ionicons name='ios-options' size={30} color={Color.primary} />
            </TouchableOpacity>
          </View>
        </View>
        <Text className='font-roboto-regular text-base py-1 text-primary2'>
          Categories
        </Text>
        <ScrollView horizontal>
          {iconCategories.map((category) => (
            <FoodCategory
              classStyle={'mr-2'}
              label={category.title}
              img={category.img}
            />
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default HomeHeader;
