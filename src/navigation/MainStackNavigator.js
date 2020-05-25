/* eslint-disable react-native/no-inline-styles */
import 'react-native-gesture-handler';
import * as React from 'react';
//import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Favorites from '../screens/Favorites';
import Download from '../screens/Downloads';
import {Settings_page} from '../screens/Settings_page';
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons';
import HomeNavigator from '../navigation/HomeNavigator';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import BottomNavBar from './BottomNavBar';

const Tab = createBottomTabNavigator();
function MainStackNavigator({navgation}) {
  return (
    //<NavigationContainer>
    <Tab.Navigator
      initialRouteName="HomeNavigator"
      barStyle={{
        backgroundColor: '#141414',
      }}
      tabBar={props => {
        return <BottomNavBar {...props} />;
      }}>
      <Tab.Screen
        name="HomeNavigator"
        component={HomeNavigator}
        options={{
          tabBarLabel: 'Home',
        }}
      />
      <Tab.Screen
        name="Favorites"
        component={Favorites}
        options={{
          tabBarLabel: 'Favorite',
        }}
      />
      <Tab.Screen
        name="Download"
        component={Download}
        options={{
          tabBarLabel: 'Download',
        }}
      />
      <Tab.Screen
        name="Settings_page"
        component={Settings_page}
        options={{
          tabBarLabel: 'Settings',
        }}
      />
    </Tab.Navigator>
    // </NavigationContainer>
  );
}

export default MainStackNavigator;
