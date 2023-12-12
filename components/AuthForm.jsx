import { View, Text, TextInput, Button, Image } from 'react-native';
import React from 'react';
import { useState } from 'react';
import {
  TouchableHighlight,
  TouchableOpacity
} from 'react-native-gesture-handler';
import Alo99Logo from '../assets/Alo99.png';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const AuthForm = () => {
  const [email, setEmail] = useState('admin');
  const [password, setPassword] = useState('admin');

  const auth = useContext(AuthContext);

  const handleLogin = () => {
    auth.login(email, password);
  };

  console.log('auth context: ', auth.userInfo);

  // const { isLoading, login } = useContext(AuthContext);
  return (
    <View className='flex-[1] px-4'>
      <Text>Sign-In Form</Text>
      <View className='flex justify-between items-center'>
        <Image source={Alo99Logo} className='h-48 w-96' />
      </View>

      <TextInput
        className='bg-colorDark2 border border-primary1 text-white text-sm rounded-lg focus:ring-primary1 focus:border-primary1 block w-full p-2.5 my-2'
        value={email}
        placeholder='Enter email'
        placeholderTextColor='#fff'
        onChangeText={(text) => setEmail(text)}
      />

      <TextInput
        className='bg-colorDark2 border border-primary1 text-white text-sm rounded-lg focus:ring-primary1 focus:border-primary1 block w-full p-2.5 my-2'
        value={password}
        placeholder='Enter password'
        placeholderTextColor='#fff'
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
      />

      {/* <Button
        title='Login'
        onPress={() => {
          console.log(email, password);
        }}
      /> */}

      <View className='w-full my-2'>
        <TouchableHighlight
          style={{ borderRadius: 6 }}
          underlayColor={'#fff'}
          onPress={handleLogin}>
          <View className=' bg-primary1 h-10 rounded-md flex justify-center items-center'>
            <Text className=' font-roboto-black text-md text-center text-white'>
              Login
            </Text>
          </View>
        </TouchableHighlight>
      </View>

      <View style={{ flexDirection: 'row', marginTop: 20 }}>
        <Text>Don't have an account? </Text>
        <TouchableOpacity>
          <Text>Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AuthForm;
