/* Settings Page - blkbit inc. */

/* NPM Imports */
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { hasNotch } from "react-native-device-info";
import { getStatusBarHeight } from "react-native-status-bar-height";

/* Local Imports */
import Source from "./Source";
import NewTopBar from "../navigation/NewTopBar";

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
  body: {
    flexDirection: "column",
    flex: 1,
    paddingTop: hasNotch()
      ? getStatusBarHeight() + verticalScale(36.5) + 20
      : getStatusBarHeight() + verticalScale(51) + 20,
    position: "absolute",
    height: height,
    width: width,
    backgroundColor: "black",
    alignItems: "flex-start",
  },

  settings_block_title: {
    fontFamily: "SFProDisplay-Bold",
    fontSize: 20,
    color: "white",
  },

  settings_block: {
    height: undefined,
    marginBottom: 10,
    paddingLeft: scale(19),
    width: width,
  },

  setting_container: {
    marginTop: scale(16),
    alignItems: "center",
    width: width - scale(40),
    height: verticalScale(35),
    flexDirection: "row",
  },

  setting_background: {
    height: "100%",
    width: "100%",
    justifyContent: "center",
    backgroundColor: "#2B2B2B",
    borderRadius: 10,
  },

  option_text_blue: {
    fontFamily: "SFProDisplay-Regular",
    color: "#007AFF",
    fontSize: 17,
    paddingLeft: 20,
  },
});

/* Main Code */
export function Settings_page({ navigation }) {
  /* Settings Page Generator */

  function clear_cache() {
    /* Clears cache */
    RNFS.readDir(RNFS.CachesDirectoryPath)
      .then((files) => {
        for (let i = 0; i < files.length; i++) {
          RNFS.unlink(files[i].path)
            .then(console.log("Deleted file " + files[i].path))
            .catch((error) => {
              console.error("File delete error: " + error.message);
            });
        }
      })
      .catch((error) => {
        console.error(error.message);
      });
  }

  const [fetch, fetched] = useState(false);
  const [id_array, set_id_array] = useState([]);
  const [name_array, set_name_array] = useState([]);

  useEffect(() => {
    fetched(false);
    fetch("https://takoyaki.chetasr.co/sources")
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.status === "ok") {
          console.log("Fetched data " + JSON.stringify(responseJson));
          set_name_array(responseJson.result.names);
          set_id_array(responseJson.result.ids);
          fetched(true);
        }
      });
  }, []);

  let source_component = new Array(id_array.length);
  let source_components_list;

  if (fetch) {
    for (let i = 0; i < id_array.length; i++) {
      const source_props = {
        name_: name_array[i],
        id_: id_array[i],
      };
      source_component[i] = <Source {...source_props} />;
    }
    source_components_list = source_component;
  } else {
    source_components_list = (
      <View style={styles.setting_container}>
        <TouchableOpacity style={styles_Settings.setting_background}>
          <Text style={styles_Settings.chapterbutton_name}>..loading</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <NewTopBar>
      <View style={styles.body}>
        <View style={styles.settings_block}>
          <Text style={styles.settings_block_title}>Source Settings</Text>
          {source_components_list}
        </View>
        <View style={styles.settings_block}>
          <Text style={styles.settings_block_title}>Cache Settings</Text>
          <View style={styles.setting_container}>
            <View style={styles.setting_background}>
              <TouchableOpacity
                onPress={() => {
                  clear_cache();
                }}
              >
                <Text style={styles.option_text_blue}>Clear Cache</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </NewTopBar>
  );
}
