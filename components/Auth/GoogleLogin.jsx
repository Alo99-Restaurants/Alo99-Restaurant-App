import { View, Text, Button, Pressable, Image } from 'react-native'
import React, { useEffect, useState } from 'react';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import AsyncStorage from '@react-native-async-storage/async-storage';

WebBrowser.maybeCompleteAuthSession();

const GoogleLogin = () => {
    const [token, setToken] = useState('');
    const [userInfo, setUserInfo] = useState(null);

    const [request, response, promptAsync] = Google.useAuthRequest({
      androidClientId: '',
      iosClientId:
        '668304086077-g0fbj59svjg0gi2ldi6p26207i20tg7n.apps.googleusercontent.com',
      webClientId:
        '668304086077-843hetfqhf9u60fcr5ddlk06uss37qvb.apps.googleusercontent.com',
      selectAccount: true,
      shouldAutoExchangeCode: false
    });

    useEffect(() => {
      handleEffect();
    }, [response, token]);

    async function handleEffect() {
      const user = await getLocalUser();
      console.log('user', user);
      if (!user) {
        if (response?.type === 'success') {
          // setToken(response.authentication.accessToken);
          getUserInfo(response.authentication.accessToken);
        }
      } else {
        setUserInfo(user);
        console.log('loaded locally');
      }
    }

    const getLocalUser = async () => {
      const data = await AsyncStorage.getItem('@user');
      if (!data) return null;
      return JSON.parse(data);
    };

    const getUserInfo = async (token) => {
      if (!token) return;
      try {
        const response = await fetch(
          'https://www.googleapis.com/userinfo/v2/me',
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        );

        const user = await response.json();
        await AsyncStorage.setItem('@user', JSON.stringify(user));
        setUserInfo(user);
      } catch (error) {
        // Add your own error handler here
      }
    };

  return (
    <>
      <Text className='w-full text-center text-white pb-4'>─────────── or ───────────</Text>
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
}

export default GoogleLogin