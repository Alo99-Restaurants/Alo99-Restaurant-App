import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import Test from './components/Test';
import { NativeWindStyleSheet } from "nativewind";

NativeWindStyleSheet.setOutput({
  default: "native",
});

export default function App() {
  return (
    <View className='flex-1'>
      <Test />
      <StatusBar style="auto" />
    </View>
  );
}