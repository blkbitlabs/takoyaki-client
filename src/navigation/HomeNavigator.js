/* HomeNavigator - blkbit inc. */

/* NPM Imports */
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

/* Local Imports */
import Home from '../screens/Home';
import ProfilePage from '../screens/ProfilePage';
import MangaPage from '../screens/MangaPage';
import NewTopBar from '../navigation/NewTopBar';

/* Constants */
const Stack = createStackNavigator();

/* Main Code */
function HomeNavigator() {
  /* HomeNavigator Generator */

  return (
    <Stack.Navigator
      initialRouteName='Home'
      headerMode='float'
      screenOptions={{
        header: () => {
          return <NewTopBar />;
        },
        headerTransparent: true
      }}>
      <Stack.Screen name='Home' component={Home} />
      <Stack.Screen
        name='ProfilePage'
        component={ProfilePage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='MangaReader'
        component={MangaPage}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

/* Exports */
export default HomeNavigator;
