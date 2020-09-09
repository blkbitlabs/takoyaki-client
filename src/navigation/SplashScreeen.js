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
      }}>
      <View
        style={{
          height: '100%',
          width: '100%',
          backgroundColor: 'black',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <LottieView
          style={{
            height: 400,
            width: 500,
          }}
          resizeMode="cover"
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
