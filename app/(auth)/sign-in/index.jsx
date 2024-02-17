import React from 'react';
import { SafeAreaView, View } from 'react-native';
import AuthForm from '../../../components/Auth/AuthForm';
import GoogleLogin from '../../../components/Auth/GoogleLogin';

const SignIn = () => {
  return (
    <SafeAreaView className='flex-[1] bg-colorDark1 pt-[25px]'>
      <View className='flex-[1.5] flex flex-row items-center justify-center'>
        <AuthForm />
      </View>
      <View className='flex-[1]'>
        <GoogleLogin />
      </View>
    </SafeAreaView>
  );
};

export default SignIn;
