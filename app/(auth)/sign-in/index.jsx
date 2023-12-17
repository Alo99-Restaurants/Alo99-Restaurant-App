import { View, Text, SafeAreaView } from 'react-native';
import React from 'react';
import AuthForm from '../../../components/AuthForm';

const SignIn = () => {
  return (
    <SafeAreaView className='flex-[1] flex flex-row items-center justify-center bg-colorDark1 pt-[25px]'>
      <AuthForm />
    </SafeAreaView>
  );
};

export default SignIn;
