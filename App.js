import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import SplashScreenNav from './src/navigation/SplashScreenNav';
import SplashScreen from 'react-native-splash-screen';
var RNFS = require('react-native-fs');
export default function App() {
  useEffect(() => {
    RNFS.writeFile(
      RNFS.CachesDirectoryPath + '/' + 'Source.txt',
      `mgdx`,
      'utf8',
    );
    SplashScreen.hide();
  });
  return <SplashScreenNav />;
}
