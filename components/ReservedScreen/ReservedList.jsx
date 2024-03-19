import {
  View,
  Text,
  FlatList,
  RefreshControl,
  Pressable,
  TouchableHighlight
} from 'react-native';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import ReservedItem from './ReservedItem';
import { AuthContext } from '../../context/AuthContext';
import { getBookingService, updateStatusBookingService } from '../../services/restaurant.booking.service';
import { useSelector } from 'react-redux';
import ModalComponent from '../ModalComponent';

const ReservedList = ({ bookingStatus, restaurants }) => {
  const auth = useContext(AuthContext);
  const { isAddNewBookingSuccess } = useSelector((state) => state.booking);
  const [listBooking, setListBooking] = useState([]);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeBookingId, setActiveBookingId] = useState({})
  const isHistoryStatus = bookingStatus.includes('Cancelled');

  const fetchReservedList = useCallback(async () => {
    try {
      setIsLoading(true);
      const payload = {
        UserId: auth?.userInfo?.id,
        BookingStatus: bookingStatus,
        TotalRows: 50
      };
      const response = await getBookingService(payload);
      let data = response.data.items;
      const today = new Date();

      if (isHistoryStatus) {
        data = data.filter((item) => {
          if (item.bookingStatusId === 'Completed') {
            const bookingDate = new Date(item.bookingDate);
            const bookingDateWithoutTime = new Date(bookingDate.getFullYear(), bookingDate.getMonth(), bookingDate.getDate());
            const todayWithoutTime = new Date(today.getFullYear(), today.getMonth(), today.getDate());
            return bookingDateWithoutTime < todayWithoutTime;
          }
          return true;
        });
      } else {
        data = data.filter((item) => {
          if (item.bookingStatusId === 'Completed') {
            const bookingDate = new Date(item.bookingDate);
            const bookingDateWithoutTime = new Date(bookingDate.getFullYear(), bookingDate.getMonth(), bookingDate.getDate());
            const todayWithoutTime = new Date(today.getFullYear(), today.getMonth(), today.getDate());
            return bookingDateWithoutTime >= todayWithoutTime;
          }
          return true;
        });
      }

      setListBooking(data ? data.reverse() : []);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  }, [auth, bookingStatus]);

  const handleCloseModal = () => {
    setIsOpenModal(false);
    setActiveBookingId({});
  };

  useEffect(() => {
    if (auth?.userInfo?.id) fetchReservedList();
  }, [bookingStatus, isAddNewBookingSuccess]);

  const handleCancelBooking = (bookingId) => {
    setIsOpenModal(true);
    setActiveBookingId(bookingId);
  }

  const handleUpdateBookingService = async (newStatus) => {
    const payload = {
      bookingIds: [activeBookingId],
      bookingStatus: newStatus
    };
    try {
      await updateStatusBookingService(payload);
      fetchReservedList();
      setIsOpenModal(false);
    } catch (error) {
      console.log('Error Update Booking Status Service', error);
    }
  };

  return (
    <View className='flex-[1] bg-colorDark1'>
      <ModalComponent onClose={handleCloseModal} isOpen={isOpenModal}>
        <View className='flex justify-center items-center pb-10'>
          <View className='w-full'>
            <Text className='pb-1 font-roboto-black text-lg text-center text-colorDark2'>
              Do you want to cancel this booking?
            </Text>
          </View>
          <View className='w-full'>
            <TouchableHighlight
              onPress={() => handleUpdateBookingService('Cancelled')}
              style={{ borderRadius: 6, paddingTop: 10 }}
              underlayColor={'#fff'}>
              <View
                className={`bg-primary1 h-10 rounded-md flex justify-center items-center`}>
                <Text className='font-roboto-black text-lg text-center text-white'>
                  Confirm
                </Text>
              </View>
            </TouchableHighlight>
          </View>
        </View>
      </ModalComponent>
      <FlatList
        data={listBooking}
        initialNumToRender={5}
        renderItem={({ item }) => (
          <ReservedItem
            isHistoryStatus={isHistoryStatus}
            data={item}
            restaurants={restaurants}
            onCancelClick={handleCancelBooking}
          />
        )}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            color='white'
            tintColor={'white'}
            onRefresh={fetchReservedList}
          />
        }
      />
    </View>
  );
};

export default ReservedList;
