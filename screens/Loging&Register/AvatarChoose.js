import { FontAwesome5 } from "@expo/vector-icons";
import {
  DarkTheme,
  useNavigation,
  useRoute,
  useTheme,
} from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import React, { useEffect, useState } from "react";
import {
  Image,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { actuatedNormalize } from "../../components/actuaterNormalize";
import { ModalPhoto } from "../Profile/EditProfile/Modal";
export const AvatarChoose = (props) => {
  const route = useRoute();

  const _hideModal = () => {
    setShowModal(false);
  };
  const _imagePropHandler = (imageProp) => {
    setImage(imageProp);
  };
  const _showModalHandle = () => {
    setShowModal(true);
  };
  useEffect(() => {
    setImage(route.params?.imageURI);
  }, [route.params?.imageURI]);
  const imageParam = route.params?.imageURI;
  const { colors } = useTheme();
  const [showModal, setShowModal] = useState();
  const [image, setImage] = useState(imageParam);
  const navigation = useNavigation();
  const styles = makeStyles(colors);
  const name = route.params?.name;

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);
  // not safe to pass params in  3 screens (change to (registration->firebase.createNewUser->enter name -> choose avatar -> updateProfile -> Home screen))
  return (
    <View style={styles.modalView}>
      <SafeAreaView
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "space-evenly",
        }}
      >
        <TouchableOpacity
          style={{
            position: "absolute",
            zIndex: 1,
            left: actuatedNormalize(10),
            top: actuatedNormalize(45),
          }}
          onPress={() => {
            navigation.navigate("NameInfo");
          }}
        >
          <FontAwesome5 name="arrow-left" size={30} color={colors.text} />
        </TouchableOpacity>
        <StatusBar
          barStyle={DarkTheme.dark ? "light-content" : "dark-content"}
        />

        <TouchableOpacity
          style={{
            height: actuatedNormalize(200),
            width: actuatedNormalize(200),
            borderRadius: 100,
            borderWidth: 3,
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={_showModalHandle}
        >
          {image ? (
            <Image
              source={{ uri: image }}
              style={{
                width: "100%",
                height: "100%",
                borderRadius: 100,
                justifyContent: "center",
                alignItems: "center",
              }}
            />
          ) : (
            <Text style={{ fontSize: 100 }}>🤔</Text>
          )}
        </TouchableOpacity>

        <View style={{ maxWidth: "99%" }}>
          <Text style={styles.title}>Hi {route.params?.userName}!</Text>
          <Text style={styles.textStyle}>It's time to choose your avatar!</Text>
        </View>

        <ModalPhoto
          routeName={route.name}
          hideModal={_hideModal}
          showModal={showModal}
          imageHandler={_imagePropHandler}
        />
        <TouchableOpacity
          style={styles.nextButtonContainer}
          onPress={() => {
            navigation.navigate("RegisterScreen", {
              name: route.params?.userName,
              image: image,
            });
          }}
        >
          <Text style={styles.nextButtonText}>{image ? "Next" : "Skip"}</Text>
          <FontAwesome5 name="arrow-right" size={30} color={colors.text} />
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
};
const makeStyles = (colors: any) =>
  StyleSheet.create({
    title: {
      fontFamily: "WorkSans-Bold",
      fontSize: actuatedNormalize(20),
      color: colors.text,
    },
    textStyle: {
      fontFamily: "WorkSans-Regular",
      fontSize: actuatedNormalize(20),
      color: colors.text,
    },
    modalView: {
      flex: 1,
    },
    nextButtonContainer: {
      width: "40%",
      alignItems: "center",
      justifyContent: "space-evenly",
      flexDirection: "row",
    },
    nextButtonText: {
      fontWeight: "bold",
      color: colors.text,
    },
  });
