import React, { useState } from "react";
import {
  View,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Camera } from "expo-camera";
const ProfilePic = (props) => {
  const [image, setImage] = useState(props.image);
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <ImageBackground
          source={{ uri: image }}
          style={{
            height: "100%",
            width: "100%",
            alignItems:
              props.type === Camera.Constants.Type.front
                ? "flex-start"
                : "flex-end",
            transform:
              props.type === Camera.Constants.Type.front
                ? [{ scaleX: -1 }]
                : null,
          }}
        >
          <TouchableOpacity
            style={{
              shadowOpacity: 0.4,
              shadowOffset: {
                height: 0,
                width: 0,
              },
              shadowRadius: 2,
              margin: 15,
            }}
            onPress={() => {
              setImage(null);
              console.log(image);
            }}
          >
            <AntDesign name="close" size={40} color="white" />
          </TouchableOpacity>
        </ImageBackground>
      </View>
    </View>
  );
};

export default ProfilePic;
