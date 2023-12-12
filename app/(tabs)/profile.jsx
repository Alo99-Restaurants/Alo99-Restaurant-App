import { View, Text, SafeAreaView } from 'react-native';
import React from 'react';
import { Link, Stack } from 'expo-router';

const Profile = () => {
  return (
    <View>
      <Stack.Screen options={{ headerShown: false }} />
      <SafeAreaView className='pt-[25px] bg-colorDark12'>
        <Text>Profile</Text>

        <Link href='/sign-in'>Sign-In</Link>
        <Link href='/sign-up'>Sign-Up</Link>
      </SafeAreaView>
    </View>
  );
};

export default Profile;
