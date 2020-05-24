import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  Platform,
} from 'react-native';
import {BlurView} from '@react-native-community/blur';
import {hasNotch} from 'react-native-device-info';
import {getStatusBarHeight} from 'react-native-status-bar-height';
const {width, height} = Dimensions.get('window');
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
const y = verticalScale(30);
const z = hasNotch()
  ? topbarheight + verticalScale(70)
  : topbarheight + verticalScale(74);
const styles_profilepage = StyleSheet.create({
  container: {
    width: width,
    height: height,
    flex: 1,
    position: 'absolute',
    resizeMode: 'cover',
  },
  container_2: {
    flex: 1,
  },
  overlayView: {
    marginTop: topbarheight + leftpad,
    width: width,
    height: height,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    position: 'absolute',
    flexDirection: 'column',
  },
  overlayViewInside: {
    flexDirection: 'row',
    width: '100%',
    height: 180,
  },
  overlayViewInsideImageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: hasNotch() ? 175 : 180,
    width: 140,
    marginLeft: leftpad - (70 - 66),
  },
  overlayViewInsideTitle: {
    alignSelf: 'flex-end',
    height: 180 - (z - (topbarheight + leftpad)),
    width: width - 140,
    padding: '4.0%',
    paddingRight: '16%',
  },
  overlayViewDescription: {
    paddingHorizontal: leftpad,
    paddingTop: verticalScale(15),
    width: '100%',
    height: undefined,
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
    width: 126,
    height: 168,
    borderRadius: 12.5,
  },
  coverImagebg: {
    position: 'absolute',
    borderRadius: 15,
    width: 132,
    height: 174,
  },
  author: {
    fontFamily: 'SFProDisplay-Light',
    color: '#868686',
  },
  tagscontainer: {
    marginTop: 7,
    marginBottom: 10,
    alignItems: 'center',
    flexDirection: 'row',
    width: width,
    height: width * 0.0966183574879227,
  },
  tags: {
    paddingHorizontal: scale(7),
    marginRight: scale(9),
    width: undefined,
    height: 22.6,
    justifyContent: 'center',
    borderRadius: 40,
    backgroundColor: '#423F46',
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
    height: hasNotch() ? verticalScale(35) : verticalScale(42),
    borderRadius: 9,
    flexDirection: 'row',
  },
  chapterbutton_: {
    height: '100%',
    width: '98.4%',
    justifyContent: 'center',
    backgroundColor: '#423F46',
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
});
function ProfilePage({route}) {
  const {id} = route.params;
  const {id_name} = route.params;
  const {id_cover} = route.params;
  let url = 'https://takoyaki.chetasr.co/manga?id=' + id;
  const [jason, set_jason] = useState({
    author: 'chetas',
    chapters: [],
    chapters_number: 0,
    description: 'NIL',
  });
  let [didload, setdidload] = useState(false);
  useEffect(() => {
    fetch(url)
      .then(response => response.json())
      .then(responseJson => {
        set_jason(responseJson.result);
        setdidload(true);
      })
      .catch(error => console.error(error));
  }, [url]);
  let author = 'NIL';
  let chapters_data = [];
  let description = 'NIL';
  let how_many_chapers = 0;
  let how_many_chapers_extra = 0;
  if (didload) {
    author = jason.author;
    chapters_data = jason.chapters;
    how_many_chapers = jason.chapters_number;
    description = jason.description;
    how_many_chapers_extra =
      description.length > 300 ? (description.length - 300) / 25 / 0.83 : 0;
  }

  let chapters_button = new Array(how_many_chapers);
  let i;
  for (i = 0; i < how_many_chapers; i++) {
    chapters_button[i] = (
      <View style={styles_profilepage.chapterbutton}>
        <View style={styles_profilepage.chapterbutton_tag} />
        <TouchableOpacity style={styles_profilepage.chapterbutton_}>
          <Text style={styles_profilepage.chapterbutton_name}>
            {chapters_data[i].title}
          </Text>
        </TouchableOpacity>
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
          style={{
            height:
              height -
              (verticalScale(64.7) + z) +
              (hasNotch()
                ? verticalScale(35) *
                  chaptersheight(how_many_chapers + how_many_chapers_extra)
                : verticalScale(42) *
                  chaptersheight(how_many_chapers + how_many_chapers_extra)),
            marginTop: z,
          }}
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
            <View style={styles_profilepage.overlayViewInsideTitle}>
              <Text style={styles_profilepage.title}>{id_name}</Text>
              <Text style={styles_profilepage.author}>{author}</Text>
            </View>
          </View>
          <View style={styles_profilepage.overlayViewDescription}>
            <Text style={styles_profilepage.subtitle}>DESCRIPTION</Text>
            <Text style={styles_profilepage.description}>{description}</Text>
            <Text style={styles_profilepage.subtitle}>GENRE</Text>
            <View style={styles_profilepage.tagscontainer}>
              <View style={styles_profilepage.tags}>
                <Text style={styles_profilepage.tagstext}>ACTION</Text>
              </View>
              <View style={styles_profilepage.tags}>
                <Text style={styles_profilepage.tagstext}>ADVENTURE</Text>
              </View>
              <View style={styles_profilepage.tags}>
                <Text style={styles_profilepage.tagstext}>COMEDY</Text>
              </View>
            </View>
            <Text style={[styles_profilepage.chapterscontainer]}>CHAPTERS</Text>
            {chapters_button}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
export default ProfilePage;
