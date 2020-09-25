/* BottomNavBar - blkbit inc. */

/* NPM Imports */
import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { VibrancyView } from '@react-native-community/blur';
import { hasNotch } from 'react-native-device-info';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Icon } from 'react-native-eva-icons';

/* Constants */
const { width, height } = Dimensions.get('window');
const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;
const verticalScale = (size) => (height / guidelineBaseHeight) * size;

/* Styles */
const styles = StyleSheet.create({
  blur_view: {
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
      : getStatusBarHeight() + verticalScale(32)
  }
});

/* Main Code */
function BottomNavBar({ state, descriptors, navigation }) {
  /* BottomNavBar Generator */

  return (
    <View>
      <VibrancyView style={styles.blur_view}></VibrancyView>
      <View style={styles.blur_view}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label = options.tabBarLabel;
          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key
            });
          };

          let icon_component = (
            <Icon
              name={
                isFocused ? options.tabBarLabelSelected : options.tabBarLabel
              }
              fill={isFocused ? '#0475FF' : 'white'}
              width={27}
              height={27}
            />
          );

          return (
            <TouchableOpacity
              accessibilityRole='button'
              accessibilityStates={isFocused ? ['selected'] : []}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={{ flex: 1, alignItems: 'center' }}>
              {icon_component}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

/* Exports */
export default BottomNavBar;
