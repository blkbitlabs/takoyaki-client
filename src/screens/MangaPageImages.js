/* Manga Page Image Reader Engine - blkbit inc. */

//NPM IMPORTS
import React, { useState } from 'react';
import {
  View,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import FastImage from 'react-native-fast-image'


//TOP BAR

import {hasNotch} from 'react-native-device-info';
import {getStatusBarHeight} from 'react-native-status-bar-height';
const {width, height} = Dimensions.get('window');
const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;
const scale = size => (width / guidelineBaseWidth) * size;
const verticalScale = size => (height / guidelineBaseHeight) * size;
const topbarheight = hasNotch()
  ? getStatusBarHeight() + verticalScale(36.5)
  : getStatusBarHeight() + verticalScale(48);



//Main Code
function MangaPageImages(props) {

  //Variables
  let mangapages;
  const [height_, setheight_] = useState(height);
  const [isfetched, set_isfetched] = useState(false);
  let aspectratio;

  //Code to load with priority=


  //Renders each page
  mangapages = (
    <FastImage
      style={{
        width: width,
        height: height_,
      }}
      resizeMode={"stretch"}
      source={{
        uri: props.manga_images_src,
        priority: FastImage.priority.high,
      }}
      onLoad={event => setheight_((event.nativeEvent.height / event.nativeEvent.width) * width)}
    />
  );

  return <View style={{ width: width, height: aspectratio }}>
    { !isfetched && (<ActivityIndicator
        size="large"
        style={{
          width: width,
          height: height - topbarheight,
        }}
        color="red"
      />
    )}
    {mangapages}</View>;
}

export default MangaPageImages;
