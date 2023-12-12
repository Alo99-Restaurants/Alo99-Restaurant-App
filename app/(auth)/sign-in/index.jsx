import { View, Text } from 'react-native';
import React from 'react';
import AuthForm from '../../../components/AuthForm';

const SignIn = () => {
  return (
    <View className='flex-[1]  bg-colorDark1'>
      <AuthForm />
    </View>
  );
};

export default SignIn;
