/* MainStackNavigator - blkbit inc. */

/* NPM Imports */
import "react-native-gesture-handler";
import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Favorites from "../screens/Favorites";
import Download from "../screens/Downloads";
import { Settings_page } from "../screens/Settings_page";
import HomeNavigator from "../navigation/HomeNavigator";
import BottomNavBar from "./BottomNavBar";

/* Constants */
const Tab = createBottomTabNavigator();

/* Main Code */
function MainStackNavigator({ navgation }) {
  /* MainStackNavigator Generator */

  return (
    <Tab.Navigator
      initialRouteName="HomeNavigator"
      barStyle={{
        backgroundColor: "black",
      }}
      tabBar={(props) => {
        return <BottomNavBar {...props} />;
      }}
    >
      <Tab.Screen
        name="HomeNavigator"
        component={HomeNavigator}
        options={{
          tabBarLabel: "home",
        }}
      />
      <Tab.Screen
        name="Favorites"
        component={Favorites}
        options={{
          tabBarLabel: "star",
        }}
      />
      <Tab.Screen
        name="Download"
        component={Download}
        options={{
          tabBarLabel: "download",
        }}
      />
      <Tab.Screen
        name="Settings_page"
        component={Settings_page}
        options={{
          tabBarLabel: "settings",
        }}
      />
    </Tab.Navigator>
  );
}

/* Exports */
export default MainStackNavigator;
