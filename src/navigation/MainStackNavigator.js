/* eslint-disable react-native/no-inline-styles */
import 'react-native-gesture-handler';
import * as React from 'react';
//import {NavigationContainer} from '@react-navigation/native';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import Favorites from '../screens/Favorites';
import Download from '../screens/Downloads';
import {Settings_page} from '../screens/Settings_page';
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons';
import HomeNavigator from '../navigation/HomeNavigator';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';

const Tab = createMaterialBottomTabNavigator();
function MainStackNavigator({navgation}) {
  return (
    //<NavigationContainer>
    <Tab.Navigator
      initialRouteName="HomeNavigator"
      barStyle={{
        backgroundColor: '#141414',
      }}
      activeColor="#0475FF">
      <Tab.Screen
        name="HomeNavigator"
        component={HomeNavigator}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color}) => (
            <MaterialIcons name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Favorites"
        component={Favorites}
        options={{
          tabBarLabel: 'Favorites',
          tabBarIcon: ({color}) => (
            <MaterialIcons name="favorite" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Download"
        component={Download}
        options={{
          tabBarLabel: 'Download',
          tabBarIcon: ({color}) => (
            <Ionicons name="md-download" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Settings_page"
        component={Settings_page}
        options={{
          tabBarLabel: 'Settings',
          tabBarIcon: ({color}) => (
            <MaterialIcons name="settings" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
    // </NavigationContainer>
  );
}

export default MainStackNavigator;
