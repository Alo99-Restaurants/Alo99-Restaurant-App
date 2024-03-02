import {
  View,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import React, { useContext, useState } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { editCustomerInfoByIdService } from '../../../services/customer.service';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
const EditProfile = () => {
  const { userInfo, updateUserInformation } = useContext(AuthContext);
  const customerData = userInfo.customerInfo;
  const sexOptions = [
    { label: 'Male', value: 0, disable: true },
    { label: 'Female', value: 1 }
  ];

  const [customerInfo, setCustomerInfo] = useState({
    email: customerData?.email,
    name: customerData?.name,
    gender: customerData?.gender,
    phoneNumber: customerData?.phoneNumber,
    dateOfBirth: customerData?.dateOfBirth,
    picture: customerData?.picture
  });

  const handleEditCustomerInfo = async () => {
    try {
      const response = await editCustomerInfoByIdService(
        customerData.id,
        customerInfo
      );

      if (response?.data?.data) {
        const updatedUserInfo = {
          ...userInfo,
          customerInfo: {
            ...userInfo.customerInfo,
            email: customerInfo.email,
            name: customerInfo.name,
            gender: customerInfo.gender,
            phoneNumber: customerInfo.phoneNumber,
            dateOfBirth: customerInfo.dateOfBirth,
            picture: customerInfo.picture
          }
        };

        await AsyncStorage.setItem('userInfo', JSON.stringify(updatedUserInfo));
        updateUserInformation(true);
        router.back();
      }

      // Update new data to local storage and user info state
    } catch (error) {}
  };

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
          <RNPickerSelect
            style={{
              inputIOS: { color: 'white' },
              inputAndroid: { color: 'white' }
            }}
            placeholder={{
              label: 'Gender',
              value: ''
            }}
            value={customerInfo.gender}
            onValueChange={(value) =>
              setCustomerInfo({ ...customerInfo, gender: value })
            }
            items={sexOptions}
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
        <View className='w-full mt-2'>
          <TouchableHighlight onPress={handleEditCustomerInfo}>
            <View className=' bg-primary1 h-10 rounded-md flex justify-center items-center mx-2'>
              <Text className=' font-roboto-black text-md text-center text-white'>
                Edit Profile
              </Text>
            </View>
          </TouchableHighlight>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default EditProfile;
