import React, { useEffect, useMemo, useState } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { formatTime, generateTimeSlots } from '../../helper';

const TimeButton = React.memo(({ time, isActive, onChange, disableButton }) => {
  return (
    <TouchableOpacity onPress={() => onChange(time)} disabled={disableButton}>
      <View
        className={`w-16 h-10 flex justify-center items-center py-1 px-3 ${
          disableButton
            ? 'bg-colorDark1 border border-colorDark2'
            : isActive
            ? 'bg-primary1'
            : 'bg-colorDark2'
        } rounded-xl`}>
        <Text
          className={`font-roboto-regular text-xs pt-1 ${
            disableButton ? 'text-[#424242]' : 'text-primary2'
          } `}>
          {time}
        </Text>
      </View>
    </TouchableOpacity>
  );
});

const TimeSlotSection = React.memo(({ title, slots, activeTime, onChange, dateSelected }) => (
  <View className='pb-4'>
    <Text className='font-roboto-bold text-lg text-white pb-3'>{title}</Text>
    <View className='flex flex-row flex-wrap justify-start items-center gap-2'>
      {slots.map((time, index) => (
        <View key={`${title.toLowerCase()}-${index}`}>
          <TimeButton time={time} isActive={time === activeTime} onChange={onChange} disableButton={new Date().getTime() > new Date(dateSelected + 'T' + time).getTime()} />
        </View>
      ))}
    </View>
  </View>
));

function TimeSelect({ closeHours, openHours, time, onChange, dataBooking }) {
  const dateSelected = dataBooking[0].data;
  const formattedOpenHours = useMemo(() => formatTime(openHours), [openHours]);
  const formattedCloseHours = useMemo(() => formatTime(closeHours), [closeHours]);

  const timeSlots = useMemo(() => generateTimeSlots(formattedOpenHours, formattedCloseHours), [formattedOpenHours, formattedCloseHours]);
  const breakfastSlots = useMemo(() => timeSlots.filter(
    (time) => parseInt(time.split(':')[0]) < 12
  ), [timeSlots]);
  const lunchSlots = useMemo(() => timeSlots.filter(
    (time) =>
      parseInt(time.split(':')[0]) >= 12 && parseInt(time.split(':')[0]) < 17
  ), [timeSlots]);
  const dinnerSlots = useMemo(() => timeSlots.filter(
    (time) => parseInt(time.split(':')[0]) >= 17
  ), [timeSlots]);

  useEffect(() => {
    if (!time && (breakfastSlots.length > 0 || lunchSlots.length > 0 || dinnerSlots.length > 0)) {
      const allSlots = [...breakfastSlots, ...lunchSlots, ...dinnerSlots];
      const nearestActiveTime = allSlots.find(time => new Date().getTime() <= new Date(dateSelected + 'T' + time).getTime());
      onChange(nearestActiveTime || allSlots[0]);
    }
  }, [time, breakfastSlots, lunchSlots, dinnerSlots, dateSelected]);

  return (
    <View className='px-2'>
      <TimeSlotSection
        title='Breakfast'
        slots={breakfastSlots}
        activeTime={time}
        onChange={onChange}
        dateSelected={dateSelected}
      />
      <TimeSlotSection
        title='Lunch'
        slots={lunchSlots}
        activeTime={time}
        onChange={onChange}
        dateSelected={dateSelected}
      />
      <TimeSlotSection
        title='Dinner'
        slots={dinnerSlots}
        activeTime={time}
        onChange={onChange}
        dateSelected={dateSelected}
      />
    </View>
  );
}

export default TimeSelect;
