import { View, Text, SafeAreaView } from 'react-native';
import React, { useContext } from 'react';
import { router } from 'expo-router';
import {
  TouchableHighlight,
  TouchableOpacity
} from 'react-native-gesture-handler';
import { AuthContext } from '../../../context/AuthContext';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';

const Profile = () => {
  const { isLoading, userInfo, logout } = useContext(AuthContext);
  const handleLogout = () => logout();

  return (
    <View className='flex-[1]'>
      <SafeAreaView className='flex-[1] pt-[25px] bg-colorDark1 text-primary2'>
        <View className='flex items-center justify-center mx-5 my-2'>
          <View className='h-20 w-20 bg-gray-400 rounded-full flex items-center justify-center'>
            <Text className='text-white text-2xl'>
              {userInfo.customerInfo ? userInfo.customerInfo?.name[0] : 'U'}
            </Text>
            <View className='absolute bottom-0 -right-3'>
              <TouchableHighlight
                style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
                className='w-full h-full rounded-2xl'
                onPress={() => router.push('/profile/edit')}>
                <Text className='text-primary1 py-1 px-2 text-xs'>Edit</Text>
              </TouchableHighlight>
            </View>
          </View>
        </View>
        <View className='flex flex-row justify-center'>
          <Text className='text-white text-lg'>
            {userInfo.customerInfo?.name
              ? userInfo.customerInfo?.name
              : 'User Guest'}
          </Text>
        </View>
        <View className='py-5'>
          <View className='flex-row justify-between items-center py-2 px-4'>
            <View className='flex-row items-center'>
              <Ionicons name='heart' size={24} color='white' />
              <Text className='text-primary2 ml-2'>Favorite</Text>
            </View>
            <FontAwesome5 name='angle-right' size={20} color='white' />
          </View>
          <View className='flex-row justify-between items-center py-2 px-4'>
            <View className='flex-row items-center'>
              <Ionicons name='help-circle' size={24} color='white' />
              <Text className='text-primary2 ml-2'>Help</Text>
            </View>
            <FontAwesome5 name='angle-right' size={20} color='white' />
          </View>
          <View className='flex-row justify-between items-center py-2 px-4'>
            <View className='flex-row items-center'>
              <Ionicons name='settings' size={24} color='white' />
              <Text className='text-primary2 ml-2'>Setting</Text>
            </View>
            <FontAwesome5 name='angle-right' size={20} color='white' />
          </View>
        </View>
        <View className='w-full'>
          <TouchableHighlight onPress={handleLogout}>
            <View className=' bg-primary1 h-10 rounded-md flex justify-center items-center mx-2'>
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
