import { AntDesign } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useState } from "react";
import { ImageBackground, TouchableOpacity, View } from "react-native";
import Modal from "react-native-modalbox";
import { uploadImage } from "../../../components/ProfileFunc/uploadImage";

export const PreviewCamera = (props) => {
  const route = useRoute();
  const navigation = useNavigation();
  const [image, setImage] = useState(props.photo);
  return (
    <Modal isOpen={true} onClosed={props.retakePicture} backButtonClose={true}>
      <ImageBackground
        source={{ uri: image }}
        style={{
          flex: 1,
          alignItems: "flex-end",
          flexDirection: "row",
          justifyContent: "space-around",
        }}
      >
        <View
          style={{
            flexDirection: "row",
          }}
        >
          <TouchableOpacity
            style={{
              flex: 1,
              shadowOpacity: 0.4,
              shadowOffset: {
                height: 0,
                width: 0,
              },
              shadowRadius: 2,
              margin: 35,
              backgroundColor: "black",
              alignItems: "center",
            }}
            onPress={() => {
              props.retakePicture();
            }}
          >
            <AntDesign name="close" size={50} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flex: 1,
              shadowOpacity: 0.4,
              shadowOffset: {
                height: 0,
                width: 0,
              },
              shadowRadius: 2,
              margin: 35,
              backgroundColor: "black",
              alignItems: "center",
            }}
            onPress={() => {
              route.params.routeName === "ProfileScreen"
                ? uploadImage(image)
                : null;
              navigation.navigate(route.params.routeName, {
                imageURI: image,
              });
            }}
          >
            <AntDesign name="check" size={50} color="white" />
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </Modal>
  );
};
