/* HomeNavigator - blkbit inc. */

/* NPM Imports */
import React from 'react';
import { View, Text, StyleSheet, StatusBar, Dimensions } from 'react-native';
import { VibrancyView } from '@react-native-community/blur';
import { hasNotch } from 'react-native-device-info';
import { getStatusBarHeight } from 'react-native-status-bar-height';

/* Constants */
const { width, height } = Dimensions.get('window');
const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;
const scale = (size) => (width / guidelineBaseWidth) * size;
const verticalScale = (size) => (height / guidelineBaseHeight) * size;
const moderateScale = (size, factor = 0.5) =>
  size + (scale(size) - size) * factor;

/* Styles */
const styles = StyleSheet.create({
  top_bar_container: {
    paddingLeft: 900,
    height: hasNotch()
      ? getStatusBarHeight() + verticalScale(36.5)
      : getStatusBarHeight() + verticalScale(51),
    position: 'absolute'
  },

  top_bar_text: {
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

/* Main Code */
function NewTopBar(props) {
  /* TopBar Generator */

  return (
    <View>
      <StatusBar
        barStyle='light-content'
        backgroundColor='#black'
        opacity={0.8}
      />
      {props.children}
      <VibrancyView
        style={styles.top_bar_container}
        blurType='extraDark'
        blurAmount={40}
        blurRadius={30}
      />
      <Text style={styles.top_bar_text}>TAKOYAKI</Text>
    </View>
  );
}

/* Exports */
export default NewTopBar;
