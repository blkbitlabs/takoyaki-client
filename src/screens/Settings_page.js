import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
var RNFS = require('react-native-fs');
import Source from './Source';
import NewTopBar from '../navigation/NewTopBar';
import {hasNotch} from 'react-native-device-info';
import {getStatusBarHeight} from 'react-native-status-bar-height';
const {width, height} = Dimensions.get('window');
const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;
const scale = size => (width / guidelineBaseWidth) * size;
const verticalScale = size => (height / guidelineBaseHeight) * size;
const styles_Settings = StyleSheet.create({
  body: {
    flexDirection: 'column',
    flex: 1,
    paddingTop: hasNotch()
    ? getStatusBarHeight() + verticalScale(36.5) + 20
    : getStatusBarHeight() + verticalScale(51) + 20,
    //justifyContent: 'center',
    position: 'absolute',
    height: height,
    width: width,
    backgroundColor: 'black',
    alignItems: 'flex-start',
  },
  textt: {
    fontFamily: 'SFProDisplay-Bold',
    fontSize: 20,
    color: 'white',
  },
  row_1_container: {
    height: undefined,
    marginBottom: 10,
    paddingLeft: scale(19),
    width: width,
  },
  chapterbutton: {
    marginTop: scale(16),
    alignItems: 'center',
    width: width - scale(40),
    height: verticalScale(35),
    borderRadius: 10,
    flexDirection: 'row',
  },
  chapterbutton_: {
    height: '100%',
    width: '98.4%',
    justifyContent: 'center',
    backgroundColor: '#2B2B2B',
    borderRadius: 10,
  },
  blue_text: {
    fontFamily: 'SFProDisplay-Regular',
    color: '#007AFF',
    fontSize: 17,
    paddingLeft: 20,
  },
  chapterbutton_name: {
    fontFamily: 'SFProDisplay-Light',
    color: 'white',
    fontSize: 15,
  },
});
export function Settings_page({navigation}) {
  const [test, settest] = useState(false);
  const [ids, setids] = useState([]);
  const [names, setnames] = useState([]);
  useEffect(() => {
    settest(false);
    fetch('https://takoyaki.chetasr.co/sources')
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.status === 'ok') {
          // console.log(responseJson.result.ids);
          setnames(responseJson.result.names);
          setids(responseJson.result.ids);
          settest(true);
        }
      });
  }, []);
  let sourecomponent = new Array(ids.length);
  let printthis;
  if (test) {
    // console.log('hmm');
    let i;
    for (i = 0; i < ids.length; i++) {
      const prooops = {
        name_: names[i],
        id_: ids[i],
      };
      sourecomponent[i] = <Source {...prooops} />;
    }
    printthis = sourecomponent;
  } else {
    printthis = (
      <View style={styles_Settings.chapterbutton}>
        <TouchableOpacity style={styles_Settings.chapterbutton_}>
          <Text style={styles_Settings.chapterbutton_name}>..loading</Text>
        </TouchableOpacity>
      </View>
    );
  }
  function cachecleared() {
    RNFS.readDir(RNFS.CachesDirectoryPath)
      .then(e => {
        let okay;
        for (okay = 0; okay < e.length; okay++) {
          RNFS.unlink(e[okay].path)
            .then(console.log('File Deleted'))
            .catch(eror => {
              console.log('On delete gave error : ' + eror);
            });
        }
      })
      .catch(err => {
        console.log(err.message);
      });
  }
  return (
    <NewTopBar>
      <View style={styles_Settings.body}>
        <View style={styles_Settings.row_1_container}>
          <Text style={styles_Settings.textt}>Source Settings</Text>
          {printthis}
        </View>
        <View style={styles_Settings.row_1_container}>
          <Text style={styles_Settings.textt}>Cache Settings</Text>
          <View style={styles_Settings.chapterbutton}>
            <View style={styles_Settings.chapterbutton_}>
              <TouchableOpacity
                onPress={() => {
                  cachecleared();
                }}>
                <Text style={styles_Settings.blue_text}>
                  Clear Cache
                </Text>
              </TouchableOpacity>
            </View>
            
          </View>
        </View>
      </View>
    </NewTopBar>
  );
}
