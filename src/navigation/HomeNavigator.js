import React from 'react';
import Home from '../screens/Home';
import ProfilePage from '../screens/ProfilePage';
import MangaPage from '../screens/MangaPage';
import {createStackNavigator} from '@react-navigation/stack'
import {useRoute} from '@react-navigation/native';
import Topbar from './Topbar';

const Stack = createStackNavigator();
function HomeNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      headerMode="float"
      screenOptions={{
        header: () => {
          return <Topbar />;
        },
      }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen
        name="ProfilePage"
        component={ProfilePage}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="MangaReader"
        component={MangaPage}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}
export default HomeNavigator;
