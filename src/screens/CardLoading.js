/* NewTopbar - blkbit inc. */

/* NPM Imports */
import React from 'react';
import { View, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

/* Constants */
const { width, height } = Dimensions.get('window');
const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;
const scale = (size) => (width / guidelineBaseWidth) * size;
const verticalScale = (size) => (height / guidelineBaseHeight) * size;
const moderateScale = (size, factor = 0.5) =>
  size + (scale(size) - size) * factor;

/* Styles */
const styles = StyleSheet.create({
  card_container: {
    width: scale(125),
    marginHorizontal: scale(8),
    margin: moderateScale(3)
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
function CardLoading(props) {
  /* CardLoading Generator */

  return ( 
    <View style={[styles.card_container, { marginLeft: props.marg }]}>
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
    </View></View>
  );
}

/* Exports */
export default CardLoading;
