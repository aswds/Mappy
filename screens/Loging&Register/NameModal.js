import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  TouchableWithoutFeedback,
  Modal,
  Text,
  SafeAreaView,
  TextInput,
  Keyboard,
  KeyboardAvoidingView,
  StatusBar,
} from "react-native";
import { MaterialIcons, AntDesign, FontAwesome5 } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import {
  DarkTheme,
  useNavigation,
  useRoute,
  useTheme,
} from "@react-navigation/native";
import { theme } from "../../components/theme";
import { uploadImage } from "../../components/ProfileFunc/uploadImage";
import WhiteButton from "../../components/headerComponents/whiteButton";
import * as Animatable from "react-native-animatable";
import { actuatedNormalize } from "../../components/actuaterNormalize";
import firebase from "firebase";

export const NameModal = (props) => {
  const [name, setName] = useState();
  const [nameSkip, setNameSkip] = useState();
  const [profileImageSkip, setProfileImageSkip] = useState();
  const [showModal, setShowModal] = useState(true);
  const { colors } = useTheme();
  const navigation = useNavigation();
  const route = useRoute();
  const styles = makeStyles(colors);
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.modalView}>
        <StatusBar
          barStyle={DarkTheme.dark ? "light-content" : "dark-content"}
        />
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
          <TouchableWithoutFeedback
            onPress={() => {
              Keyboard.dismiss();
            }}
          >
            <SafeAreaView
              style={{ flex: 1, backgroundColor: colors.background }}
            >
              <TouchableOpacity
                style={{
                  position: "absolute",
                  zIndex: 1,
                  left: 10,
                  top: actuatedNormalize(45),
                }}
                onPress={() => {
                  navigation.navigate("LoginScreen");
                }}
              >
                <FontAwesome5 name="arrow-left" size={30} color={colors.text} />
              </TouchableOpacity>
              <View
                style={{
                  flex: 1,
                  justifyContent: "space-evenly",
                  marginHorizontal: 10,
                }}
              >
                <View
                  style={{
                    flex: 1,
                    alignItems: "center",
                    flexDirection: "row",
                  }}
                >
                  <View>
                    <Text style={styles.title}>Hi! 👋</Text>
                    <Text
                      style={{
                        fontFamily: "WorkSans-Regular",
                        fontSize: 17,
                        color: colors.text,
                      }}
                    >
                      What's your name?
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    alignItems: "flex-start",
                  }}
                >
                  <TextInput
                    style={styles.textInput}
                    placeholder="🥸 Enter your name"
                    placeholderTextColor={"grey"}
                    onChangeText={(text) => {
                      setName(text);
                    }}
                    value={name}
                  />
                </View>

                <View
                  style={{
                    alignItems: "flex-end",
                    width: "100%",
                    height: "5%",
                  }}
                >
                  <TouchableOpacity
                    style={styles.nextButtonContainer}
                    onPress={() => {
                      setShowModal(!showModal);
                      navigation.navigate("Avatar", {
                        userName: name,
                      });
                    }}
                  >
                    <Text style={styles.nextButtonText}>
                      {name ? "Next" : "Skip"}
                    </Text>
                    <FontAwesome5
                      name="arrow-right"
                      size={30}
                      color={colors.text}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </SafeAreaView>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
};
const makeStyles = (colors: any) =>
  StyleSheet.create({
    title: {
      fontFamily: "WorkSans-Bold",
      fontSize: 35,
      color: colors.text,
    },
    textInput: {
      borderRadius: 10,
      borderBottomWidth: 3,
      borderBottomColor: colors.text,
      fontFamily: "WorkSans-Regular",
      paddingVertical: "5%",
      paddingHorizontal: actuatedNormalize(10),
      width: "100%",
    },
    nextButtonContainer: {
      height: "100%",
      width: "40%",
      alignItems: "center",
      justifyContent: "space-evenly",
      flexDirection: "row",
    },
    nextButtonText: {
      fontWeight: "bold",
      color: colors.text,
    },
    modalView: {
      flex: 1,
    },
  });