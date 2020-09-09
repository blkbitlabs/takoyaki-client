/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  Dimensions,
  ActivityIndicator,
  AppState,
} from 'react-native';
var RNFS = require('react-native-fs');
import MangaPageImages from './MangaPageImages';
import {hasNotch} from 'react-native-device-info';
import {getStatusBarHeight} from 'react-native-status-bar-height';
const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;
const {width, height} = Dimensions.get('window');
const scale = size => (width / guidelineBaseWidth) * size;
const verticalScale = size => (height / guidelineBaseHeight) * size;
const topbarheight = hasNotch()
  ? getStatusBarHeight() + verticalScale(36.5)
  : getStatusBarHeight() + verticalScale(48);
const bottombarheight = hasNotch()
  ? getStatusBarHeight() + verticalScale(29.5)
  : getStatusBarHeight() + verticalScale(32);
function MangaPage({route, navigation}) {
  const {id_chap} = route.params;
  const {id_src} = route.params;
  const [mangaaaa, set_mangaaaa] = useState([]);
  const [did_get, set_didget] = useState(false);
  const [appState, setAppState] = useState(AppState.currentState);
  const url = 'https://takoyaki.chetasr.co/chapter';
  useEffect(() => {
    set_didget(false);
    fetch(url + '?src=' + `${id_src}` + `&id=${id_chap}`)
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.status === 'ok') {
          set_mangaaaa(responseJson.result);
          set_didget(true);
        }
      })
      .catch(error => console.log(error));
    AppState.addEventListener('change', _handleAppStateChange);

    return () => {
      AppState.removeEventListener('change', _handleAppStateChange);
    };
  }, [_handleAppStateChange, id_chap, id_src]);

  const newLocal = nextAppState => {
    if (
      appState.match(/active/) &&
      (nextAppState === 'inactive' || nextAppState === 'background')
    ) {
      RNFS.readDir(RNFS.CachesDirectoryPath).then(e => {
        let okay;
        for (okay = 0; okay < e.length; okay++) {
          RNFS.unlink(e[okay].path)
            .then(console.log('File Deleted'))
            .catch(eror => {
              console.log('On delete gave error : ' + eror);
            });
        }
      });
    }
    setAppState(nextAppState);
  };
  const _handleAppStateChange = newLocal;
  let manga_images_generated = new Array(mangaaaa.length);
  if (did_get) {
    let i;
    for (i = 0; i < mangaaaa.length; i++) {
      console.log(mangaaaa[i]);
      const props_manga = {
        manga_images_src: mangaaaa[i],
        manga_images_src_id: id_src,
        manga_images_src_iterator: i + 1,
      };
      manga_images_generated[i] = <MangaPageImages {...props_manga} />;
    }
  } else {
    manga_images_generated = (
      <View
        style={{
          width: width,
          height: height,
          flex: 1,
        }}>
        <ActivityIndicator
          size="large"
          style={{
            width: width,
            height: height - topbarheight,
            alignSelf: 'center',
          }}
          color="red"
        />
      </View>
    );
  }
  return (
    <View style={{height: '100%', width: '100%', flexDirection: 'column'}}>
      <ScrollView
        horizontal={false}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={true}>
        <View
          style={{
            backgroundColor: 'transparent',
            width: width,
            height: topbarheight,
          }}
        />
        {manga_images_generated}
        <View
          style={{
            backgroundColor: 'transparent',
            width: width,
            height: bottombarheight,
          }}
        />
      </ScrollView>
    </View>
  );
}

export default MangaPage;
