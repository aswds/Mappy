import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { fetchUser } from "../../redux/actions";
import { SearchBar } from "react-native-elements";
import { AntDesign, MaterialIcons, FontAwesome } from "@expo/vector-icons";
import { actuatedNormalize } from "../../components/actuaterNormalize";
import { useTheme } from "@react-navigation/native";
const NotificationScreen = (props) => {
  const [search, setSearch] = useState();
  const [input, setInput] = useState();
  const { colors } = useTheme();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <View style={{ flex: 1, backgroundColor: colors.background }}>
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={{ color: "white" }}>Notification!</Text>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchBar: {
    height: actuatedNormalize(80),
    justifyContent: "flex-start",
    alignItems: "flex-end",
    flexDirection: "row",
    borderBottomWidth: 0.3,
    borderColor: "white",
  },
  inputContainerStyle: {
    width: "100%",
    height: 40,
    borderRadius: 20,
    backgroundColor: "#a5a5a5",
  },
  addUser: {
    margin: 10,
    alignSelf: "flex-end",
  },
});

const mapDispatchProps = (dispatch) => {
  return bindActionCreators({ fetchUser }, dispatch);
};
const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
});

export default connect(mapStateToProps, mapDispatchProps)(NotificationScreen);
