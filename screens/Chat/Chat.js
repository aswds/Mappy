import React, { useState, useEffect, useRef } from "react";
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
import { colors, SearchBar } from "react-native-elements";
import {
  AntDesign,
  MaterialIcons,
  FontAwesome,
  MaterialCommunityIcons,
  FontAwesome5,
  Entypo,
} from "@expo/vector-icons";
import { actuatedNormalize } from "../../components/actuaterNormalize";
import { useHeaderHeight } from "@react-navigation/elements";
import { useTheme } from "../../Theme/ThemeProvider";
import InputBox from "../../components/Chat/Input/InputBox";
import { BlurView } from "expo-blur";
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
  const { theme } = useTheme();
  const colors = theme.colors;
  const headerHeight = useHeaderHeight();
  const styles = makeStyles(colors);
  const scrollViewRef = useRef();

  const onKeyboardAppears = () => {
    scrollViewRef.current.scrollToEnd({ animated: true });
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoidContainer}
        keyboardVerticalOffset={headerHeight}
        keyboardShouldPersistTaps={"always"}
      >
        <ScrollView ref={scrollViewRef}>
          {content.map((num) => (
            <View
              style={{
                height: 80,
                margin: 10,
                borderWidth: 1,
                justifyContent: "center",
                alignItems: "center",
                borderColor: colors.text,
              }}
              key={num}
            >
              <Text style={{ color: colors.text }}>{num}</Text>
            </View>
          ))}
        </ScrollView>
        <InputBox onKeyboardAppears={onKeyboardAppears} />
      </KeyboardAvoidingView>
    </View>
  );
};

const makeStyles = (colors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
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
    },
    containerChat: {
      flexDirection: "row",
      margin: 10,
      alignItems: "center",
    },
    mainContainer: {
      flexDirection: "row",
      backgroundColor: "rgba(52, 52, 52, 0.8)",
      alignItems: "center",
      justifyContent: "center",
      padding: 10,
      borderRadius: 25,
      margin: 10,
    },
    textInput: {
      flex: 1,
      height: "100%",
      marginHorizontal: 10,
      justifyContent: "center",
      alignItems: "center",
    },
    icon: {
      marginHorizontal: 5,
    },
  });

export default Chat;
