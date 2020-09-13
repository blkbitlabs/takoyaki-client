/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import FastImage from 'react-native-fast-image'
const {width} = Dimensions.get('window');
var RNFS = require('react-native-fs');
const guidelineBaseWidth = 350;
const scale = size => (width / guidelineBaseWidth) * size;
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
    width: scale(125),
  },
  insideCardImage: {
    height: '100%',
    borderRadius: 15,
    width: '100%',
    resizeMode: 'cover',
  },
  insideText: {
    marginTop: 6,
    fontFamily: 'SFProDisplay-Medium',
    fontSize: moderateScale(15),
    color: 'white',
  },
  insideTextGenre: {
    fontFamily: 'SFProDisplay-Regular',
    fontSize: moderateScale(12),
    color: '#D3D3D3',
  },
  insideCard_: {
    borderRadius: 15,
    backgroundColor: '#222831',
    width: scale(125),
  },
  insideCardImage_: {
    backgroundColor: '#222831',
    height: '100%',
    borderRadius: 15,
    width: '100%',
  },
  insideText_: {
    marginLeft: moderateScale(4),
    marginTop: 12,
    width: '70%',
    borderRadius: 30,
    height: '12.5%',
    backgroundColor: 'grey',
  },
  insideTextGenre_: {
    marginLeft: moderateScale(4),
    marginTop: 4,
    width: '80%',
    borderRadius: 30,
    height: '12.5%',
    backgroundColor: 'grey',
  },
});
function CardElement(props) {
  const [isloading, setloading] = useState(false);
  let imageee;
  //TEST WORKS !
  let path = RNFS.CachesDirectoryPath + '/' + String(props.id) + '.jpg';
  useEffect(() => {
    setloading(true);
  }, [path, props.imgsrc.uri]);
  return (
    <View style={[styles_CardElement.Card, {marginLeft: props.marg}]}>
      { isloading && (
      <View>
        <TouchableOpacity
          style={[styles_CardElement.insideCard_, {height: '75%'}]}>
          <ActivityIndicator
            color="#E50914"
            style={styles_CardElement.insideCardImage_}
            animating={props.loading}
          />
        </TouchableOpacity>
        <View style={{height: '25%', width: '100%'}}>
          <View style={styles_CardElement.insideText_} /> 
          <View style={styles_CardElement.insideTextGenre_} />
        </View>
      </View>
    )}
      <TouchableOpacity
        style={[styles_CardElement.insideCard, {height: '75%'}]}
        onPress={() => {
          props.nav.navigate('ProfilePage', {
            id: props.id,
            id_name: props.name,
            id_cover: 'file://' + path,
            nav_mangaa: props.nav,
          });
        }}>
        <FastImage
          source={{uri: props.imgsrc.uri,priority: FastImage.priority.normal,}}
          style={styles_CardElement.insideCardImage} 
          resizeMode={FastImage.resizeMode.contain}
          onLoadEnd = { () => setloading(false) }
        />
      </TouchableOpacity>
      <Text
        numberOfLines={2}
        ellipsizeMode="tail"
        style={styles_CardElement.insideText}>
        {props.name}
      </Text>
      <Text style={styles_CardElement.insideTextGenre}>{props.time}</Text>
    </View>
  );
}
export default CardElement;
