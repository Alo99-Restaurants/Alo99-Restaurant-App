import React, { useState } from 'react';
import { Image, SafeAreaView, Text, TextInput, View } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';
import Alo99Logo from '../../../assets/Alo99.png';
import { registerService } from '../../../services/auth.service';
import { router } from 'expo-router';

const RegisterPage = () => {
  const [userData, setUserData] = useState({
    username: null,
    password: null,
    email: null,
    phoneNumber: null,
    name: null
  });

  const [errorMessage, setErrorMessage] = useState('');

  const onChangeText = (key, value) => {
    setUserData({ ...userData, [key]: value });
  };

  const validateFields = async () => {
    if (!userData.name) {
      setErrorMessage('Full name is required');
      return;
    }

    if (
      !userData.username ||
      !userData.password ||
      userData.username === '' ||
      userData.password === ''
    ) {
      setErrorMessage(
        (userData.username === '' ? 'username' : 'password') + ' is required!!'
      );
      return;
    }

    if (userData.username.length < 6) {
      setErrorMessage('Username must be at least 6 characters long');
      return;
    }
    if (userData.password.length < 8) {
      setErrorMessage('Password must be at least 8 characters long');
      return;
    }

    if (!userData.phoneNumber) {
      setErrorMessage('Phone Number is required');
      return;
    }

    if (!userData.email || !validateEmail(userData.email)) {
      setErrorMessage('Email is required and must be in a valid format');
      return;
    }

    setErrorMessage(null);
    console.log('userData', userData);

    const response = await registerService({
      ...userData,
      role: 'Customer',
      clientUrl: ''
    });

    if (response.data?.data) {
      router.back();
    };
  };

  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  return (
    <SafeAreaView className='flex-[1] bg-colorDark1 pt-[25px]'>
      <View className='px-4 pt-2'>
        <View className='flex justify-between items-center'>
          <Image
            source={Alo99Logo}
            style={{ width: 200, height: 130, marginBottom: 20 }}
          />
        </View>

        {errorMessage && (
          <Text className='error text-red-600 text-md text-center rounded-lg block w-full my-2'>
            {errorMessage}
          </Text>
        )}

        <TextInput
          className='bg-colorDark2 border border-primary1 text-white text-sm rounded-lg focus:ring-primary1 focus:border-primary1 block w-full p-2.5 my-2'
          value={userData.name}
          placeholder='Enter full name'
          placeholderTextColor='#fff'
          onChangeText={(text) => onChangeText('name', text)}
        />

        <TextInput
          className='bg-colorDark2 border border-primary1 text-white text-sm rounded-lg focus:ring-primary1 focus:border-primary1 block w-full p-2.5 my-2'
          value={userData.username}
          placeholder='Enter username'
          placeholderTextColor='#fff'
          onChangeText={(text) => onChangeText('username', text)}
        />

        <TextInput
          className='bg-colorDark2 border border-primary1 text-white text-sm rounded-lg focus:ring-primary1 focus:border-primary1 block w-full p-2.5 my-2'
          value={userData.password}
          placeholder='Enter password'
          placeholderTextColor='#fff'
          secureTextEntry
          onChangeText={(text) => onChangeText('password', text)}
        />

        <TextInput
          className='bg-colorDark2 border border-primary1 text-white text-sm rounded-lg focus:ring-primary1 focus:border-primary1 block w-full p-2.5 my-2'
          value={userData.email}
          placeholder='Enter email'
          placeholderTextColor='#fff'
          onChangeText={(text) => onChangeText('email', text)}
        />

        <TextInput
          className='bg-colorDark2 border border-primary1 text-white text-sm rounded-lg focus:ring-primary1 focus:border-primary1 block w-full p-2.5 my-2'
          value={userData.phoneNumber}
          placeholder='Enter phone number'
          placeholderTextColor='#fff'
          onChangeText={(text) => onChangeText('phoneNumber', text)}
          keyboardType='numeric'
        />

        <View className='w-full my-2'>
          <TouchableHighlight
            onPress={validateFields}
            style={{ borderRadius: 6 }}
            underlayColor={'#fff'}>
            <View className=' bg-primary1 h-10 rounded-md flex justify-center items-center'>
              <Text className='font-roboto-black text-md text-center text-white'>
                Register
              </Text>
            </View>
          </TouchableHighlight>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default RegisterPage;
