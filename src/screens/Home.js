/* Home Page - blkbit inc. */

/* NPM Imports */
import React, { useState, useEffect } from 'react';
import {
  Dimensions, RefreshControl, ScrollView, StyleSheet, Text, View
} from 'react-native';
import { hasNotch } from 'react-native-device-info';
import { getStatusBarHeight } from 'react-native-status-bar-height';

/* Local Imports */
import CardElement from '../screens/CardElement';
import CardLoading from '../screens/CardLoading';

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

const leftpad = scale(19);

/* Styles */
const styles = StyleSheet.create({
  parent_container: {
    flex: 1,
    paddingTop: 0,
    backgroundColor: 'black'
  },

  body_container: {
    flex: 1,
    backgroundColor: 'black',
    paddingBottom: bottombarheight
  },

  section_container: {
    flexDirection: 'column',
    height: 1.85 * scale(140),
    marginTop: verticalScale(4),
    marginBottom: verticalScale(7)
  },

  heading_text: {
    fontFamily: 'SFProDisplay-Heavy',
    paddingLeft: leftpad,
    fontSize: moderateScale(22),
    marginBottom: 5,
    color: 'white'
  },

  card_row_container: {
    flexDirection: 'row'
  }
});

/* Main Code */
function wait(timeout) {
  /* Async wait for duration */

  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
}

function Home({ navigation }) {
  /* Home Page Generator */

  const [last_updated_data, set_last_updated] = useState([]);
  const [top_data, set_top_data] = useState([]);
  const [new_data, set_new_data] = useState([]);
  const [isfetched_last_updated, set_fetched_last_updated] = useState(false);
  const [isfetched_top, set_fetched_top] = useState(false);
  const [isfetched_new, set_fetched_new] = useState(false);

  useEffect(() => {
    RNFS.readFile(
      RNFS.CachesDirectoryPath + '/' + 'current_source.db',
      'utf8'
    ).then((source) => {
      fetch(`https://takoyaki.chetasr.co/home?src=${source}`)
        .then((response) => response.json())
        .then((responseJson) => {
          if (responseJson.status === 'ok') {
            set_last_updated(responseJson.result.lastupdate);
            set_fetched_last_updated(true);
            set_top_data(responseJson.result.top);
            set_fetched_top(true);
            set_new_data(responseJson.result.recent);
            set_fetched_new(true);
          }
        })
        .catch((error) => console.error(`useEffect gave: ${error}`));
    });
  }, []);

  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    set_fetched_last_updated(false);
    set_fetched_top(false);
    set_fetched_new(false);
    RNFS.readFile(
      RNFS.CachesDirectoryPath + '/' + 'current_source.db',
      'utf8'
    ).then((source) => {
      fetch(`https://takoyaki.chetasr.co/home?src=${source}`)
        .then((response) => response.json())
        .then((responseJson) => {
          if (responseJson.status === 'ok') {
            set_last_updated(responseJson.result.lastupdate);
            set_fetched_last_updated(true);
            set_top_data(responseJson.result.top);
            set_fetched_top(true);
            set_new_data(responseJson.result.recent);
            set_fetched_new(true);
          }
        })
        .catch((error) => console.error(`Refresh gave: ${error}`));
    });

    wait(700).then(() => setRefreshing(false));
  }, []);

  const last_updated_component = new Array(last_updated_data.length);
  if (isfetched_last_updated) {
    for (let i = 0; i < last_updated_data.length; i++) {
      if (i !== 0) {
        const props = {
          imgsrc: {
            uri: last_updated_data[i].cover
          },
          name: last_updated_data[i].name,
          time: last_updated_data[i].time,
          id: last_updated_data[i].id,
          nav: navigation
        };
        last_updated_component[i] = <CardElement {...props} />;
      } else {
        const props = {
          imgsrc: {
            uri: last_updated_data[i].cover
          },
          name: last_updated_data[i].name,
          time: last_updated_data[i].time,
          id: last_updated_data[i].id,
          marg: leftpad,
          nav: navigation
        };
        last_updated_component[i] = <CardElement {...props} />;
      }
    }
  } else {
    for (let h = 0; h < 8; h++) {
      if (h !== 0) {
        const props = {
          loading: !isfetched_last_updated,
          marg: 0
        };
        last_updated_component[h] = <CardLoading {...props} />;
      } else {
        const props = {
          loading: !isfetched_last_updated,
          marg: leftpad
        };
        last_updated_component[h] = <CardLoading {...props} />;
      }
    }
  }

  const top_component = new Array(top_data.length);
  if (isfetched_top) {
    for (let k = 0; k < top_data.length; k++) {
      if (k !== 0) {
        const props = {
          imgsrc: {
            uri: top_data[k].cover
          },
          name: top_data[k].name,
          time: top_data[k].time,
          id: top_data[k].id,
          nav: navigation
        };
        top_component[k] = <CardElement {...props} />;
      } else {
        const props = {
          imgsrc: {
            uri: top_data[k].cover
          },
          name: top_data[k].name,
          time: top_data[k].time,
          id: top_data[k].id,
          marg: leftpad,
          nav: navigation
        };
        top_component[k] = <CardElement {...props} />;
      }
    }
  } else {
    for (let c = 0; c < 8; c++) {
      if (c !== 0) {
        const props = {
          loading: !isfetched_top,
          marg: 0
        };
        top_component[c] = <CardLoading {...props} />;
      } else {
        const props = {
          loading: !isfetched_top,
          marg: leftpad
        };
        top_component[c] = <CardLoading {...props} />;
      }
    }
  }

  const new_releases_component = new Array(new_data.length);
  if (isfetched_new) {
    for (let p = 0; p < new_data.length; p++) {
      if (p !== 0) {
        const props = {
          imgsrc: {
            uri: new_data[p].cover
          },
          name: new_data[p].name,
          time: new_data[p].time,
          id: new_data[p].id,
          nav: navigation
        };
        new_releases_component[p] = <CardElement {...props} />;
      } else {
        const props = {
          imgsrc: {
            uri: new_data[p].cover
          },
          name: new_data[p].name,
          time: new_data[p].time,
          id: new_data[p].id,
          marg: leftpad,
          nav: navigation
        };
        new_releases_component[p] = <CardElement {...props} />;
      }
    }
  } else {
    for (let f = 0; f < 8; f++) {
      if (f !== 0) {
        const props = {
          loading: !isfetched_new,
          marg: 0
        };
        new_releases_component[f] = <CardLoading {...props} />;
      } else {
        const props = {
          loading: !isfetched_new,
          marg: leftpad
        };
        new_releases_component[f] = <CardLoading {...props} />;
      }
    }
  }

  return (
    <View style={styles.parent_container}>
      <ScrollView
        horizontal={false}
        contentInset={{ top: topbarheight + (hasNotch() ? 7 : 9) }}
        contentOffset={{ y: -topbarheight - (hasNotch() ? 7 : 9) }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            tintColor='#E50914'
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }>
        <View style={styles.body_container}>
          <View style={styles.section_container}>
            <Text style={styles.heading_text}>Last Updated</Text>
            <ScrollView
              horizontal={true}
              style={styles.card_row_container}
              showsHorizontalScrollIndicator={false}>
              {last_updated_component}
            </ScrollView>
          </View>
          <View style={styles.section_container}>
            <Text style={styles.heading_text}>Top Titles</Text>
            <ScrollView
              horizontal={true}
              style={styles.card_row_container}
              showsHorizontalScrollIndicator={false}>
              {top_component}
            </ScrollView>
          </View>
          <View style={styles.section_container}>
            <Text style={styles.heading_text}>New Releases</Text>
            <ScrollView
              horizontal={true}
              style={styles.card_row_container}
              showsHorizontalScrollIndicator={false}>
              {new_releases_component}
            </ScrollView>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

/* Exports */
export default Home;
