/* Settings Page - blkbit inc. */

/* NPM Imports */
import React, { useState, useEffect } from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView
} from 'react-native';
import { hasNotch } from 'react-native-device-info';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { db } from '../db/database';

/* Local Imports */
import NewTopBar from '../navigation/NewTopBar';

/* Variables */
var RNFS = require('react-native-fs');

/* Constants */
const { width, height } = Dimensions.get('window');
const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;
const scale = (size) => (width / guidelineBaseWidth) * size;
const verticalScale = (size) => (height / guidelineBaseHeight) * size;
const moderateScale = (size, factor = 0.5) =>
  size + (scale(size) - size) * factor;
const topbarheight = hasNotch()
  ? getStatusBarHeight() + verticalScale(36.5)
  : getStatusBarHeight() + verticalScale(48);

const bottombarheight = hasNotch()
  ? getStatusBarHeight() + verticalScale(29.5)
  : getStatusBarHeight() + verticalScale(32);
/* Styles */
const styles = StyleSheet.create({
  body: {
    flexDirection: 'column',
    flex: 1,
    paddingTop: topbarheight + (hasNotch() ? 7 : 9),
    height: height,
    width: width,
    backgroundColor: 'black',
    alignItems: 'flex-start'
  },

  settings_block_title: {
    fontFamily: 'SFProDisplay-Heavy',
    fontSize: moderateScale(22),
    marginBottom: verticalScale(10),
    color: 'white'
  },

  settings_block: {
    marginBottom: scale(10),
    paddingLeft: scale(19),
    marginTop: verticalScale(4),
    marginBottom: verticalScale(4)
  },

  setting_container: {
    alignItems: 'center',
    flexDirection: 'column'
  },

  setting_background: {
    height: verticalScale(35),
    width: width - scale(40),
    marginBottom: verticalScale(10),
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    backgroundColor: '#2B2B2B',
    borderRadius: 10
  },

  option_text_blue: {
    fontFamily: 'SFProDisplay-Regular',
    color: '#007AFF',
    fontSize: 17,
    paddingLeft: 20,
    alignSelf: 'flex-start'
  },

  option_text_dropdown: {
    fontFamily: 'SFProDisplay-Regular',
    color: 'white',
    fontSize: 17,
    paddingRight: 20,
    alignSelf: 'flex-end'
  },

  option_text_white: {
    fontFamily: 'SFProDisplay-Regular',
    color: '#B8B8B8',
    fontSize: 17,
    paddingLeft: 20,
    alignSelf: 'flex-start'
  }
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
            .then(console.log('Deleted file ' + files[i].path))
            .catch((error) => {
              console.error('File delete error: ' + error.message);
            });
        }
      })
      .catch((error) => {
        console.error(error.message);
      });
  }

  const [isfetched, fetched] = useState(false);
  const [id_array, set_id_array] = useState([]);
  const [name_array, set_name_array] = useState([]);

  useEffect(() => {
    fetched(false);
    fetch('https://takoyaki.chetasr.co/sources')
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.status === 'ok') {
          console.log('Fetched data ' + JSON.stringify(responseJson));
          set_name_array(responseJson.result.names);
          set_id_array(responseJson.result.ids);
          fetched(true);
        }
      });
  }, []);

  function store_source_id(x) {
    /* Store source id in file */

    RNFS.writeFile(
      RNFS.CachesDirectoryPath + '/' + 'current_source.db',
      `${x}`,
      'utf8'
    );
    console.log('Stored source ' + x);
  }

  let source_component = new Array(id_array.length);
  let source_components_list;

  if (isfetched) {
    for (let i = 0; i < id_array.length; i++) {
      const source_props = {
        name_: name_array[i],
        id_: id_array[i]
      };
      source_component[i] = (
        <View style={styles.setting_background}>
          <View>
            <Text style={styles.option_text_white}>Source</Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              store_source_id(String(source_props.id_));
            }}>
            <Text style={styles.option_text_dropdown}>
              {source_props.name_}
            </Text>
          </TouchableOpacity>
        </View>
      );
    }
    source_components_list = (
      <View style={styles.setting_container}>{source_component}</View>
    );
  } else {
    source_components_list = (
      <View style={styles.setting_container}>
        <View style={styles.setting_background}>
          <View>
            <Text style={styles.option_text_white}>Source</Text>
          </View>
          <TouchableOpacity>
            <Text style={styles.option_text_dropdown}>Loading</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <NewTopBar>
      <ScrollView
        horizontal={false}
        showsVerticalScrollIndicator={false}
        style={{ backgroundColor: 'black' }}>
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
                  }}>
                  <Text style={styles.option_text_blue}>Clear Cache</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.setting_container}>
              <View style={styles.setting_background}>
                <TouchableOpacity
                  onPress={async () => {
                    await db.action(async () => {
                      db.unsafeResetDatabase();
                    });
                  }}>
                  <Text style={styles.option_text_blue}>Clear DB</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </NewTopBar>
  );
}