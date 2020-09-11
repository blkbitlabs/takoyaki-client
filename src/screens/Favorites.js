import React, { useState, useEffect } from "react";
import { StyleSheet, View, TextInput, Text } from "react-native";
import { BlurView, VibrancyView } from "@react-native-community/blur";
import { Icon } from "react-native-eva-icons";
import NewTopBar from "../navigation/NewTopBar";
import { TouchableOpacity } from "react-native-gesture-handler";
var RNFS = require("react-native-fs");
const styles = StyleSheet.create({
  container_main: {
    backgroundColor: "black",
    width: "100%",
    height: "100%",
  },
  searchbar: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: "rgba(255,255,255,0.2)",
    marginTop: "28%",
    width: "90%",
    height: "4%",
    borderRadius: 10,
  },
  search_icon: {
    marginLeft: 10,
  },
  search_text: {
    color: "rgba(255,255,255,1)",
    opacity: 1,
    marginLeft: 40,
    fontSize: 17,
    fontFamily: "SFProDisplay-Regular",
    includeFontPadding: true,
    position: "absolute",
  },
});
function Favorites({ navigation }) {
  useEffect(() => {
    if (text != "") {
      search(text);
    }
  });
  const [dbtext, setdbtext] = useState("");
  function search(text) {
    RNFS.readFile(RNFS.CachesDirectoryPath + "/" + "Favdb.txt", "utf8").then(
      (e) => {
        setdbtext(e);
      }
    );
    console.log(dbtext.split(","));
  }
  const [text, setText] = useState("");
  return (
    <NewTopBar>
      <View style={styles.container_main}>
        <View style={styles.searchbar}>
          <Icon
            style={styles.search_icon}
            name="search-outline"
            width={20}
            height={20}
            fill="rgba(255,255,255,0.5)"
          />
          <TextInput
            style={styles.search_text}
            placeholder="Search"
            placeholderTextColor="rgba(255,255,255,0.5)"
            returnKeyType="search"
            onChangeText={(text) => setText(text)}
            defaultValue={text}
          />
        </View>
      </View>
    </NewTopBar>
  );
}

export default Favorites;
