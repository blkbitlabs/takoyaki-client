/* Favorites Page - blkbit inc. */

/* NPM Imports */
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TextInput, Text } from 'react-native';
import { Icon } from 'react-native-eva-icons';
import NewTopBar from '../navigation/NewTopBar';

/* Variables */
var RNFS = require('react-native-fs');

/* Styles */
const styles = StyleSheet.create({
  container_main: {
    backgroundColor: 'black',
    width: '100%',
    height: '100%'
  },

  search_bar: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    marginTop: '28%',
    width: '90%',
    height: '4%',
    borderRadius: 10
  },

  search_icon: {
    marginLeft: 10
  },

  search_text: {
    color: 'rgba(255,255,255,1)',
    opacity: 1,
    marginLeft: 40,
    fontSize: 17,
    fontFamily: 'SFProDisplay-Regular',
    includeFontPadding: true,
    position: 'absolute'
  }
});

/* Main Code */
function Favorites({ navigation }) {
  /* Favorites Page Generator */

  useEffect(() => {
    if (search_text != '') {
      search(search_text);
    }
  });

  const [db_data, store_db] = useState('');
  const [search_text, set_search_text] = useState('');

  function search(text) {
    RNFS.readFile(RNFS.CachesDirectoryPath + '/' + 'favorites.db', 'utf8').then(
      (e) => {
        store_db(e);
      }
    );
    console.log(db_data.split(','));
  }

  return (
    <NewTopBar>
      <View style={styles.container_main}>
        <View style={styles.search_bar}>
          <Icon
            style={styles.search_icon}
            name='search-outline'
            width={20}
            height={20}
            fill='rgba(255,255,255,0.5)'
          />
          <TextInput
            style={styles.search_text}
            placeholder='Search'
            placeholderTextColor='rgba(255,255,255,0.5)'
            returnKeyType='search'
            onChangeText={(text) => set_search_text(text)}
            defaultValue={search_text}
          />
        </View>
      </View>
    </NewTopBar>
  );
}

/* Exports */
export default Favorites;
