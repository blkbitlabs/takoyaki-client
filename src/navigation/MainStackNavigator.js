/* MainStackNavigator - blkbit inc. */

/* NPM Imports */
import 'react-native-gesture-handler';
import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Favorites from '../screens/Favorites';
import Download from '../screens/Downloads';
import { Settings_page } from '../screens/Settings_page';
import HomeNavigator from '../navigation/HomeNavigator';
import BottomNavBar from './BottomNavBar';

/* Constants */
const Tab = createBottomTabNavigator();

/* Main Code */
function MainStackNavigator({ navgation }) {
  /* MainStackNavigator Generator */

  return (
    <Tab.Navigator
      initialRouteName='HomeNavigator'
      barStyle={{
        backgroundColor: 'black'
      }}
      tabBar={(props) => {
        return <BottomNavBar {...props} />;
      }}>
      <Tab.Screen
        name='HomeNavigator'
        component={HomeNavigator}
        options={{
          tabBarLabel: 'grid-outline',
          tabBarLabelSelected: 'grid'
        }}
      />
      <Tab.Screen
        name='Favorites'
        component={Favorites}
        options={{
          tabBarLabel: 'star-outline',
          tabBarLabelSelected: 'star'
        }}
      />
      <Tab.Screen
        name='Download'
        component={Download}
        options={{
          tabBarLabel: 'cloud-download-outline',
          tabBarLabelSelected: 'cloud-download'
        }}
      />
      <Tab.Screen
        name='Settings_page'
        component={Settings_page}
        options={{
          tabBarLabel: 'options-2-outline',
          tabBarLabelSelected: 'options-2'
        }}
      />
    </Tab.Navigator>
  );
}

/* Exports */
export default MainStackNavigator;
