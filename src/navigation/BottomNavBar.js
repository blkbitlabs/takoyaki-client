/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, StyleSheet, Text, StatusBar, Dimensions} from 'react-native';
import {VibrancyView} from '@react-native-community/blur';
import {hasNotch} from 'react-native-device-info';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {TouchableOpacity} from 'react-native-gesture-handler';
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
const {width, height} = Dimensions.get('window');
const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;
const scale = size => (width / guidelineBaseWidth) * size;
const verticalScale = size => (height / guidelineBaseHeight) * size;
const moderateScale = (size, factor = 0.5) =>
  size + (scale(size) - size) * factor;
const styles_topbar = StyleSheet.create({
  container: {
    flex: 1,
  },
  topBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: width,
    height: hasNotch()
      ? getStatusBarHeight() + verticalScale(36.5)
      : getStatusBarHeight() + verticalScale(51),
  },
  topBarText: {
    marginTop: hasNotch()
      ? getStatusBarHeight() - 3.3
      : getStatusBarHeight() + verticalScale(6.8),
    alignSelf: 'flex-start',
    paddingLeft: scale(19),
    position: 'absolute',
    fontFamily: 'LuTuna',
    fontSize: moderateScale(28),
    color: 'white',
  },
  buttons: {
    position: 'absolute',
    backgroundColor: 'red',
    width: width,
    height: hasNotch()
      ? getStatusBarHeight() + verticalScale(200.5)
      : getStatusBarHeight() + verticalScale(51),
  },
});
function BottomNavBar({state, descriptors, navigation}) {
  /* return (
    <View>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#black"
        opacity={0.8}
      />
      {props.children}
      <VibrancyView
        style={styles_topbar.topBar}
        blurType="extraDark"
        blurAmount={40}
        blurRadius={30}
      />
      <TouchableOpacity style={styles_topbar.buttons} />
    </View>
  );*/
  return (
    <View>
      <VibrancyView style={{
      flexDirection: 'row',
      position: 'absolute',
      paddingTop: '3%',
      justifyContent: 'space-evenly',
      backgroundColor: 'transparent',
      bottom: 0,
      left: 0,
      width: width,
      height: hasNotch()
        ? getStatusBarHeight() + verticalScale(29.5)
        : getStatusBarHeight() + verticalScale(32),
    }}>
      </VibrancyView>
      <View
    style={{
      flexDirection: 'row',
      position: 'absolute',
      paddingTop: '3%',
      justifyContent: 'space-evenly',
      backgroundColor: 'transparent',
      bottom: 0,
      left: 0,
      width: width,
      height: hasNotch()
        ? getStatusBarHeight() + verticalScale(29.5)
        : getStatusBarHeight() + verticalScale(32),
    }}
    blurType="extraDark"
    blurAmount={40}
    blurRadius={30}>
    {state.routes.map((route, index) => {
      const {options} = descriptors[route.key];
      const label =
        options.tabBarLabel !== undefined
          ? options.tabBarLabel
          : options.title !== undefined
          ? options.title
          : route.name;

      /*  const icon =
        options.tabBarIcon !== undefined
          ? options.tabBarIcon
          : options.title !== undefined
          ? options.title
          : route.name;
*/
      const isFocused = state.index === index;

      const onPress = () => {
        const event = navigation.emit({
          type: 'tabPress',
          target: route.key,
          canPreventDefault: true,
        });

        if (!isFocused && !event.defaultPrevented) {
          navigation.navigate(route.name);
        }
      };

      const onLongPress = () => {
        navigation.emit({
          type: 'tabLongPress',
          target: route.key,
        });
      };
      let okaythen;
      if (label !== 'Download') {
        let y = label.toLowerCase();
        let waitwtf = isFocused ? '#0475FF' : 'white';
        okaythen = <MaterialIcons name={y} color={waitwtf} size={27} />;
      } else {
        let waitwtf_ = isFocused ? '#0475FF' : 'white';
        okaythen = <Ionicons name="md-download" color={waitwtf_} size={27} />;
      }

      return (
        <TouchableOpacity
          accessibilityRole="button"
          accessibilityStates={isFocused ? ['selected'] : []}
          accessibilityLabel={options.tabBarAccessibilityLabel}
          testID={options.tabBarTestID}
          onPress={onPress}
          onLongPress={onLongPress}
          style={{flex: 1, alignItems: 'center'}}>
          {okaythen}
        </TouchableOpacity>
      );
    })}
  </View></View>
    
  );
}

export default BottomNavBar;
