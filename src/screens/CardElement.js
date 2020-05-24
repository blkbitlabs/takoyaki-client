/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
const {width, height} = Dimensions.get('window');
var RNFS = require('react-native-fs');
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
});
function CardElement(props) {
  const [isloading, setloading] = useState(false);
  function namelen(prop) {
    if (prop.length > 25) {
      return prop.substring(0, 25).concat('...');
    }
    return prop;
  }
  let taaxt = namelen(props.name);
  let imageee;

  //TEST WORKS !
  let path = RNFS.CachesDirectoryPath + '/' + String(props.id) + '.jpg';
  useEffect(() => {
    setloading(true);
    RNFS.downloadFile({fromUrl: props.imgsrc.uri, toFile: path}).promise.then(
      e => {
        setloading(false);
      },
    );
  }, [path, props.imgsrc.uri]);
  if (isloading) {
    imageee = (
      <ActivityIndicator
        color="#E50914"
        style={styles_CardElement.insideCardImage}
        animating={isloading}
      />
    );
  } else {
    imageee = (
      <TouchableOpacity
        style={[
          styles_CardElement.insideCard,
          {height: namelen(props.name) ? '75%' : '75%'},
        ]}
        onPress={() => {
          props.nav.navigate('ProfilePage', {
            id: props.id,
            id_name: props.name,
            id_cover: {uri: 'file://' + path},
          });
        }}>
        <Image
          source={{uri: 'file://' + path}}
          style={styles_CardElement.insideCardImage}
        />
      </TouchableOpacity>
    );
  }

  return (
    <View style={[styles_CardElement.Card, {marginLeft: props.marg}]}>
      {imageee}
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
