/* App - blkbit inc. */

/* NPM Imports */
import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import SplashScreenNav from './src/navigation/SplashScreenNav';
import SplashScreen from 'react-native-splash-screen';
import { db } from './src/db/database';

/* Variables */

/* Exports */
export default function App() {
  useEffect(() => {
    (async() => await db.adapter.setLocal('source', 'mgdx'))();
    SplashScreen.hide();
  });
  return <SplashScreenNav />;
}
