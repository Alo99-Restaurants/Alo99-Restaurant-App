import { StatusBar } from 'expo-status-bar';
import { Text, View, SafeAreaView, Platform } from 'react-native';

export default function Test() {
  console.log('Platform.OS', Platform.OS);
  return (
    <SafeAreaView
      className={`flex-1 justify-center items-center bg-white text-black ${
        Platform.OS === 'android' ? 'pt-[25px]' : ''
      }`}>
      <View>
        <Text className='bg-red-400'>Hello World!</Text>
        <Text className='bg-blue-500'>Hello Cac ban a</Text>
      </View>
    </SafeAreaView>
  );
}
