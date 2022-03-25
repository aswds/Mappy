import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { SearchBar } from "react-native-elements";
const HeaderSearchBar = (props) => {
  const [userSearch, setUserSearch] = useState("");
  return (
    <View style={{ ...styles.searchBar, ...props.style }}>
      <View style={{ flexDirection: "row", marginLeft: 10 }}>
        <FontAwesome name="search" size={22} color="grey" />
        {props.children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  searchBar: {
    width: Dimensions.get("window").width / 1.1,
    backgroundColor: "#a5a5a5",
    height: 35,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: "flex-start",
    justifyContent: "center",
  },
});

export default HeaderSearchBar;
