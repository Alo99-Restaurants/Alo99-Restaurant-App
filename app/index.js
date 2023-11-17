import { Text, View } from 'react-native';
import { Link } from 'expo-router';

export default function Page() {
  return (
    <View>
      <Text>Index page</Text>
      <View>
        <Link href='/about'>About</Link>
        <Link href='/home'>Home Page</Link>
      </View>
    </View>
  );
}
