import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  SafeAreaView,
} from "react-native";

import {
  MaterialCommunityIcons,
  MaterialIcons,
  FontAwesome5,
  Entypo,
  Fontisto,
} from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BlurView } from "expo-blur";
import { useTheme } from "../../../Theme/ThemeProvider";
const InputBox = (props) => {
  const { theme } = useTheme();
  const colors = theme.colors;
  const [message, setMessage] = useState("");
  const [myUserId, setMyUserId] = useState(null);
  const onPress = () => {
    if (!message) {
      onMicrophonePress();
    } else {
      onSendPress();
    }
  };
  return (
    <SafeAreaView style={{ backgroundColor: colors.background }}>
      <View
        style={{
          backgroundColor: colors.background,
        }}
      >
        <View style={{ ...styles.mainContainer }}>
          <TextInput
            placeholder={"Type a message"}
            style={{ ...styles.textInput, color: colors.text }}
            textAlignVertical="center"
            placeholderTextColor={"lightgrey"}
            multiline
            onFocus={props.onKeyboardAppears}
            value={message}
            onChangeText={setMessage}
          />
          <TouchableOpacity>
            {!message ? (
              <MaterialCommunityIcons
                name="microphone"
                size={28}
                color="white"
              />
            ) : (
              <MaterialIcons name="send" size={28} color="white" />
            )}
          </TouchableOpacity>
          {!message && (
            <MaterialIcons
              name="insert-photo"
              size={28}
              color="white"
              style={{ marginHorizontal: 5 }}
            />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    margin: 10,
    alignItems: "center",
  },
  mainContainer: {
    flexDirection: "row",
    backgroundColor: "rgba(52, 52, 52, 0.5)",
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
});
export default InputBox;
