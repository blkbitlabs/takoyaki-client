/* Favorites Page - blkbit inc. */

/* NPM Imports */
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TextInput, Text } from 'react-native';
import { Icon } from 'react-native-eva-icons';
import NewTopBar from '../navigation/NewTopBar';
import { Q } from '@nozbe/watermelondb';

/* Local Imports */
import { db } from '../db/database';

/* Variables */
const favorites_db = db.collections.get('favorites');

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

  const [search_text, set_search_text] = useState('');

  const [search_result, set_result]  = useState("")

  function search(text) {
    /* Search DB for manga */
    // TODO: Use search results
    (async () => {
      console.log(
        set_result(await favorites_db
          .query(Q.where('name', Q.like(`%${Q.sanitizeLikeString(text)}%`)))
          .fetch())
      );
    })();
  }
  console.log(search_result)

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
