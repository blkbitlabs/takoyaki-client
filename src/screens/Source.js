/* Source Component - blkbit inc. */

/* NPM Imports */
import React from 'react';
import {
  Dimensions, StyleSheet, Text, TouchableOpacity, View
} from 'react-native';

/* Variables */
var RNFS = require('react-native-fs');

/* Constants */
const { width, height } = Dimensions.get('window');
const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;
const scale = (size) => (width / guidelineBaseWidth) * size;
const verticalScale = (size) => (height / guidelineBaseHeight) * size;

/* Styles */
const styles = StyleSheet.create({
  source_container: {
    marginTop: scale(16),
    alignItems: 'center',
    width: width - scale(40),
    height: verticalScale(35),
    flexDirection: 'row'
  },

  source_background: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    backgroundColor: '#2B2B2B',
    borderRadius: 10
  },

  source_text: {
    fontFamily: 'SFProDisplay-Regular',
    color: 'white',
    fontSize: 17,
    paddingLeft: 20
  }
});

/* Main Code */
function Source(props) {
  /* Source Component Generator */

  function store_source_id(x) {
    /* Store source id in file */

    RNFS.writeFile(
      RNFS.CachesDirectoryPath + '/' + 'current_source.db',
      `${x}`,
      'utf8'
    );
    console.log('Stored source ' + x);
  }

  return (
      <TouchableOpacity
        style={styles.source_background}
        onPress={() => {
          store_source_id(String(props.id_));
        }}>
        <Text style={styles.source_text}>{props.name_}</Text>
      </TouchableOpacity>
  );
}

/* Exports */
export default Source;
