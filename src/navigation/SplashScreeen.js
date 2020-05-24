/* eslint-disable react-native/no-inline-styles */
import 'react-native-gesture-handler';
import * as React from 'react';
import LottieView from 'lottie-react-native';
import {View, Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');
function SplashScreeen({navigation}) {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <View
        style={{
          height: height,
          width: width,
          backgroundColor: 'black',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <LottieView
          style={{
            height: height,
            width: width,
            backgroundColor: 'black',
            justifyContent: 'center',
          }}
          resizeMode='center'
          source={require('./TakoyakiSplash.json')}
          loop={false}
          autoPlay={true}
          onAnimationFinish={() => navigation.navigate('MainStackNavigator')}
        />
      </View>
    </View>
  );
}

export default SplashScreeen;
