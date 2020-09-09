import React, {useEffect, useState} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Dimensions,
} from 'react-native';
var RNFS = require('react-native-fs');
const {width, height} = Dimensions.get('window');
const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;
const scale = size => (width / guidelineBaseWidth) * size;
const verticalScale = size => (height / guidelineBaseHeight) * size;
const stylesheet_source = StyleSheet.create({
  chapterbutton: {
    marginTop: scale(16),
    alignItems: 'center',
    width: width - scale(40),
    height: verticalScale(35),
    borderRadius: 9,
    flexDirection: 'row',
  },
  chapterbutton_: {
    paddingHorizontal: 10,
    height: verticalScale(40),
    width: '98.4%',
    justifyContent: 'center',
    backgroundColor: '#423F46',
    borderBottomRightRadius: 7,
    borderTopRightRadius: 7,
  },
  chapterbutton_tag: {
    width: '1.6%',
    height: verticalScale(40),
    backgroundColor: '#5F5F5F',
    borderBottomLeftRadius: 7,
    borderTopLeftRadius: 7,
  },
  chapterbutton_name: {
    fontFamily: 'SFProDisplay-Regular',
    color: 'white',
    fontSize: 15,
  },
});
function Source(props) {
  function lets__see(x) {
    RNFS.writeFile(
      RNFS.CachesDirectoryPath + '/' + 'Source.txt',
      `${x}`,
      'utf8',
    );
  }
  return (
    <View style={stylesheet_source.chapterbutton}>
      <View style={stylesheet_source.chapterbutton_tag} />
      <TouchableOpacity
        style={stylesheet_source.chapterbutton_}
        onPress={() => {
          lets__see(String(props.id_));
        }}>
        <Text style={stylesheet_source.chapterbutton_name}>{props.name_}</Text>
      </TouchableOpacity>
    </View>
  );
}
export default Source;
