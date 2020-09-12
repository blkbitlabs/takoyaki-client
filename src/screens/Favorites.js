import React, {useState, useEffect} from 'react';
import {StyleSheet, View, TextInput, Text} from 'react-native';
import { BlurView, VibrancyView } from '@react-native-community/blur';
import NewTopBar from '../navigation/NewTopBar';
import { TouchableOpacity } from 'react-native-gesture-handler';
var RNFS = require('react-native-fs');
const styles = StyleSheet.create(
  {
    container_main:{
      backgroundColor: '#141414',
      width: '100%',
      height: '100%'
    },
    searchbar:{
      alignSelf: 'center',
      opacity: 0.9,
      backgroundColor: 'grey',
      marginTop: '30%',
      width: '90%',
      height: '4%',
      borderRadius: 10,
      fontSize: 20,
      fontFamily: 'SFProDisplay-Regular',
      paddingLeft: 24,
      includeFontPadding: true,
      position: 'absolute',
    },
  }
)
function Favorites({navigation}) {
  useEffect(() => {
    if(text != ""){
      search(text)
    }
  });
  const [dbtext, setdbtext] = useState("")
function search(text){

  RNFS.readFile(RNFS.CachesDirectoryPath + '/' + 'Favdb.txt', 'utf8').then(
    e => { setdbtext(e)
    },
  );
  console.log(dbtext.split(','))
}
  const [text, setText] = useState("")
  return (
    <NewTopBar> 
      <BlurView style={styles.container_main} blurType="extraDark">
        <TextInput style={styles.searchbar} placeholder="Search"  onChangeText={text => setText(text)} defaultValue={text} /> 
      </BlurView>
    </NewTopBar>
  );
}

export default Favorites;
