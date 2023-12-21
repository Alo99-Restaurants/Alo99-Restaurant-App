import { View, Text, Image } from 'react-native';
import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';

const ReservationStep = ({
  className,
  classNameLabel,
  label,
  icon,
  isActive,
  onPress
}) => {
  return (
    <TouchableOpacity onPress={() => onPress(label)}>
      <View
        className={`w-20 h-20 justify-center items-center py-1 px-3 ${
          isActive ? 'bg-primary1' : 'bg-colorDark2'
        }  rounded-xl ${className}`}>
        {icon}
        <Text
          className={`font-roboto-regular text-xs pt-1 text-primary2  ${classNameLabel}`}>
          {label}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default ReservationStep;
