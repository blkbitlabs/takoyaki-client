import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
var RNFS = require('react-native-fs');
import NewTopBar from '../navigation/NewTopBar';
const {width, height} = Dimensions.get('window');
const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;
const scale = size => (width / guidelineBaseWidth) * size;
const verticalScale = size => (height / guidelineBaseHeight) * size;
const styles_Settings = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'center',
    position: 'absolute',
    height: height,
    width: width,
    backgroundColor: '#141414',
    alignItems: 'center',
  },
  textt: {
    fontFamily: 'SFProDisplay-Bold',
    fontSize: 29,
    color: 'white',
  },
  row_1_container: {
    height: '37%',
    marginBottom: 10,
    paddingLeft: scale(19),
    width: width,
  },
  chapterbutton: {
    marginTop: scale(16),
    alignItems: 'center',
    width: width - scale(40),
    height: verticalScale(35),
    borderRadius: 9,
    flexDirection: 'row',
  },
  chapterbutton_: {
    height: '100%',
    width: '98.4%',
    justifyContent: 'center',
    backgroundColor: '#423F46',
    borderBottomRightRadius: 7,
    borderTopRightRadius: 7,
  },
  chapterbutton_tag: {
    width: '1.6%',
    height: '100%',
    backgroundColor: '#5F5F5F',
    borderBottomLeftRadius: 7,
    borderTopLeftRadius: 7,
  },
  chapterbutton_name: {
    fontFamily: 'SFProDisplay-Light',
    color: 'white',
    fontSize: 15,
  },
});
export function Settings_page({navigation}) {
  function lets_see(x) {
    RNFS.writeFile(
      RNFS.CachesDirectoryPath + '/' + 'Source.txt',
      `${x}`,
      'utf8',
    );
  }
  function cachecleared() {
    console.log('wot');
    RNFS.readDir(RNFS.CachesDirectoryPath)
      .then(e => {
        let okay;
        for (okay = 0; okay < e.length; okay++) {
          RNFS.unlink(e[okay].path)
            .then(console.log('File Deleted'))
            .catch(eror => {
              console.log('On delete gave error : ' + eror);
            });
        }
      })
      .catch(err => {
        console.log(err.message);
      });
  }
  return (
    <NewTopBar>
      <View style={styles_Settings.container}>
        <View style={styles_Settings.row_1_container}>
          <Text style={styles_Settings.textt}>SOURCE</Text>
          <View style={styles_Settings.chapterbutton}>
            <View style={styles_Settings.chapterbutton_tag} />
            <TouchableOpacity
              style={styles_Settings.chapterbutton_}
              onPress={() => {
                lets_see('mgedn');
              }}>
              <Text style={styles_Settings.chapterbutton_name}>MangaEden</Text>
            </TouchableOpacity>
          </View>
          <View style={styles_Settings.chapterbutton}>
            <View style={styles_Settings.chapterbutton_tag} />
            <TouchableOpacity
              style={styles_Settings.chapterbutton_}
              onPress={() => {
                lets_see('mgdx');
              }}>
              <Text style={styles_Settings.chapterbutton_name}>Mangadex</Text>
            </TouchableOpacity>
          </View>
          <View style={styles_Settings.chapterbutton}>
            <View style={styles_Settings.chapterbutton_tag} />
            <TouchableOpacity
              style={styles_Settings.chapterbutton_}
              onPress={() => {
                lets_see('nhn');
              }}>
              <Text style={styles_Settings.chapterbutton_name}>NHentai</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles_Settings.row_1_container}>
          <Text style={styles_Settings.textt}>STORAGE</Text>
          <View style={styles_Settings.chapterbutton}>
            <View style={styles_Settings.chapterbutton_tag} />
            <TouchableOpacity
              style={styles_Settings.chapterbutton_}
              onPress={() => {
                cachecleared();
              }}>
              <Text style={styles_Settings.chapterbutton_name}>
                CLEAR CACHE
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </NewTopBar>
  );
}
