import { View, Text, SafeAreaView } from 'react-native';
import React, { useContext } from 'react';
import { Link, Stack } from 'expo-router';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { AuthContext } from '../../context/AuthContext';

const Profile = () => {
  const { isLoading, userInfo, splashLoading, logout } =
    useContext(AuthContext);
  const handleLogout = () => {
    logout();
  };

  return (
    <View>
      <Stack.Screen options={{ headerShown: false }} />
      <SafeAreaView className='pt-[25px] bg-colorDark12'>
        <Text>Profile</Text>

        <Link href='/sign-in'>Sign-In</Link>
        <Link href='/sign-up'>Sign-Up</Link>

        <View className='w-full my-2'>
          <TouchableHighlight
            style={{ borderRadius: 6 }}
            underlayColor={'#fff'}
            onPress={handleLogout}>
            <View className=' bg-primary1 h-10 rounded-md flex justify-center items-center'>
              <Text className=' font-roboto-black text-md text-center text-white'>
                Log-out
              </Text>
            </View>
          </TouchableHighlight>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default Profile;
