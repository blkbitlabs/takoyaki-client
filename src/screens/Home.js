import React, {useState, useEffect, Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Dimensions,
  RefreshControl,
} from 'react-native';
import CardElement from '../screens/CardElement';
import CardLoading from '../screens/CardLoading';
import {hasNotch} from 'react-native-device-info';
var RNFS = require('react-native-fs');
import {getStatusBarHeight} from 'react-native-status-bar-height';
const {width, height} = Dimensions.get('window');
const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;
const scale = size => (width / guidelineBaseWidth) * size;
const verticalScale = size => (height / guidelineBaseHeight) * size;
const moderateScale = (size, factor = 0.5) =>
  size + (scale(size) - size) * factor;
const topbarheight = hasNotch()
  ? getStatusBarHeight() + verticalScale(36.5)
  : getStatusBarHeight() + verticalScale(48);

const bottombarheight = hasNotch()
  ? getStatusBarHeight() + verticalScale(29.5)
  : getStatusBarHeight() + verticalScale(32);

const leftpad = scale(19);
const styles_Home = StyleSheet.create({
  containerParent: {
    flex: 1,
    paddingTop: 0, //topbarheight + (hasNotch() ? 7 : 9),
    backgroundColor: '#141414',
  },

  containerParent_: {
    flex: 1,
    backgroundColor: '#141414',
    paddingTop: topbarheight + (hasNotch() ? 7 : 9),
    paddingBottom: bottombarheight,
  },
  container: {
    flexDirection: 'column',
    height: 1.85 * scale(140),
    marginTop: verticalScale(4),
    marginBottom: verticalScale(7),
  },
  Heading: {
    fontFamily: 'SFProDisplay-Heavy',
    paddingLeft: leftpad,
    fontSize: moderateScale(22),
    marginBottom: 5,
    color: 'white',
  },
  rowContainer: {
    flexDirection: 'row',
  },
  test: {
    width: 100,
    height: 100,
    opacity: 0.1,
  },
});
function wait(timeout) {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}
function Home({navigation}) {
  const [data, setnewData] = useState([]);
  const [data_2, setnewData_2] = useState([]);
  const [data_3, setnewData_3] = useState([]);
  const [didfetch_1, set_did_fetch_1] = useState(false);
  const [didfetch_2, set_did_fetch_2] = useState(false);
  const [didfetch_3, set_did_fetch_3] = useState(false);
  useEffect(() => {
    RNFS.readFile(RNFS.CachesDirectoryPath + '/' + 'Source.txt', 'utf8').then(
      e => {
        fetch(`https://takoyaki.chetasr.co/home?${e}`)
          .then(response => response.json())
          .then(responseJson => {
            if (responseJson.status === 'ok') {
              setnewData(responseJson.result.lastupdate);
              set_did_fetch_1(true);
              setnewData_2(responseJson.result.top);
              set_did_fetch_2(true);
              setnewData_3(responseJson.result.recent);
              set_did_fetch_3(true);
            }
          })
          .catch(error => console.log(`UseEffect gave : ${error}`));
      },
    );
  }, []);

  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    set_did_fetch_1(false);
    set_did_fetch_2(false);
    set_did_fetch_3(false);
    RNFS.readFile(RNFS.CachesDirectoryPath + '/' + 'Source.txt', 'utf8').then(
      e => {
        fetch(`https://takoyaki.chetasr.co/home?src=${e}`)
          .then(response => response.json())
          .then(responseJson => {
            if (responseJson.status === 'ok') {
              setnewData(responseJson.result.lastupdate);
              set_did_fetch_1(true);
              setnewData_2(responseJson.result.top);
              set_did_fetch_2(true);
              setnewData_3(responseJson.result.recent);
              set_did_fetch_3(true);
            }
          })
          .catch(error => console.log(` Refresh gave : ${error}`));
      },
    );

    wait(700).then(() => setRefreshing(false));
  }, []);

  //data or Last Updated
  let number_of_elements = data.length;
  const argums = new Array(number_of_elements);
  const LastUpdated = new Array(number_of_elements);
  let j;
  if (didfetch_1) {
    for (j = 0; j < number_of_elements; j++) {
      argums[j] = data[j];
    }
    let i;
    for (i = 0; i < number_of_elements; i++) {
      if (i !== 0) {
        const proops = {
          imgsrc: {
            uri: argums[i].cover,
          },
          name: argums[i].name,
          time: argums[i].time,
          id: argums[i].id,
          nav: navigation,
        };
        LastUpdated[i] = <CardElement {...proops} />;
      } else {
        const proops = {
          imgsrc: {
            uri: argums[i].cover,
          },
          name: argums[i].name,
          time: argums[i].time,
          id: argums[i].id,
          marg: leftpad,
          nav: navigation,
        };
        LastUpdated[i] = <CardElement {...proops} />;
      }
    }
  } else {
    let h;
    for (h = 0; h < 8; h++) {
      if (h !== 0) {
        const prooops = {
          loading: !didfetch_1,
          marg: 0,
        };
        LastUpdated[h] = <CardLoading {...prooops} />;
      } else {
        const prooops = {
          loading: !didfetch_1,
          marg: leftpad,
        };
        LastUpdated[h] = <CardLoading {...prooops} />;
      }
    }
  }
  //data_2 or Top Titles
  let number_of_elements_2 = data_2.length;
  let k;
  const TopTitles = new Array(number_of_elements_2);
  if (didfetch_2) {
    for (k = 0; k < number_of_elements_2; k++) {
      if (k !== 0) {
        const proops_2 = {
          imgsrc: {
            uri: data_2[k].cover,
          },
          name: data_2[k].name,
          time: data_2[k].time,
          id: data_2[k].id,
          nav: navigation,
        };
        TopTitles[k] = <CardElement {...proops_2} />;
      } else {
        const proops_2 = {
          imgsrc: {
            uri: data_2[k].cover,
          },
          name: data_2[k].name,
          time: data_2[k].time,
          id: data_2[k].id,
          marg: leftpad,
          nav: navigation,
        };
        TopTitles[k] = <CardElement {...proops_2} />;
      }
    }
  } else {
    let c;
    for (c = 0; c < 8; c++) {
      if (c !== 0) {
        const prooops = {
          loading: !didfetch_2,
          marg: 0,
        };
        TopTitles[c] = <CardLoading {...prooops} />;
      } else {
        const prooops = {
          loading: !didfetch_2,
          marg: leftpad,
        };
        TopTitles[c] = <CardLoading {...prooops} />;
      }
    }
  }

  //data_3 or New Releases
  let number_of_elements_3 = data_3.length;
  let p;
  const NewReleases = new Array(number_of_elements_3);
  if (didfetch_3) {
    for (p = 0; p < number_of_elements_3; p++) {
      if (p !== 0) {
        const proops_3 = {
          imgsrc: {
            uri: data_3[p].cover,
          },
          name: data_3[p].name,
          time: data_3[p].time,
          id: data_3[p].id,
          nav: navigation,
        };
        NewReleases[p] = <CardElement {...proops_3} />;
      } else {
        const proops_3 = {
          imgsrc: {
            uri: data_3[p].cover,
          },
          name: data_3[p].name,
          time: data_3[p].time,
          id: data_3[p].id,
          marg: leftpad,
          nav: navigation,
        };
        NewReleases[p] = <CardElement {...proops_3} />;
      }
    }
  } else {
    let f;
    for (f = 0; f < 8; f++) {
      if (f !== 0) {
        const prooops = {
          loading: !didfetch_3,
          marg: 0,
        };
        NewReleases[f] = <CardLoading {...prooops} />;
      } else {
        const prooops = {
          loading: !didfetch_3,
          marg: leftpad,
        };
        NewReleases[f] = <CardLoading {...prooops} />;
      }
    }
  }
  return (
    <View style={styles_Home.containerParent}>
      <ScrollView
        horizontal={false}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            tintColor="#E50914"
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }>
        <View style={styles_Home.containerParent_}>
          <View style={styles_Home.container}>
            <Text style={styles_Home.Heading}>Last Updated</Text>
            <ScrollView
              horizontal={true}
              style={styles_Home.rowContainer}
              showsHorizontalScrollIndicator={false}>
              {LastUpdated}
            </ScrollView>
          </View>
          <View style={styles_Home.container}>
            <Text style={styles_Home.Heading}>Top Titles</Text>
            <ScrollView
              horizontal={true}
              style={styles_Home.rowContainer}
              showsHorizontalScrollIndicator={false}>
              {TopTitles}
            </ScrollView>
          </View>
          <View style={styles_Home.container}>
            <Text style={styles_Home.Heading}>New Releases</Text>
            <ScrollView
              horizontal={true}
              style={styles_Home.rowContainer}
              showsHorizontalScrollIndicator={false}>
              {NewReleases}
            </ScrollView>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

export default Home;
