/* NewTopbar - blkbit inc. */

/* NPM Imports */
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity
} from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import FastImage from 'react-native-fast-image';

/* Variables */
var RNFS = require('react-native-fs');

/* Constants */
const { width } = Dimensions.get('window');
const guidelineBaseWidth = 350;
const scale = (size) => (width / guidelineBaseWidth) * size;
const moderateScale = (size, factor = 0.5) =>
  size + (scale(size) - size) * factor;

/* Styles */
const styles = StyleSheet.create({
  card_container: {
    width: scale(125),
    marginHorizontal: scale(8),
    margin: moderateScale(3)
  },

  card_image_container: {
    borderRadius: 15,
    width: scale(125)
  },

  card_image: {
    height: '100%',
    borderRadius: 15,
    width: '100%',
    resizeMode: 'cover'
  },

  card_title: {
    marginTop: 6,
    fontFamily: 'SFProDisplay-Medium',
    fontSize: moderateScale(15),
    color: 'white'
  },

  card_subtitle: {
    fontFamily: 'SFProDisplay-Regular',
    fontSize: moderateScale(12),
    color: '#D3D3D3'
  },

  placeholder_image_container: {
    borderRadius: 15,
    backgroundColor: '#222831',
    width: scale(125)
  },

  placeholder_image: {
    backgroundColor: '#222831',
    height: '100%',
    borderRadius: 15,
    width: '100%'
  },

  placeholder_title: {
    marginLeft: moderateScale(4),
    marginTop: 12,
    width: '70%',
    borderRadius: 30,
    height: '12.5%',
    backgroundColor: 'grey'
  },

  placeholder_subtitle: {
    marginLeft: moderateScale(4),
    marginTop: 4,
    width: '80%',
    borderRadius: 30,
    height: '12.5%',
    backgroundColor: 'grey'
  }
});

/* Main Code */
function CardElement(props) {
  /* CardElement Generator */

  const [is_loading, set_loading] = useState(false);
  let image_priority;
  if (props.position > 3) {
    image_priority = FastImage.priority.low;
  } else {
    image_priority = FastImage.priority.high;
  }
  let path = RNFS.CachesDirectoryPath + '/' + String(props.id) + '.jpg';
  useEffect(() => {
    set_loading(true);
  }, [path, props.imgsrc.uri]);
  return (
    <View style={[styles.card_container, { marginLeft: props.marg }]}>
      {is_loading && (
        <View>
          <TouchableOpacity style={[styles.placeholder_image_container, { height: '75%' }]}>
            <ActivityIndicator
              color='#E50914'
              style={styles.placeholder_image}
              animating={props.loading}
            />
          </TouchableOpacity>
          <View style={{ height: '25%', width: '100%' }}>
            <View style={styles.placeholder_title} />
            <View style={styles.placeholder_subtitle} />
          </View>
        </View>
      )}
      <TouchableOpacity
        style={[styles.card_image_container, { height: '75%' }]}
        onPress={() => {
          props.nav.navigate('ProfilePage', {
            id: props.id,
            id_name: props.name,
            id_cover: props.imgsrc.uri,
            nav_mangaa: props.nav
          });
        }}>
        <FastImage
          source={{ uri: props.imgsrc.uri, priority: image_priority }}
          style={styles.card_image}
          resizeMode={FastImage.resizeMode.stretch}
          onLoadEnd={() => set_loading(false)}
        />
      </TouchableOpacity>
      <Text numberOfLines={2} ellipsizeMode='tail' style={styles.card_title}>
        {props.name}
      </Text>
      <Text style={styles.card_subtitle}>{props.time}</Text>
    </View>
  );
}
export default CardElement;
