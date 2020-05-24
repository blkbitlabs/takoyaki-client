/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
const {width, height} = Dimensions.get('window');
const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;
const scale = size => (width / guidelineBaseWidth) * size;
const verticalScale = size => (height / guidelineBaseHeight) * size;
const moderateScale = (size, factor = 0.5) =>
  size + (scale(size) - size) * factor;

const styles_CardElement = StyleSheet.create({
  Card: {
    width: scale(125),
    marginHorizontal: scale(8),
    margin: moderateScale(3),
  },
  insideCard: {
    borderRadius: 15,
    backgroundColor: '#222831',
    width: scale(125),
  },
  insideCardImage: {
    backgroundColor: '#222831',
    height: '100%',
    borderRadius: 15,
    width: '100%',
  },
  insideText: {
    marginLeft: moderateScale(4),
    marginTop: 12,
    width: '70%',
    borderRadius: 30,
    height: '12.5%',
    backgroundColor: 'grey',
  },
  insideTextGenre: {
    marginLeft: moderateScale(4),
    marginTop: 4,
    width: '80%',
    borderRadius: 30,
    height: '12.5%',
    backgroundColor: 'grey',
  },
});
function CardLoading(proops) {
  return (
    <View style={[styles_CardElement.Card, {marginLeft: proops.marg}]}>
      <TouchableOpacity
        style={[styles_CardElement.insideCard, {height: '75%'}]}>
        <ActivityIndicator
          color="#E50914"
          style={styles_CardElement.insideCardImage}
          animating={proops.loading}
        />
      </TouchableOpacity>
      <View style={{height: '25%', width: '100%'}}>
        <View style={styles_CardElement.insideText} />
        <View style={styles_CardElement.insideTextGenre} />
      </View>
    </View>
  );
}
export default CardLoading;
