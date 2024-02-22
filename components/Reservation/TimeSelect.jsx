import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import { formatTime, generateTimeSlots } from '../../helper';
import { TouchableOpacity } from 'react-native-gesture-handler';

const TimeButton = ({ time, isActive, onChange }) => (
  <TouchableOpacity onPress={() => onChange(time)}>
    <View className={`w-16 h-10 flex justify-center items-center py-1 px-3 ${isActive ? 'bg-primary1' : 'bg-colorDark2'} rounded-xl`}>
      <Text className='font-roboto-regular text-xs pt-1 text-primary2'>
        {time}
      </Text>
    </View>
  </TouchableOpacity>
);

const TimeSlotSection = ({ title, slots, activeTime, onChange }) => (
  <View className='pb-4'>
    <Text className='font-roboto-bold text-lg text-white pb-3'>{title}</Text>
    <View className='flex flex-row flex-wrap justify-start items-center gap-2'>
      {slots.map((time, index) => (
        <View key={`${title.toLowerCase()}-${index}`}>
          <TimeButton time={time} isActive={time === activeTime} onChange={onChange} />
        </View>
      ))}
    </View>
  </View>
);

function TimeSelect({ closeHours, openHours, time, onChange }) {
  const formattedOpenHours = formatTime(openHours);
  const formattedCloseHours = formatTime(closeHours);

  const timeSlots = generateTimeSlots(formattedOpenHours, formattedCloseHours);
  const breakfastSlots = timeSlots.filter(
    (time) => parseInt(time.split(':')[0]) < 12
  );
  const lunchSlots = timeSlots.filter(
    (time) =>
      parseInt(time.split(':')[0]) >= 12 && parseInt(time.split(':')[0]) < 17
  );
  const dinnerSlots = timeSlots.filter(
    (time) => parseInt(time.split(':')[0]) >= 17
  );

  useEffect(()=>{
    if (!time && breakfastSlots && breakfastSlots.length > 0) {
      onChange(breakfastSlots[0]);
    }
  },[])

  return (
    <View className='px-2'>
      <TimeSlotSection title='Breakfast' slots={breakfastSlots} activeTime={time} onChange={onChange} />
      <TimeSlotSection title='Lunch' slots={lunchSlots} activeTime={time} onChange={onChange} />
      <TimeSlotSection title='Dinner' slots={dinnerSlots} activeTime={time} onChange={onChange} />
    </View>
  );
}

export default TimeSelect;
