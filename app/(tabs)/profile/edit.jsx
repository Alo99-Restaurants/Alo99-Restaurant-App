import {
  View,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableHighlight
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import {
  editCustomerInfoByIdService,
  getCustomerInfoByIdService
} from '../../../services/customer.service';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { requestConfirmEmail } from '../../../services/auth.service';

const EditProfile = () => {
  const { userInfo, updateUserInformation } = useContext(AuthContext);
  const [isSendEmail, setIsSendEmail] = useState(false);
  const customerData = userInfo.customerInfo;
  const sexOptions = [
    { label: 'Male', value: 0, disable: true },
    { label: 'Female', value: 1 }
  ];

  const [customerInfo, setCustomerInfo] = useState({
    email: customerData?.email,
    emailConfirmed: customerData?.emailConfirmed,
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

  const handleVerifyEmail = async () => {
    const response = await requestConfirmEmail(customerInfo.email);
    // console.log('response', response?.data?.data);
    if (response?.data?.data) {
      setIsSendEmail(true);
    }
  };

  useEffect(() => {
    if (userInfo.customerId) {
      const fetchCustomerInfo = async () => {
        const response = await getCustomerInfoByIdService(userInfo.customerId);
        const customerData = response?.data?.data;
        if (customerData) {
          setCustomerInfo({
            ...customerInfo,
            emailConfirmed: customerData.emailConfirmed
          });
          await AsyncStorage.setItem(
            'userInfo',
            JSON.stringify({
              ...userInfo,
              customerInfo: {
                ...customerInfo,
                ...customerData
              }
            })
          );
        }
      };
      fetchCustomerInfo();
    }
  }, [userInfo.customerId]);

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
            placeholderTextColor='#6b6b6b'
            value={customerInfo.name}
            onChangeText={(text) =>
              setCustomerInfo({ ...customerInfo, name: text })
            }
          />
        </View>
        <View className='flex flex-row items-center px-2'>
          <View className='grow bg-colorDark2 h-10 flex justify-center m-2 ml-0 p-2 rounded-lg'>
            <TextInput
              className='text-white'
              placeholder='Email'
              placeholderTextColor='#6b6b6b'
              value={customerInfo.email}
              onChangeText={(text) =>
                setCustomerInfo({ ...customerInfo, email: text })
              }
            />
          </View>
          {!isSendEmail ? (
            <TouchableHighlight
              disabled={customerInfo.emailConfirmed}
              onPress={handleVerifyEmail}
              style={{ borderRadius: 6 }}
              underlayColor={'#fff'}>
              {!customerInfo.emailConfirmed ? (
                <View className='bg-primary1 h-10 px-2 rounded-md flex justify-center items-center'>
                  <Text className='font-roboto-black text-sm text-center text-white'>
                    Verify email
                  </Text>
                </View>
              ) : (
                <View className='bg-green-500 h-10 px-2 rounded-md flex justify-center items-center'>
                  <Text className='font-roboto-black text-sm text-center text-white'>
                    Verified
                  </Text>
                </View>
              )}
            </TouchableHighlight>
          ) : (
            <View className='bg-colorDark2 h-10 px-2 rounded-md flex justify-center items-center'>
              <Text className='font-roboto-black text-sm text-center text-white'>
                Sent email!
              </Text>
            </View>
          )}
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
            placeholderTextColor='#6b6b6b'
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
            placeholderTextColor='#6b6b6b'
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
                Save
              </Text>
            </View>
          </TouchableHighlight>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default EditProfile;
