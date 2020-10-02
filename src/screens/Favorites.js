/* Favorites Page - blkbit inc. */

/* NPM Imports */
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TextInput, Dimensions } from 'react-native';
import { Icon } from 'react-native-eva-icons';
import { Q } from '@nozbe/watermelondb';

/* Local Imports */
import { db } from '../db/database';
import CardElement from './CardElement'
import CardLoading from './CardLoading'
import NewTopBar from '../navigation/NewTopBar';

/* Variables */
const favorites_db = db.collections.get('favorites');

const { width } = Dimensions.get('window');
const guidelineBaseWidth = 350;
const scale = (size) => (width / guidelineBaseWidth) * size;
const moderateScale = (size, factor = 0.5) =>
  size + (scale(size) - size) * factor;

/* Styles */
const styles = StyleSheet.create({
  container_main: {
    backgroundColor: 'black',
    width: '100%',
    height: '100%'
  },

  carousel_container: {
    flexDirection: 'column',
    alignSelf: 'center',
    width: '90%',
    height: '96%'
  },
  
  carousel_container_row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    height: '40%',
    width: '100%',
    paddingLeft:0,
    paddingTop: '3%'
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

  const [len, set_len] = useState(0);
  const [search_result, set_result] = useState([]);
  let [is_loaded, set_is_loaded] = useState(false)
  let [manga_url, set_manga_url] = useState('')
  
    
  function search(text) {
    /* Search DB for manga */
    // TODO: Use search results
    (async () => {
      if(text != ""){
        set_result(
          await favorites_db
          .query(Q.where('name', Q.like(`%${Q.sanitizeLikeString(text)}%`)))
          .fetch()
          //db.get('favorites')
        )}
      else{
       set_result( await favorites_db
          .query()
          .fetch())

      
    set_len(Object.keys(search_result).length);
      }
    set_is_loaded(true)
    })();
  }
  let manga_fav_
  console.log(len)
  if(1){
   manga_fav_ = new Array(len);
  for( let i = 0; i < len; i++){
    const props = {
      imgsrc: {
        uri: search_result[i]["url"]
      },
      name: search_result[i]["name"],
      id: search_result[i]["manga_id"],
      marg: 3,
      nav: navigation,
      position:   1
    };
    manga_fav_[i] = <CardElement {...props} />
  }
  } else {
    const props ={
      loading: !(is_loaded)
    }
    manga_fav_ = <CardLoading {...props} />
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
            onChangeText={(text) => search(text)}
            defaultValue={""}
          />
        </View>
        <View style={styles.carousel_container} >
          <View style={styles.carousel_container_row} >
            {manga_fav_}
          </View>
        </View>
      </View>
    </NewTopBar>
  );
}

/* Exports */
export default Favorites;
/*
[
{"__changes": null, "_hasPendingDelete": false, "_hasPendingUpdate": false, "_isCommitted": true, "_isEditing": false, "_raw": {"_changed": "", "_status": "created", "id": "q628pjmyhhuczl6l", "manga_id": "55365", "name": "MEMORIZE", "url": "https://mangadex.org/images/manga/55365.jpeg?1601206137"}, "_subscribers": [], "collection": {"_cache": [RecordCache], "_subscribers": [Array], "changes": [Subject], "database": [Database], "modelClass": [Function FavoritesModel]}}, 
{"__changes": null, "_hasPendingDelete": false, "_hasPendingUpdate": false, "_isCommitted": true, "_isEditing": false, "_raw": {"_changed": "", "_status": "created", "id": "ocoafkus77jbzxhz", "manga_id": "37071", "name": "Inso's Law", "url": "https://mangadex.org/images/manga/37071.jpeg?1594358410"}, "_subscribers": [], "collection": {"_cache": [RecordCache], "_subscribers": [Array], "changes": [Subject], "database": [Database], "modelClass": [Function FavoritesModel]}}, 
{"__changes": null, "_hasPendingDelete": false, "_hasPendingUpdate": false, "_isCommitted": true, "_isEditing": false, "_raw": {"_changed": "", "_status": "created", "id": "e6c2k42jycq4wdir", "manga_id": "31477", "name": "Solo Leveling", "url": "https://mangadex.org/images/manga/31477.jpeg?1596241657"}, "_subscribers": [], "collection": {"_cache": [RecordCache], "_subscribers": [Array], "changes": [Subject], "database": [Database], "modelClass": [Function FavoritesModel]}}
]*/