import { View, Text, TextInput, Button, Image } from 'react-native';
import React, { useEffect } from 'react';
import { useState } from 'react';
import {
  TouchableHighlight,
  TouchableOpacity
} from 'react-native-gesture-handler';
import Alo99Logo from '../../assets/Alo99.png';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthForm = () => {
  const [isShowModal, setIsShowModal] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const auth = useContext(AuthContext);

  useEffect(() => {
    const checkUserInfo = async () => {
      try {
        const userInfo = await AsyncStorage.getItem('userInfo');
        if (auth.userInfo.token && userInfo) {
          router.replace('(tabs)/(home)');
        }
      } catch (error) {
        console.log('Error while checking user info:', error);
      }
    };
    checkUserInfo();
  });

  useEffect(() => {
    if (auth.loginFailed) {
      setIsShowModal(true);
    }
  }, [auth.loginFailed]);

  const handleLogin = () => {
    auth.login(email, password);
  };

  return (
    <View className='flex-[1] px-4'>
      <View className='flex justify-between items-center'>
        <Image
          source={Alo99Logo}
          style={{ width: 200, height: 130, marginBottom: 20 }}
        />
      </View>

      {isShowModal && (
        <View className=''>
          <Text className='text-center text-md text-red-600 font-roboto-bold'>{`Incorrect account, please try again`}</Text>
        </View>
      )}

      <TextInput
        className='bg-colorDark2 border border-primary1 text-white text-sm rounded-lg focus:ring-primary1 focus:border-primary1 block w-full p-2.5 my-2'
        value={email}
        placeholder='Enter username'
        placeholderTextColor='#6b6b6b'
        onChangeText={(text) => setEmail(text)}
      />

      <TextInput
        className='bg-colorDark2 border border-primary1 text-white text-sm rounded-lg focus:ring-primary1 focus:border-primary1 block w-full p-2.5 my-2'
        value={password}
        placeholder='Enter password'
        placeholderTextColor='#6b6b6b'
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
      />

      <View className='w-full my-2'>
        <TouchableHighlight
          style={{ borderRadius: 6 }}
          underlayColor={'#fff'}
          onPress={handleLogin}>
          <View className=' bg-primary1 h-10 rounded-md flex justify-center items-center'>
            <Text className='font-roboto-black text-md text-center text-white'>
              Login
            </Text>
          </View>
        </TouchableHighlight>
      </View>

      <View className='mt-5 flex flex-row justify-center'>
        <Text className='font-roboto-regular text-md text-white'>
          {`Don't have an account?  `}
        </Text>
        <TouchableOpacity onPress={() => router.push('/(auth)/sign-up')}>
          <Text className='font-roboto-regular text-md text-center text-primary1'>
            Register
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AuthForm;
