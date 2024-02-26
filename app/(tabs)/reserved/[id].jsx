import {
  Entypo,
  FontAwesome,
  MaterialCommunityIcons
} from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Image, Text, View } from 'react-native';
import { getBookingDetailByIdService } from '../../../services/restaurant.booking.service';
import { convertDateString, convertPrice } from '../../../helper';
import { useSelector } from 'react-redux';
import Categories from '../../../components/OrderMenu/Categories';
import ListOfFood from '../../../components/OrderMenu/ListOfFood';
import { TouchableHighlight } from 'react-native-gesture-handler';
import ConfirmOrder from '../../../components/OrderMenu/ConfirmOrder';
import ModalComponent from '../../../components/ModalComponent';

const Reserved = () => {
  const { id } = useLocalSearchParams();
  const { storeBranches } = useSelector((state) => state.storeBranches);
  const [bookingDetail, setBookingDetail] = useState();
    const [isModalOpen, setIsModalOpen] = useState(false);

  const restaurantInfo = bookingDetail?.restaurant;
  const dateParsed = convertDateString(bookingDetail?.bookingDate);
  const restaurantSelected = storeBranches?.find(
    (res) => res.id === bookingDetail?.restaurant.id
  );
  const [categorySelected, setCategorySelected] = useState();
  const [dataOrder, setDataOrder] = useState([]);

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

  const calculateTotal = () => {
    if(!dataOrder || Object.keys(dataOrder).length === 0) return { totalQuantity: 0, totalPrice: 0 };
    let totalQuantity = Object.values(dataOrder).reduce(
      (acc, item) => acc + item.quantity,
      0
    );
    let totalPrice = Object.values(dataOrder).reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    return { totalQuantity, totalPrice: convertPrice(totalPrice) };
  };
  const calculatedData = calculateTotal();

  if (!bookingDetail) return <></>;
  console.log('dataOrder', dataOrder);
  return (
    <>
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
        <View className='flex-[4] mt-2'>
          <View className='h-24'>
            <Categories onChangeCategory={setCategorySelected} />
          </View>
          <View className='flex-[1]'>
            <ListOfFood
              dataOrder={dataOrder}
              setDataOrder={setDataOrder}
              categoryId={categorySelected}
            />
          </View>
        </View>
        <View className='flex-[1]'>
          <View className='p-2 pt-4'>
            <Text className='font-roboto-black text-base text-left text-white'>
              {`Total Price: ${calculatedData.totalPrice} - Amount: ${calculatedData.totalQuantity}`}
            </Text>
          </View>
          <View className='absolute px-2 bottom-5 left-0 w-full'>
            <TouchableHighlight
              style={{ borderRadius: 6 }}
              underlayColor={'#fff'}
              onPress={() => setIsModalOpen(true)}>
              <View className=' bg-primary1 h-10 rounded-md flex justify-center items-center'>
                <Text className=' font-roboto-black text-lg text-center text-white'>
                  Pay
                </Text>
              </View>
            </TouchableHighlight>
          </View>
        </View>
      </View>

      {/* Modal confirm Order */}
      <ModalComponent
        onClose={() => setIsModalOpen(false)}
        isOpen={isModalOpen}>
        <ConfirmOrder calculatedData={calculatedData} dataOrder={dataOrder} />
      </ModalComponent>
    </>
  );
};

export default Reserved;
