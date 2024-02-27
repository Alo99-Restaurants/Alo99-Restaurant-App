import { View, Text, FlatList, RefreshControl, Pressable } from 'react-native';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import ReservedItem from './ReservedItem';
import { AuthContext } from '../../context/AuthContext';
import { getBookingService } from '../../services/restaurant.booking.service';
import { useSelector } from 'react-redux';
import ModalComponent from '../ModalComponent';

const ReservedList = ({ bookingStatus, restaurants }) => {
  const auth = useContext(AuthContext);
  const { isAddNewBookingSuccess } = useSelector((state) => state.booking);
  const [listBooking, setListBooking] = useState([]);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fetchReservedList = async () => {
    try {
      setIsLoading(true);
      const payload = {
        UserId: auth?.userInfo?.id,
        BookingStatus: bookingStatus
      };
      const response = await getBookingService(payload);
      setListBooking(response.data.items ? response.data.items.reverse() : []);
    } catch (error) {}
    finally {
      setIsLoading(false);
    }
  };

  const handleCloseModal = () => {
    setIsOpenModal(false);
  };

  useEffect(() => {
    if (auth?.userInfo?.id) fetchReservedList();
  }, [bookingStatus, isAddNewBookingSuccess]);

  return (
    <View className='flex-[1] bg-colorDark1'>
      <ModalComponent onClose={handleCloseModal} isOpen={isOpenModal}>
        <View className='h-[600px] bg-white' />
      </ModalComponent>
      <FlatList
        data={listBooking}
        initialNumToRender={6}
        renderItem={({ item }) => (
          <ReservedItem
            data={item}
            restaurants={restaurants}
            onCancelClick={setIsOpenModal}
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

