/* App - blkbit inc. */

/* NPM Imports */
import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import SplashScreenNav from './src/navigation/SplashScreenNav';
import SplashScreen from 'react-native-splash-screen';

/* Variables */
var RNFS = require('react-native-fs');

/* Exports */
export default function App() {
  useEffect(() => {
    RNFS.writeFile(
      RNFS.CachesDirectoryPath + '/' + 'current_source.db',
      `mgdx`,
      'utf8'
    );
    SplashScreen.hide();
  });
  return <SplashScreenNav />;
}
