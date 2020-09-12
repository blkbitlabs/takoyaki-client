import React from 'react';
import { View, Text, StyleSheet, StatusBar, Dimensions } from 'react-native';
import { VibrancyView } from '@react-native-community/blur';
import { hasNotch } from 'react-native-device-info';
import { getStatusBarHeight } from 'react-native-status-bar-height';
const { width, height } = Dimensions.get('window');
const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;
const scale = (size) => (width / guidelineBaseWidth) * size;
const verticalScale = (size) => (height / guidelineBaseHeight) * size;
const moderateScale = (size, factor = 0.5) =>
  size + (scale(size) - size) * factor;
const styles_topbar = StyleSheet.create({
  container: {
    flex: 1
  },
  topBar: {
    paddingLeft: 900,
    height: hasNotch()
      ? getStatusBarHeight() + verticalScale(36.5)
      : getStatusBarHeight() + verticalScale(51),
    position: 'absolute'
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
    color: 'white'
  }
});
function Topbar(props) {
  return (
    <View>
      <VibrancyView
        style={styles_topbar.topBar}
        blurType='extraDark'
        blurAmount={40}
        blurRadius={30}
      />
      <StatusBar
        barStyle='light-content'
        backgroundColor='#black'
        opacity={0.8}
      />
      <Text style={styles_topbar.topBarText}>TAKOYAKI</Text>
      {props.children}
    </View>
  );
}

export default Topbar;
