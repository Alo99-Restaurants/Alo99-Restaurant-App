import { useFonts } from 'expo-font';
import { Redirect, Slot, SplashScreen, Stack } from 'expo-router';
import { useContext, useEffect } from 'react';
import { NativeWindStyleSheet } from 'nativewind';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import { AuthContext, AuthProvider } from '../context/AuthContext';

NativeWindStyleSheet.setOutput({
  default: 'native'
});

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)'
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    'Roboto-Black': require('../assets/fonts/Roboto-Black.ttf'),
    'Roboto-Bold': require('../assets/fonts/Roboto-Bold.ttf'),
    'Roboto-Italic': require('../assets/fonts/Roboto-Italic.ttf'),
    'Roboto-Light': require('../assets/fonts/Roboto-Light.ttf'),
    'Roboto-Medium': require('../assets/fonts/Roboto-Medium.ttf'),
    'Roboto-Regular': require('../assets/fonts/Roboto-Regular.ttf'),
    'Roboto-Thin': require('../assets/fonts/Roboto-Thin.ttf')
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <AuthProvider>
        <Slot />
        {/* <RootLayoutNav /> */}
      </AuthProvider>
    </Provider>
  );
}

/**
 * RootLayoutNav
 * [Stack.Screen - options props](https://reactnavigation.org/docs/native-stack-navigator#options)
 * @returns
 */
function RootLayoutNav() {
  const { isLoading, userInfo, splashLoading, register, login, logout } =
    useContext(AuthContext);
  if (!userInfo.token) {
    // On web, static rendering will stop here as the user is not authenticated
    // in the headless Node process that the pages are rendered in.
    return <Redirect href='/sign-in' />;
  }
  return (
    <Stack>
      <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
    </Stack>
  );
}
