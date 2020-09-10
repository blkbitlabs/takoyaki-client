/* Settings Page - blkbit inc. */

/* NPM Imports */
import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Dimensions,
} from "react-native";

/* Variables */
var RNFS = require("react-native-fs");

/* Constants */
const { width, height } = Dimensions.get("window");
const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;
const scale = (size) => (width / guidelineBaseWidth) * size;
const verticalScale = (size) => (height / guidelineBaseHeight) * size;

/* Styles */
const styles = StyleSheet.create({
  source_container: {
    marginTop: scale(16),
    alignItems: "center",
    width: width - scale(40),
    height: verticalScale(35),
    borderRadius: 9,
    flexDirection: "row",
  },

  source_background: {
    paddingHorizontal: 10,
    height: verticalScale(40),
    width: "98.4%",
    justifyContent: "center",
    backgroundColor: "#423F46",
    borderBottomRightRadius: 7,
    borderTopRightRadius: 7,
  },

  source_text: {
    fontFamily: "SFProDisplay-Regular",
    color: "white",
    fontSize: 17,
  },
});

/* Main Code */
function Source(props) {
  /* Source Component Generator */

  function store_source_id(x) {
    /* Store source id in file */
    RNFS.writeFile(
      RNFS.CachesDirectoryPath + "/" + "Source.txt",
      `${x}`,
      "utf8"
    );
  }

  return (
    <View style={styles.source_container}>
      <TouchableOpacity
        style={styles.source_background}
        onPress={() => {
          store_source_id(String(props.id_));
        }}
      >
        <Text style={styles.source_text}>{props.name_}</Text>
      </TouchableOpacity>
    </View>
  );
}

/* Exports */
export default Source;
