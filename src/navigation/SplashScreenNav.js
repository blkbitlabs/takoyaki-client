import 'react-native-gesture-handler';
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import MainStackNavigator from './MainStackNavigator';
import SplashScreeen from './SplashScreeen';
const Stack = createStackNavigator();

function SplashScreenNav() {
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

export default SplashScreenNav;
