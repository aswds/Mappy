import React, { useState } from "react";
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
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { fetchUser } from "../../redux/actions";
import { SearchBar } from "react-native-elements";
import { AntDesign, MaterialIcons, FontAwesome } from "@expo/vector-icons";
import { actuatedNormalize } from "../../components/actuaterNormalize";
import { useTheme } from "@react-navigation/native";
import { useHeaderHeight } from "@react-navigation/elements";
const content = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
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
const Chat = (props) => {
  const [search, setSearch] = useState();
  const [input, setInput] = useState();
  const { colors } = useTheme();
  const headerHeight = useHeaderHeight();
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoidContainer}
        keyboardVerticalOffset={headerHeight}
      >
        <ScrollView style={{ flex: 1 }}>
          {content.map((num) => (
            <View
              style={{
                height: 80,
                margin: 10,
                borderWidth: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
              key={num}
            >
              <Text>{num}</Text>
            </View>
          ))}
        </ScrollView>
        <TextInput
          style={{
            height: 40,
            width: "100%",
            backgroundColor: "#fff",
            paddingLeft: 10,
            color: "#fff",
          }}
          placeholder={"Enter text here"}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
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
    borderRadius: 20,
    backgroundColor: "#a5a5a5",
  },
  addUser: {
    margin: 10,
    alignSelf: "flex-end",
  },

  keyboardAvoidContainer: {
    flex: 1,
    backgroundColor: "orange",
  },
});

export default Chat;
