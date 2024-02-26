import {
  Entypo,
  FontAwesome,
  MaterialCommunityIcons
} from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Image, Text, View } from 'react-native';
import { getBookingDetailByIdService } from '../../../services/restaurant.booking.service';
import { convertDateString } from '../../../helper';
import { useSelector } from 'react-redux';
import Categories from '../../../components/OrderMenu/Categories';
import ListOfFood from '../../../components/OrderMenu/ListOfFood';

const Reserved = () => {
  const { id } = useLocalSearchParams();
  const { storeBranches } = useSelector((state) => state.storeBranches);
  const [bookingDetail, setBookingDetail] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const restaurantInfo = bookingDetail?.restaurant;
  const dateParsed = convertDateString(bookingDetail?.bookingDate);
  const restaurantSelected = storeBranches?.find(
    (res) => res.id === bookingDetail?.restaurant.id
  );
  const [categorySelected, setCategorySelected] = useState();
  console.log('categorySelected change', categorySelected);

  useEffect(() => {
    const fetchBookingDetail = async (id) => {
      try {
        const responseBookingDetail = await getBookingDetailByIdService(id);
        setBookingDetail(responseBookingDetail?.data?.data);
      } catch (error) {}
    };
    if (id) {
      fetchBookingDetail(id);
    }
  }, [id]);

  if (!bookingDetail) return <></>;

  return (
    <View className='flex-[1] bg-colorDark1'>
      <View className='flex-row h-24 bg-colorDark1'>
        <View className='flex-[1] pr-1'>
          <Image
            source={{ uri: restaurantSelected?.restaurantImages[0]?.url }}
            className='w-full h-24'
          />
        </View>
        <View className='flex-[1] justify-between pl-1'>
          <View className='flex-[1.5]'>
            <Text className='pb-1 font-roboto-black text-base text-left text-white'>
              {restaurantInfo?.name}
            </Text>
          </View>
          <View className='flex-[1] flex-row'>
            <Entypo name='calendar' size={14} color='white' />
            <Text className='pl-3 font-roboto-medium text-md text-left text-white'>
              {dateParsed[0]}
            </Text>
          </View>
          <View className='flex-[1] flex-row'>
            <MaterialCommunityIcons
              name='clock-time-five-outline'
              size={14}
              color='white'
            />
            <Text className='pl-3 font-roboto-medium text-md text-left text-white'>
              {dateParsed[1]}
            </Text>
          </View>
          <View className='flex-[1] flex-row'>
            <FontAwesome name='users' size={14} color='white' />
            <Text className='pl-3 font-roboto-medium text-md text-left text-white'>
              {bookingDetail.numberOfPeople}
            </Text>
          </View>
        </View>
      </View>
      <View className='mt-2'>
        <Categories onChangeCategory={setCategorySelected} />
        <ListOfFood categoryId={categorySelected} />
      </View>
    </View>
  );
};

export default Reserved;
