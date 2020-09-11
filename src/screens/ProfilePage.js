/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import { Icon } from 'react-native-eva-icons';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  FlatList,
  SafeAreaView
} from 'react-native';
import { BlurView, VibrancyView } from '@react-native-community/blur';
var RNFS = require('react-native-fs');
import { hasNotch } from 'react-native-device-info';
import { getStatusBarHeight } from 'react-native-status-bar-height';
const { width, height } = Dimensions.get('window');
const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;
const scale = size => (width / guidelineBaseWidth) * size;
const verticalScale = size => (height / guidelineBaseHeight) * size;
const moderateScale = (size, factor = 0.5) =>
  size + (scale(size) - size) * factor;
const chaptersheight = numberofchapters => {
  if (hasNotch()) {
    return numberofchapters - 5;
  } else {
    return numberofchapters - 1;
  }
};
const topbarheight = hasNotch()
  ? getStatusBarHeight() + verticalScale(36.5)
  : getStatusBarHeight() + verticalScale(48);
const leftpad = scale(19);
const z = hasNotch()
  ? topbarheight + verticalScale(70)
  : topbarheight + verticalScale(74);
const styles_profilepage = StyleSheet.create({
  container: {
    width: width,
    flex: 1,
    position: 'absolute',
    resizeMode: 'cover',
  },
  container_2: {
    
  },
  overlayView: {
    //marginTop: topbarheight + leftpad,
    width: width,
    height: 500,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    //position: 'absolute',
    flexDirection: 'column',
  },
  overlayViewInside: {
    flexDirection: 'row',
    width: '100%',
    height: 10,
  },
  overlayViewInsideImageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 10,
    width: 140,
    marginLeft: leftpad - (70 - 66),
  },
  overlayViewInsideTitle: {
    alignSelf: 'flex-end',
    height: 10,
    width: width - 140,
    padding: '4.0%',
    paddingRight: '16%',
  },
  overlayViewDescription: {
    paddingHorizontal: leftpad - (70 - 66),
    paddingTop: leftpad / 2,
    width: '100%',
    height: 10,
  },
  subtitle: {
    fontFamily: 'SFProDisplay-Semibold',
    color: 'white',
    fontSize: moderateScale(16),
  },
  description: {
    paddingTop: '2.5%',
    paddingBottom: '5%',
    fontFamily: 'SFProDisplay-Light',
    color: 'white',
    fontSize: moderateScale(14),
  },
  title: {
    fontFamily: 'SFProDisplay-Bold',
    color: 'white',
    fontSize: moderateScale(18),
  },
  coverImage: {
    width: 126 + 6,
    height: 10,
    borderRadius: 12.5,
  },
  coverImagebg: {
    position: 'absolute',
    borderRadius: 15,
    width: 132 + 6,
    height: 10,
  },
  author: {
    fontFamily: 'SFProDisplay-Light',
    color: '#868686',
  },
  tagscontainer: {
    paddingTop: 7,
    paddingBottom: 4,
    paddingRight: 0,
    marginBottom: 13,
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: undefined,
    height: 10, //width * 0.0966183574879227,
  },
  tags: {
    paddingHorizontal: scale(7),
    marginVertical: 6,
    marginRight: scale(9),
    width: undefined,
    height: 10,
    justifyContent: 'center',
    borderRadius: 40,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  tagstext: {
    alignSelf: 'center',
    paddingHorizontal: scale(5),
    fontFamily: 'SFProDisplay-Semibold',
    fontSize: moderateScale(12, 0.25),
    color: 'white',
  },
  chapterscontainer: {
    fontFamily: 'SFProDisplay-Semibold',
    color: 'white',
    fontSize: moderateScale(16),
    marginTop: verticalScale(0),
    marginBottom: 12.4,
  },
  chapterbutton: {
    marginVertical: verticalScale(2),
    alignItems: 'center',
    width: width - scale(40),
    height: 10,
    borderRadius: 9,
    flexDirection: 'row',
  },
  chapterbutton_: {
    height: '100%',
    width: '98.4%',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderBottomRightRadius: 7,
    borderTopRightRadius: 7,
  },
  chapterbutton_tag: {
    width: '1.6%',
    height: '100%',
    backgroundColor: '#5F5F5F',
    borderBottomLeftRadius: 7,
    borderTopLeftRadius: 7,
  },
  chapterbutton_name: {
    paddingLeft: scale(15),
    paddingRight: scale(15),
    fontFamily: 'SFProDisplay-Light',
    color: 'white',
    fontSize: moderateScale(15),
  },
  title_loading: {
    marginBottom: 5,
    width: '70%',
    height: '10%',
    backgroundColor: 'grey',
    borderRadius: 10,
  },
  description_loading: {
    marginVertical: 7,
    height: '2.9%',
    borderRadius: 10,
    backgroundColor: 'grey',
  },
  author_loading: {
    marginTop: 2,
    width: ' 20%',
    height: '10%',
    borderRadius: 10,
    backgroundColor: 'grey',
  },
  newbuttons_container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: leftpad - (70 - 66),
    marginTop: 4,
    width: '100%',
    height: (height / width) * 20,
  },
  newbuttons: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 8,
    width: '47%',
    height: '100%',
  },
  newbuttonfont: {
    color: 'white',
    opacity: 1,
    fontFamily: 'SFProDisplay-Regular',
    alignSelf: 'center',
    paddingTop: scale(9.5),
    fontSize: moderateScale(17),
  }
});
function ProfilePage({ route, navigation }) {
  const { id } = route.params;
  const { id_name } = route.params;
  const { id_cover } = route.params;
  const [srcc, set_srcc] = useState('');
  let url = 'https://takoyaki.chetasr.co/manga';
  const [jason, set_jason] = useState({
    author: 'chetas',
    chapters: [],
    chapters_number: 0,
    description: 'NIL',
  });
  const xml = `
  <svg width="32" height="32" viewBox="0 0 32 32">
    <style>
      .red {
        fill: #ff0000;
      }
    </style>
    <rect class="red" x="0" y="0" width="32" height="32" />
  </svg>
`;
  let [didload, setdidload] = useState(false);
  useEffect(() => {
    RNFS.readFile(RNFS.CachesDirectoryPath + '/' + 'current_source.db', 'utf8').then(
      e => {
        setdidload(false);
        set_srcc(e);
        fetch(url + '?id=' + `${id}` + `&src=${e}`)
          .then(response => response.json())
          .then(responseJson => {
            set_jason(responseJson.result);
            setdidload(true);
          })
          .catch(error => console.error(error));
      },
    );
  }, [id, url]);
  function savethis(){
    let arr = [id, id_name, (JSON.stringify(id_cover["uri"])).substring(1,((JSON.stringify(id_cover["uri"])).length) - 1)]
   RNFS.writeFile(
      RNFS.CachesDirectoryPath + '/' + 'Favdb.txt',
      `${arr + ','}`,
      'utf8',
    );
  }
  let author = 'NIL';
  let chapters_data = [];
  let description = 'NIL';
  let how_many_chapers = 0;
  let how_many_chapers_extra = 0;
  let genres = [];
  let chapters_button = new Array(how_many_chapers);
  let genres_button = new Array(genres.length);
  let Title_Text;
  let Not_Title_Text;
  let i, oo;
  if (didload && srcc != '') {
    author = jason.author;
    let o;
    for (o = 0; o < jason.genres.length; o++) {
      genres[o] = jason.genres[o];
    }
    chapters_data = jason.chapters;
    how_many_chapers = jason.chapters_number;
    description = jason.description;
    how_many_chapers_extra =
      description.length > 300 ? (description.length - 300) / 25 / 0.83 : 0;
    for (i = 0; i < how_many_chapers; i++) {
      let hmmkthen = String(chapters_data[i].id);
      chapters_button[i] = (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('MangaReader', {
              id_chap: hmmkthen,
              id_src: srcc,
            });
          }}
          style={styles_profilepage.chapterbutton}>
          <View style={styles_profilepage.chapterbutton_tag} />
          <View style={styles_profilepage.chapterbutton_}>
            <Text style={styles_profilepage.chapterbutton_name}>
              {chapters_data[i].title}
            </Text>
          </View>
        </TouchableOpacity>
      );
    }
    for (oo = 0; oo < genres.length; oo++) {
      genres_button[oo] = (
        <View style={styles_profilepage.tags}>
          <Text style={styles_profilepage.tagstext}>
            {genres[oo].toUpperCase()}
          </Text>
        </View>
      );
    }
    Title_Text = (
      <View style={styles_profilepage.overlayViewInsideTitle}>
        <Text
          numberOfLines={4}
          ellipsizeMode="tail"
          style={styles_profilepage.title}>
          {id_name}
        </Text>
        <Text style={styles_profilepage.author}>{author}</Text>
      </View>
    );
    Not_Title_Text = (
        <SafeAreaView style={{flex: 1}}>
          <FlatList>
            data={jason.chapters}
            renderItem={(item) => 
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('MangaReader', {
                    id_chap: item.id,
                    id_src: srcc,
                  });
                }}
                style={styles_profilepage.chapterbutton}>
                <View style={styles_profilepage.chapterbutton_tag} />
                <View style={styles_profilepage.chapterbutton_}>
                  <Text style={styles_profilepage.chapterbutton_name}>
                    {item.title}
                  </Text>
                </View>
              </TouchableOpacity>
            }
            keyExtractor={(item) => item.id}
          </FlatList>
        </SafeAreaView>      
    );
  } else {
    Title_Text = (
      <View style={styles_profilepage.overlayViewInsideTitle}>
        <View style={styles_profilepage.title_loading} />
        <View style={styles_profilepage.author_loading} />
      </View>
    );
    Not_Title_Text = (
      <View style={styles_profilepage.overlayViewDescription}>
        <View
          style={[styles_profilepage.description_loading, { width: '40%' }]}
        />
        <View
          style={[styles_profilepage.description_loading, { width: '60%' }]}
        />
        <View
          style={[styles_profilepage.description_loading, { width: '40%' }]}
        />
        <View
          style={[styles_profilepage.description_loading, { width: '50%' }]}
        />
        <View
          style={[styles_profilepage.description_loading, { width: '20%' }]}
        />
        <View
          style={[styles_profilepage.description_loading, { width: '20%' }]}
        />
        <View
          style={[styles_profilepage.description_loading, { width: '60%' }]}
        />
        <View
          style={[styles_profilepage.description_loading, { width: '30%' }]}
        />
        <View
          style={[styles_profilepage.description_loading, { width: '10%' }]}
        />
      </View>
    );
  }
  return (
    <View style={styles_profilepage.container_2}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#6a51ae"
        opacity={0.8}
      />
      <Image
        source={id_cover}
        blurRadius={27}
        style={styles_profilepage.container}
      />
      <ScrollView
        horizontal={false}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        <BlurView
          blurType="extraDark"
          blurAmount={10}
        />
        <View style={styles_profilepage.overlayView}>
          <View style={styles_profilepage.overlayViewInside}>
            <View style={styles_profilepage.overlayViewInsideImageContainer}>
              <BlurView
                style={styles_profilepage.coverImagebg}
                blurType="extraDark"
                blurAmount={70}
                blurRadius={200}
              />
              <Image style={styles_profilepage.coverImage} source={id_cover} />
            </View>
            {Title_Text}
          </View>
          <View style={styles_profilepage.newbuttons_container}>
            <TouchableOpacity style={styles_profilepage.newbuttons} activeOpacity={0.2} onPress={() => savethis(id)} >
              <View flexDirection="row" style={{justifyContent: "center", alignItems: "center"}}><Icon name='star-outline' width={19} height={19} fill='white' style={{alignSelf: "center", marginRight: 4, marginTop: 11}}/>
              <Text style={styles_profilepage.newbuttonfont}> Add to Starred </Text></View>
            </TouchableOpacity>
            <TouchableOpacity style={styles_profilepage.newbuttons} activeOpacity={0.2} blurType="chromeMaterialDark">
            <View flexDirection="row" style={{justifyContent: "center", alignItems: "center"}}><Icon name='cloud-download-outline' width={19} height={19} fill='white' style={{alignSelf: "center", marginRight: 4, marginTop: 11}}/>
              <Text style={styles_profilepage.newbuttonfont}> Download </Text></View>
            </TouchableOpacity>
          </View>
          
        </View>
        
      </ScrollView>
      <View >
        {Not_Title_Text}
      </View>
    </View>
  );
}
export default ProfilePage;
