import React, { useCallback, useMemo, useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import {
  AntDesign,
  Fontisto,
  Ionicons,
  MaterialCommunityIcons
} from '@expo/vector-icons';
import ReservationStep from './ReservationStep';
import CalendarScreen from './Calendar';
import TableBooking from './TableBooking';
import { TouchableHighlight } from 'react-native-gesture-handler';
import moment from 'moment';
import TimeSelect from './TimeSelect';
import Guests from './Guests';
import ModalComponent from '../ModalComponent';
import ConfirmBooking from './ConfirmBooking';
import { useDispatch, useSelector } from 'react-redux';
import { clearAddNewBookingStatus } from '../../redux/bookingSlice';
import { router } from 'expo-router';

const menuStep = [
  {
    icon: <Fontisto name='date' size={24} color='white' />,
    label: 'Day'
  },
  {
    icon: <AntDesign name='clockcircleo' size={24} color='white' />,
    label: 'Time'
  },
  {
    icon: <Ionicons name='people-sharp' size={24} color='white' />,
    label: 'Guests'
  },
  {
    icon: <MaterialCommunityIcons name='table-chair' size={24} color='white' />,
    label: 'Table'
  }
];

const Reservation = ({ data, restaurant }) => {
  const dispatch = useDispatch();
  const { isAddNewBookingSuccess } = useSelector(
    (state) => state.booking
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [historyStep, setHistoryStep] = useState([0]);
  const [dataBooking, setDataBooking] = useState([]);

  // State of each step
  const [day, setDay] = useState(moment().format('YYYY-MM-DD'));
  const [time, setTime] = useState();
  const [guests, setGuests] = useState({ adults: 0, children: 0 });
  const [selectedTableIds, setSelectedTableIds] = useState([]);

  const updateDataBooking = useCallback((step, data) => {
    setDataBooking((prevDataBooking) => {
      const newDataBooking = prevDataBooking.map((item) =>
        item.step === step ? { step, data } : item
      );
      if (!prevDataBooking.some((item) => item.step === step)) {
        newDataBooking.push({ step, data });
      }
      return newDataBooking;
    });
  }, []);

  const renderMenu = useMemo(() => {
    let component;
    switch (currentStep) {
      case 0:
        component = <CalendarScreen day={day} onChange={setDay} />;
        break;
      case 1:
        component = (
          <TimeSelect
            time={time}
            onChange={setTime}
            openHours={data.openHours}
            closeHours={data.closeHours}
          />
        );
        break;
      case 2:
        // Add your component for the third step
        component = <Guests guests={guests} onChange={setGuests} />; // Placeholder for the third step component
        break;
      case 3:
        component = (
          <TableBooking
            restaurant={restaurant}
            dataBooking={dataBooking}
            tableIds={selectedTableIds}
            onChange={setSelectedTableIds}
            restaurantFloors={data?.restaurantFloors}
          />
        );
        break;
      default:
        component = null;
    }
    return (
      <>
        <View>{component}</View>
      </>
    );
  }, [
    currentStep,
    day,
    time,
    guests,
    data.openHours,
    data.closeHours,
    data.restaurantFloors
  ]);

  const handleClickNextButton = () => {
    if (currentStep < menuStep.length - 1) {
      setCurrentStep((prevCurrentStep) => {
        const newStep = prevCurrentStep + 1;

        if (!historyStep.includes(newStep)) {
          setHistoryStep((prevHistoryStep) => [...prevHistoryStep, newStep]);
        }

        saveData(prevCurrentStep);

        return newStep;
      });
    }
  };

  const handleReservationStepPress = (index) => {
    if (historyStep.includes(index) || currentStep + 1 === index) {
      setHistoryStep((prevHistoryStep) => prevHistoryStep.concat(index));
      setCurrentStep(index);
      saveData(currentStep);
    }
  };

  const saveData = (step) => {
    if (step === 0) updateDataBooking(step, day);
    if (step === 1) updateDataBooking(step, time);
    if (step === 2) updateDataBooking(step, guests);
    if (step === 3) updateDataBooking(step, selectedTableIds);
  };

  useEffect(() => {
    if (day) {
      updateDataBooking(currentStep, day);
    }
  }, [day]);

  useEffect(() => {
    if (time) {
      updateDataBooking(currentStep, time);
    }
  }, [time]);

  useEffect(() => {
    if (guests.adults + guests.children !== 0) {
      updateDataBooking(currentStep, selectedTableIds);
    }
  }, [guests]);

  useEffect(() => {
    if (selectedTableIds) {
      updateDataBooking(currentStep, selectedTableIds);
    }
  }, [selectedTableIds]);

  const isLastStep = useMemo(
    () => currentStep === menuStep.length - 1,
    [currentStep, menuStep.length]
  );

  const handleConfirmBooking = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    if (isAddNewBookingSuccess) router.back();
    dispatch(clearAddNewBookingStatus());
  };

  return (
    <View className='flex-[1]'>
      <ModalComponent
        height={350}
        onClose={handleCloseModal}
        isOpen={isModalOpen}>
        <ConfirmBooking restaurant={restaurant} bookingData={dataBooking} />
      </ModalComponent>
      <View className='flex-[1.5] reservation-step flex flex-row justify-around mt-4'>
        {menuStep.map((menu, index) => (
          <ReservationStep
            key={index}
            isActive={currentStep === index}
            classNameLabel={'mt-1'}
            icon={menu.icon}
            label={menu.label}
            onPress={() => handleReservationStepPress(index)}
          />
        ))}
      </View>
      <ScrollView className='flex-[8.5] mb-16 reservation-detail px-2 mt-2'>
        {renderMenu}
      </ScrollView>
      <View className='absolute px-2 bottom-5 left-0 w-full'>
        {isLastStep ? (
          <TouchableHighlight
            onPress={handleConfirmBooking}
            style={{ borderRadius: 6 }}
            underlayColor={'#fff'}>
            <View className=' bg-primary1 h-10 rounded-md flex justify-center items-center'>
              <Text className=' font-roboto-black text-md text-center text-white'>
                Book Table
              </Text>
            </View>
          </TouchableHighlight>
        ) : (
          <TouchableHighlight
            style={{ borderRadius: 6 }}
            underlayColor={'#fff'}
            onPress={handleClickNextButton}>
            <View className=' bg-primary1 h-10 rounded-md flex justify-center items-center'>
              <Text className=' font-roboto-black text-md text-center text-white'>
                Next
              </Text>
            </View>
          </TouchableHighlight>
        )}
      </View>
    </View>
  );
};

export default Reservation;
