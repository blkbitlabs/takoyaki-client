/* SplashScreenNav - blkbit inc. */

/* NPM Imports */
import 'react-native-gesture-handler';
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

/* Local Imports */
import MainStackNavigator from './MainStackNavigator';
import SplashScreeen from './SplashScreeen';

/* Constants */
const Stack = createStackNavigator();

/* Main Code */
function SplashScreenNav() {
  /* SplashScreenNav Generator */

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreeen" >
        <Stack.Screen
          name="SplashScreeen"
          component={SplashScreeen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="MainStackNavigator"
          component={MainStackNavigator}
          options={{
            gestureEnabled: false,
            headerShown: false
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

/* Exports */
export default SplashScreenNav;
