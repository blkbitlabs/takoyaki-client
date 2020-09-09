/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
//import AutoHeightImage from 'react-native-auto-height-image';
const {width, height} = Dimensions.get('window');
var RNFS = require('react-native-fs');
import {hasNotch} from 'react-native-device-info';
import {getStatusBarHeight} from 'react-native-status-bar-height';
const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;
const scale = size => (width / guidelineBaseWidth) * size;
const verticalScale = size => (height / guidelineBaseHeight) * size;
const topbarheight = hasNotch()
  ? getStatusBarHeight() + verticalScale(36.5)
  : getStatusBarHeight() + verticalScale(48);

function MangaPageImages(props) {
  const [isitdoneyet, setisitdoneyet] = useState(true);
  const path =
    RNFS.CachesDirectoryPath +
    '/' +
    `${props.manga_images_src_id}_${props.manga_images_src_iterator}.jpg`;

  console.log(path);

  useEffect(() => {
    setisitdoneyet(false);

    RNFS.downloadFile({
      fromUrl: props.manga_images_src,
      toFile: path,
    }).promise.then(e => {
      setisitdoneyet(true);
    });
  }, [path, props.manga_images_src]);

  let whattoshow;
  const [_w, set_w] = useState(width);
  const [_h, set_h] = useState(height);
  let ffs;
  if (isitdoneyet) {
    Image.getSize('file://' + path, (w, h) => {
      set_h(h);
      set_w(w);
    });
    if (props.manga_images_src_iterator === 1) {
      ffs = (_h / _w) * width;
    } else {
      ffs = (_h / _w) * width;
    }
    whattoshow = (
      <Image
        style={{
          width: width,
          height: ffs,
          resizeMode: 'stretch',
        }}
        source={{uri: 'file://' + path}}
      />
    );
  } else {
    whattoshow = (
      <ActivityIndicator
        size="large"
        style={{
          width: width,
          height: height - topbarheight,
          alignSelf: 'center',
        }}
        color="red"
      />
    );
  }
  return <View style={{width: width, height: ffs}}>{whattoshow}</View>;
}

export default MangaPageImages;
