import { View, Text, Image } from 'react-native';
import React, { useCallback, useContext, useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { convertPrice } from '../../helper';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { createBookingOrder } from '../../redux/bookingSlice';

const ConfirmOrder = ({ isEdit, dataOrder, calculatedData, bookingId }) => {
  const { isAddNewBookingOrderSuccess } = useSelector((state) => state.booking);
  const auth = useContext(AuthContext);
  const dispatch = useDispatch();
  const isDisabledBooking = !auth.userInfo.customerInfo?.phoneNumber || !auth.userInfo.customerInfo?.email;

  const dataOrderToPayload = useCallback(() => {
    return Object.keys(dataOrder).map((key) => ({
      menuId: dataOrder[key].id,
      quantity: dataOrder[key].quantity,
      price: dataOrder[key].price
    }));
  }, [dataOrder]);

  const dataOrderEditToPayload = useCallback(() => {
    return Object.keys(dataOrder).map((key) => ({
      id: dataOrder[key].idEdit,
      menuId: dataOrder[key].idEdit ? undefined : dataOrder[key].id,
      quantity: dataOrder[key].quantity,
      price: dataOrder[key].price,
      isRemove: dataOrder[key].quantity === 0 ? true : undefined
    }));
  }, [dataOrder]);

  const handleBookingOrder = () => {
    dispatch(
      createBookingOrder({
        bookingId,
        menuRequests: isEdit ? dataOrderEditToPayload() : dataOrderToPayload()
      })
    );
  };

  if (isAddNewBookingOrderSuccess)
    return (
      <View className='flex-[1] h-[400px] flex-row justify-between items-center pb-20'>
        <Text className='flex-[1] pb-1 font-roboto-black text-2xl text-center text-colorDark2'>
          {isEdit
            ? 'Đã cập nhật thông tin món ăn!!'
            : 'Đặt món ăn thành công!!'}
        </Text>
      </View>
    );

  return (
    <View className='pb-10'>
      <View className='flex mb-4'>
        <Text className='text-lg font-roboto-black pb-2'>
          {auth.userInfo.customerInfo?.name}
        </Text>
        <View className='flex-row flex-wrap'>
          <Text className='text-md font-roboto-italic pr-5'>
            Phone: {auth.userInfo.customerInfo?.phoneNumber}
          </Text>
          <Text className='text-md font-roboto-italic'>
            Email: {auth.userInfo.customerInfo?.email}
          </Text>
        </View>
      </View>
      <Text className='text-lg font-roboto-medium mb-4'>List order</Text>
      <View className='mb-4' key='order-list'>
        {Object.keys(dataOrder).map((key, index) => {
          const isDeleted =
            dataOrder[key].quantity === 0
              ? 'line-through text-gray-400'
              : 'text-colorDark1';
          return (
            <View
              key={key + index}
              className='flex flex-row items-center gap-2 pb-2'>
              <Image
                source={{ uri: dataOrder[key].menuUrl }}
                className='w-10 h-10 rounded-md'
              />
              <Text className={`${isDeleted} text-base text-left`}>
                {`${dataOrder[key].quantity} x`}
              </Text>
              <Text
                key={key}
                className={`${isDeleted} text-base font-roboto-bold text-left`}>
                {`${dataOrder[key].name}`}
              </Text>
              <Text
                key={key + 'price'}
                className={`${isDeleted} text-base text-left`}>
                {`= ${convertPrice(
                  dataOrder[key].quantity * dataOrder[key].price
                )}`}
              </Text>
            </View>
          );
        })}
      </View>
      <View className='mb-4'>
        <Text className='text-lg font-roboto-medium text-colorDark1'>
          {`Total Price: ${calculatedData.totalPrice}`}
        </Text>
      </View>
      <TouchableHighlight
        disabled={isDisabledBooking}
        onPress={handleBookingOrder}
        style={{ borderRadius: 6, paddingTop: 10 }}
        underlayColor={'#fff'}>
        <View
          className={`${
            !isDisabledBooking ? 'bg-primary1' : 'bg-slate-400'
          }  h-10 rounded-md flex justify-center items-center`}>
          <Text className='font-roboto-black text-lg text-center text-white'>
            {isDisabledBooking
              ? 'Please update your phone & email'
              : !isEdit && !isDisabledBooking
              ? 'Order'
              : 'Edit Order'}
          </Text>
        </View>
      </TouchableHighlight>
    </View>
  );
};

export default ConfirmOrder;
