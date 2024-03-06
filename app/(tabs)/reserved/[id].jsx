import React, { useEffect, useState } from 'react';
import { Image, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { router, useLocalSearchParams } from 'expo-router';
import {
  Entypo,
  FontAwesome,
  FontAwesome5,
  MaterialCommunityIcons
} from '@expo/vector-icons';
import {
  getBookingDetailByIdService,
  getBookingMenuService
} from '../../../services/restaurant.booking.service';
import { convertDateString, convertPrice } from '../../../helper';
import Categories from '../../../components/OrderMenu/Categories';
import ListOfFood from '../../../components/OrderMenu/ListOfFood';
import ConfirmOrder from '../../../components/OrderMenu/ConfirmOrder';
import ModalComponent from '../../../components/ModalComponent';
import Color from '../../../constants/Color';
import { clearAddNewBookingOrderStatus } from '../../../redux/bookingSlice';
import { getStatusVNPay } from '../../../services/payment.service';

const convertDataAPIToObjectLocal = (array) => {
  const result = {};
  array.forEach((item) => {
    const { id, menuId, restaurantMenu, quantity } = item;
    result[menuId] = {
      id: restaurantMenu.id,
      idEdit: id,
      menuUrl: restaurantMenu.menuUrl,
      name: restaurantMenu.name,
      price: restaurantMenu.price,
      quantity: quantity
    };
  });
  return result;
};

const Reserved = () => {
  const localParams = useLocalSearchParams();
  const { id, paid, pay } = localParams;
  const dispatch = useDispatch();
  const { storeBranches } = useSelector((state) => state.storeBranches);
  const [bookingDetail, setBookingDetail] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isPay, setIsPay] = useState(false);
  const [isView, setIsView] = useState(false);
  const [categorySelected, setCategorySelected] = useState();
  const [dataOrder, setDataOrder] = useState([]);

  const bookingStatus = bookingDetail?.bookingStatusId;
  const restaurantInfo = bookingDetail?.restaurant;
  const dateParsed = convertDateString(bookingDetail?.bookingDate);
  const restaurantSelected = storeBranches?.find(
    (res) => res.id === bookingDetail?.restaurant.id
  );
  const { isAddNewBookingOrderSuccess } = useSelector((state) => state.booking);

  useEffect(() => {
    if (paid) {
      // Close the Confirm modal when payment is successful
      const getStatusVNPayService = async () => {
        const responseGetStatusVNPay = await getStatusVNPay(localParams);
        console.log('responseGetStatusVNPay', responseGetStatusVNPay.data);
      };
      setIsModalOpen(false);
      getStatusVNPayService();
    }
    if (pay) {
      // Open modal pay
      console.log('new pay');
    }
  }, [localParams]);

  useEffect(() => {
    const fetchBookingDetail = async (id) => {
      try {
        const responseBookingDetail = await getBookingDetailByIdService(id);
        setBookingDetail(responseBookingDetail?.data?.data);
      } catch (error) {}
    };

    const fetchBookingMenuById = async (id) => {
      try {
        const responseBookingMenuById = await getBookingMenuService({
          BookingId: id
        });
        const menuOrdered = responseBookingMenuById.data.items;
        if (menuOrdered.length > 0) {
          const dataConverted = convertDataAPIToObjectLocal(menuOrdered);
          setDataOrder(dataConverted);
          setIsEdit(true);
        }
      } catch (error) {}
    };

    if (id) {
      fetchBookingDetail(id);
      fetchBookingMenuById(id);
    }
  }, [id]);

  const calculateTotal = () => {
    if (!dataOrder || Object.keys(dataOrder).length === 0)
      return { totalQuantity: 0, totalPrice: 0 };
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

  const handleCloseModal = () => {
    setIsModalOpen(false);
    if (isAddNewBookingOrderSuccess) router.back();
    dispatch(clearAddNewBookingOrderStatus());
  };

  const handlePayOrder = () => {
    setIsPay(true);
    setIsModalOpen(true);
  };

  const handleViewOrder = () => {
    setIsModalOpen(true);
  };

  if (!bookingDetail) return <></>;

  return (
    <>
      <View className='flex-[1] bg-colorDark1'>
        <View className='flex-row h-24 bg-colorDark1'>
          <View className='flex-[1] pr-1'>
            <Image
              source={{
                uri: restaurantSelected?.restaurantImages[0]?.url,
                cache: 'force-cache'
              }}
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
              ableToEdit={bookingStatus === 'Confirm'}
              dataOrder={dataOrder}
              setDataOrder={setDataOrder}
              categoryId={categorySelected}
            />
          </View>
        </View>
        <View
          className={`flex-[1.2] ${
            bookingStatus == 'Using' || bookingStatus === 'Confirm'
              ? ''
              : 'flex justify-center'
          }`}>
          <TouchableHighlight
            style={{ borderRadius: 6 }}
            underlayColor={Color.colorDark2}
            onPress={handleViewOrder}>
            <View className='p-2 pt-4 flex flex-row justify-start items-center gap-2'>
              <View className='relative flex items-center justify-center'>
                <FontAwesome5
                  name='shopping-bag'
                  size={45}
                  color={Color.primary}
                />
                <Text className='absolute top-4 font-roboto-black text-lg text-white'>
                  {calculatedData.totalQuantity}
                </Text>
              </View>
              <Text className='font-roboto-black text-base text-left text-white pt-4'>
                {`Total Price: ${calculatedData.totalPrice}`}
              </Text>
            </View>
          </TouchableHighlight>

          {/* Button action */}
          <View className='absolute px-2 bottom-5 left-0 w-full flex flex-row'>
            {bookingStatus === 'Using' && (
              <View className='flex-[1]'>
                <TouchableHighlight
                  disabled={!isEdit}
                  style={{ borderRadius: 6 }}
                  underlayColor={'#fff'}
                  onPress={handlePayOrder}>
                  <View
                    className={`${
                      !isEdit ? 'bg-slate-800' : 'bg-primary1'
                    } h-10 rounded-md flex justify-center items-center`}>
                    <Text className=' font-roboto-black text-lg text-center text-white'>
                      Pay
                    </Text>
                  </View>
                </TouchableHighlight>
              </View>
            )}
            {bookingStatus === 'Confirm' && (
              <View className='flex-[1]'>
                <TouchableHighlight
                  disabled={Object.keys(dataOrder).length === 0}
                  style={{ borderRadius: 6 }}
                  underlayColor={'#fff'}
                  onPress={() => setIsModalOpen(true)}>
                  <View
                    className={`${
                      Object.keys(dataOrder).length === 0
                        ? 'bg-slate-800'
                        : 'bg-primary1'
                    } h-10 rounded-md flex justify-center items-center`}>
                    <Text className=' font-roboto-black text-lg text-center text-white'>
                      {!isEdit ? 'Order' : 'Edit order'}
                    </Text>
                  </View>
                </TouchableHighlight>
              </View>
            )}
          </View>
        </View>
      </View>

      {/* Modal confirm Order */}
      <ModalComponent onClose={handleCloseModal} isOpen={isModalOpen}>
        <ConfirmOrder
          isView={isView}
          isPay={isPay}
          isEdit={isEdit}
          bookingId={id}
          calculatedData={calculatedData}
          bookingStatus={bookingStatus}
          dataOrder={dataOrder}
        />
      </ModalComponent>
    </>
  );
};

export default Reserved;
