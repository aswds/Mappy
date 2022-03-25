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
  FlatList,
} from "react-native";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { fetchUser } from "../../redux/actions";
import { SearchBar } from "react-native-elements";
import { AntDesign, MaterialIcons, FontAwesome } from "@expo/vector-icons";
import { actuatedNormalize } from "../../components/actuaterNormalize";
import { useNavigation, useTheme } from "@react-navigation/native";
import {
  Container,
  Card,
  UserInfo,
  UserImgWrapper,
  UserImg,
  UserInfoText,
  UserName,
  PostTime,
  MessageText,
  TextSection,
} from "../../styles/ChatStyle";
import { MessageCard } from "./MessageCard";
const Messages = [
  {
    id: "1",
    userName: "Jenny Doe",
    userImg: require("../../src/image/logoAuth.png"),
    messageTime: "4 mins ago",
    messageText:
      "Hey there, this is my test for a post of my social app in React Native.",
  },
  {
    id: "2",
    userName: "John Doe",
    userImg: require("../../src/image/logoAuth.png"),
    messageTime: "2 hours ago",
    messageText:
      "Hey there, this is my test for a post of my social app in React Native.",
  },
  {
    id: "3",
    userName: "Ken William",
    userImg: require("../../src/image/logoAuth.png"),
    messageTime: "1 hours ago",
    messageText:
      "Hey there, this is my test for a post of my social app in React Native.",
  },
  {
    id: "4",
    userName: "Selina Paul",
    userImg: require("../../src/image/logoAuth.png"),
    messageTime: "1 day ago",
    messageText:
      "Hey there, this is my test for a post of my social app in React Native.",
  },
  {
    id: "5",
    userName: "Christy Alex",
    userImg: require("../../src/image/logoAuth.png"),
    messageTime: "2 days ago",
    messageText:
      "Hey there, this is my test for a post of my social app in React Native.",
  },
];
const DirectMessages = (props) => {
  const [search, setSearch] = useState();
  const [input, setInput] = useState();
  const { colors } = useTheme();
  const navigation = useNavigation();
  const styles = makeStyles(colors);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <View style={styles.searchBar}>
          <SearchBar
            searchIcon={<FontAwesome name="search" size={20} color="grey" />}
            onChangeText={(search) => {
              setInput(search);
            }}
            placeholder="Search"
            placeholderTextColor={"grey"}
            containerStyle={{
              backgroundColor: colors.background,
              width: "100%",
              borderTopWidth: 0,
              borderBottomWidth: 0,
            }}
            value={input}
            leftIconContainerStyle={{
              width: actuatedNormalize(30),
            }}
            inputContainerStyle={styles.inputContainerStyle}
            clearIcon={<MaterialIcons name="cancel" size={24} color="black" />}
          />
        </View>
        <View style={styles.createTravelGroup}>
          <Text style={styles.createTravelGroupText}>Travel togather!</Text>
          <Text style={styles.createTravelGroupText}>
            Create groupchat and travel together!
          </Text>
        </View>
        <FlatList
          data={Messages}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <MessageCard item={item} />}
        />
      </View>
    </SafeAreaView>
  );
};

const makeStyles = (colors: any) =>
  StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background },
    searchBar: {
      justifyContent: "flex-start",
      alignItems: "flex-end",
      flexDirection: "row",
      borderBottomWidth: 0.3,
      borderColor: "white",
    },
    inputContainerStyle: {
      width: "100%",
      height: 40,
      borderRadius: 10,
      backgroundColor: "#a5a5a5",
    },
    createTravelGroup: {},
    createTravelGroupText: {
      fontFamily: "WorkSans-Regular",
      fontSize: 20,
      color: colors.text,
      paddingHorizontal: 10,
    },
  });

const mapDispatchProps = (dispatch) => {
  return bindActionCreators({ fetchUser }, dispatch);
};
const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
});

export default connect(mapStateToProps, mapDispatchProps)(DirectMessages);
