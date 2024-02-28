import { View, Text, TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native';
import React, { useContext, useState } from 'react';
import { AuthContext } from '../../../context/AuthContext';

const EditProfile = () => {
  const { userInfo } = useContext(AuthContext);
  const customerData = userInfo.customerInfo;

  const [customerInfo, setCustomerInfo] = useState({
    email: customerData?.email,
    name: customerData?.name,
    gender: customerData?.gender,
    phoneNumber: customerData?.phoneNumber,
    dateOfBirth: customerData?.dateOfBirth,
    picture: customerData?.picture
  });

  console.log('customerInfo', customerInfo);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View className='flex-[1] bg-colorDark1'>
        <View className='flex items-center justify-center mx-5 my-2'>
          <View className='h-20 w-20 bg-gray-400 rounded-full flex items-center justify-center'>
            <Text className='text-white text-2xl'>
              {customerInfo.name ? customerInfo.name[0] : 'U'}
            </Text>
          </View>
        </View>
        <View className='bg-colorDark2 h-10 flex justify-center m-2 p-2 rounded-lg'>
          <TextInput
            className='text-white'
            placeholder='Full name'
            placeholderTextColor={'gray'}
            value={customerInfo.name}
            onChangeText={(text) =>
              setCustomerInfo({ ...customerInfo, name: text })
            }
          />
        </View>
        <View className='bg-colorDark2 h-10 flex justify-center m-2 p-2 rounded-lg'>
          <TextInput
            className='text-white'
            placeholder='Email'
            placeholderTextColor={'gray'}
            value={customerInfo.email}
            onChangeText={(text) =>
              setCustomerInfo({ ...customerInfo, email: text })
            }
          />
        </View>
        <View className='bg-colorDark2 h-10 flex justify-center m-2 p-2 rounded-lg'>
          <TextInput
            className='text-white'
            placeholder='Gender'
            placeholderTextColor={'gray'}
            value={customerInfo.gender}
            onChangeText={(text) =>
              setCustomerInfo({ ...customerInfo, gender: text })
            }
          />
        </View>
        <View className='bg-colorDark2 h-10 flex justify-center m-2 p-2 rounded-lg'>
          <TextInput
            className='text-white'
            placeholder='Phone Number'
            placeholderTextColor={'gray'}
            value={customerInfo.phoneNumber}
            onChangeText={(text) =>
              setCustomerInfo({ ...customerInfo, phoneNumber: text })
            }
          />
        </View>
        <View className='bg-colorDark2 h-10 flex justify-center m-2 p-2 rounded-lg'>
          <TextInput
            className='text-white'
            placeholder='Date Of Birth'
            placeholderTextColor={'gray'}
            value={customerInfo.dateOfBirth}
            onChangeText={(text) =>
              setCustomerInfo({ ...customerInfo, dateOfBirth: text })
            }
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default EditProfile;
