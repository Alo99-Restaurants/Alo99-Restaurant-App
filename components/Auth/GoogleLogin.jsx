import { View, Text, Button, Pressable, Image } from 'react-native';
import React, { useEffect, useState, useContext } from 'react';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { loginWithGG } from '../../services/auth.service';
import { AuthContext } from '../../context/AuthContext';

WebBrowser.maybeCompleteAuthSession();

const GoogleLogin = () => {
  const auth = useContext(AuthContext);

  // selectAccount: true,
  // shouldAutoExchangeCode: false

  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: '',
    iosClientId:
      '668304086077-g0fbj59svjg0gi2ldi6p26207i20tg7n.apps.googleusercontent.com',
    webClientId:
      '668304086077-843hetfqhf9u60fcr5ddlk06uss37qvb.apps.googleusercontent.com'
  });

  async function handleEffect(response) {
    try {
      const tokenGG = response?.authentication?.accessToken;
      if (response?.type === 'success' && tokenGG) {
        const responseGG = await loginWithGG(tokenGG);
        const userInfoResponse = responseGG?.data?.data;
        if (userInfoResponse) auth.loginWithGG(userInfoResponse);
      }
    } catch (error) {
      console.log('Error while checking user info with GG method:', error);
    }
  }

  useEffect(() => {
    handleEffect(response);
  }, [response]);

  return (
    <>
      <Text className='w-full text-center text-white pb-4'>
        ─────────── or ───────────
      </Text>
      <Pressable onPress={() => promptAsync()}>
        <View className='bg-[#4285F4] rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 flex flex-row justify-center items-center mx-4'>
          <Image
            source={require('../../assets/ggicon.png')}
            style={{
              width: 20,
              height: 20,
              marginRight: 15,
              tintColor: 'white'
            }}
          />
          <Text className='text-white'>Sign in with Google</Text>
        </View>
      </Pressable>
    </>
  );
};

export default GoogleLogin;
