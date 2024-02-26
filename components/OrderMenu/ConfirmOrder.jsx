import { View, Text } from 'react-native'
import React, { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext';
import { convertPrice } from '../../helper';

const ConfirmOrder = ({ dataOrder, calculatedData }) => {
  const auth = useContext(AuthContext);
  console.log('auth', auth.userInfo);

  return (
    <View className='h-[400px]'>
      <View className='flex flex-row items-center gap-4 mb-4'>
        <Text className='text-lg font-roboto-black'>{auth.userInfo.name}</Text>
        <Text className='text-md font-roboto-italic'>Phone: 0989898978</Text>
      </View>
      <View className='mb-4'>
        <Text className='text-lg font-roboto-medium'>List order</Text>
        {Object.keys(dataOrder).map((key) => (
          <Text key={key} className='text-base text-left text-colorDark1'>
            {`- ${dataOrder[key].name} x ${
              dataOrder[key].quantity
            } = ${convertPrice(
              dataOrder[key].quantity * dataOrder[key].price
            )}`}
          </Text>
        ))}
      </View>
      <View className='mb-4'>
        <Text className='text-lg font-roboto-medium text-colorDark1'>
          {`Total Price: ${calculatedData.totalPrice}`}
        </Text>
      </View>
    </View>
  );
};

export default ConfirmOrder