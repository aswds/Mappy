import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import {
  Modal,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { actuatedNormalize } from "../../../components/actuaterNormalize";
import { AppleButton } from "./AppleButton";
import { SingInType } from "./SingInType";
const SingInMethods = (props) => {
  const loginWithFacebook = () => {};
  const loginWithGoogle = () => {};
  return (
    <View style={{ ...styles.centeredView }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-evenly",
          flex: 1,
          alignItems: "flex-end",
        }}
      >
        <SingInType size={30} name="facebook" />

        <SingInType
          size={40}
          name="apple"
          style={{
            height: actuatedNormalize(53),
            width: actuatedNormalize(76),
          }}
        />
        <SingInType size={30} name="google" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    alignItems: "center",
    flexDirection: "row",
  },
  iconStyle: {
    borderWidth: 2,
    borderColor: "white",
    alignItems: "center",
    width: "100%",
    height: "100%",
    justifyContent: "center",
  },
  iconContainer: {
    width: 70,
    height: 50,
  },
  iconText: { fontWeight: "bold", color: "white" },
  containerSafeArea: {
    flex: 1,
    backgroundColor: "black",
  },
  modalView: {
    top: 10,
    flexDirection: "row",
    alignItems: "flex-start",
    width: Platform.OS === "ios" ? "98%" : "100%",
    height: "35%",
    backgroundColor: "white",
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default SingInMethods;
