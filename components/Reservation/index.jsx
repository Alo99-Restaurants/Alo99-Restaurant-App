import React, { useCallback, useMemo, useEffect, useState } from 'react';
import { View, Text } from 'react-native';
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

const Reservation = ({ data }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [historyStep, setHistoryStep] = useState([0]);
  const [dataBooking, setDataBooking] = useState([]);

  console.log('dataBooking', dataBooking);

  // State of each step
  const [day, setDay] = useState(moment().format('YYYY-MM-DD'));
  const [time, setTime] = useState();

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
    console.log('render');
    return (
      <>
        <View style={{ display: currentStep === 0 ? 'flex' : 'none' }}>
          <CalendarScreen day={day} onChange={setDay} />
        </View>
        <View style={{ display: currentStep === 1 ? 'flex' : 'none' }}>
          <TimeSelect
            time={time}
            onChange={setTime}
            openHours={data.openHours}
            closeHours={data.closeHours}
          />
        </View>
        <View style={{ display: currentStep === 2 ? 'flex' : 'none' }}>
          {/* Add your component for the third step */}
        </View>
        <View style={{ display: currentStep === 3 ? 'flex' : 'none' }}>
          <TableBooking restaurantFloors={data?.restaurantFloors} />
        </View>
      </>
    );
  }, [
    currentStep,
    day,
    time,
    data.openHours,
    data.closeHours,
    data.restaurantFloors
  ]);

  const handleNext = () => {
    if (currentStep < menuStep.length - 1) {
      setCurrentStep((prevCurrentStep) => {
        const newStep = prevCurrentStep + 1;

        // Check if newStep already exists in historyStep
        if (!historyStep.includes(newStep)) {
          setHistoryStep((prevHistoryStep) => [...prevHistoryStep, newStep]);
        }

        // Save data of the current step
        if (prevCurrentStep == 0) updateDataBooking(prevCurrentStep, day);
        if (prevCurrentStep == 1) updateDataBooking(prevCurrentStep, time);

        return newStep;
      });
    }
  };

  useEffect(() => {
    console.log('day');
    if (day) {
      updateDataBooking(currentStep, day);
    }
  }, [day]);

  useEffect(() => {
    console.log('time');

    if (time) {
      updateDataBooking(currentStep, time);
    }
  }, [time]);

  const isLastStep = useMemo(
    () => currentStep === menuStep.length - 1,
    [currentStep, menuStep.length]
  );
  console.log('------------------');

  return (
    <View className='flex-[1]'>
      <View className='flex-[1.5] reservation-step flex flex-row justify-around mt-4'>
        {menuStep.map((menu, index) => (
          <ReservationStep
            key={index}
            isActive={currentStep === index}
            classNameLabel={'mt-1'}
            icon={menu.icon}
            label={menu.label}
            onPress={() => {
              if (historyStep.includes(index) || currentStep + 1 === index) {
                setHistoryStep((prevHistoryStep) =>
                  prevHistoryStep.concat(index)
                );
                setCurrentStep(index);
              }
            }}
          />
        ))}
      </View>
      <View className='flex-[8.5] reservation-detail px-2 mt-2'>
        {renderMenu}
      </View>
      <View className='absolute px-2 bottom-5 left-0 w-full'>
        {isLastStep ? (
          <TouchableHighlight
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
            onPress={handleNext}>
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
