import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import SplashScreenNav from './src/navigation/SplashScreenNav';
import SplashScreen from 'react-native-splash-screen';

export default function App() {
  useEffect(() => {
    SplashScreen.hide();
  });
  return <SplashScreenNav />;
}
