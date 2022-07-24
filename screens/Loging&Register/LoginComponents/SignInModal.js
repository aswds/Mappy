import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import {
  Modal,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { AppleButton } from "./AppleButton";
const SingInMethods = (props) => {
  const loginWithFacebook = () => {};
  const loginWithGoogle = () => {};
  return (
    <Modal animationType="slide" transparent={true} visible={props.showModal}>
      <TouchableWithoutFeedback
        onPress={() => {
          props.hideModal();
        }}
        style={{ height: "100%", width: "100%" }}
      >
        <View style={{ ...styles.centeredView }}>
          <View
            style={{
              ...styles.modalView,
              justifyContent: "space-around",
              alignItems: "center",
              borderWidth: 6,
              borderColor: "white",
            }}
          >
            <View>
              <View style={styles.iconContainer}>
                <FontAwesome.Button
                  style={styles.iconStyle}
                  name="facebook"
                  backgroundColor="#3b5998"
                  onPress={loginWithFacebook}
                  size={15}
                >
                  <Text style={styles.iconText}>Continue with Facebook</Text>
                </FontAwesome.Button>
              </View>
              <View style={styles.iconContainer}>
                <FontAwesome.Button
                  style={styles.iconStyle}
                  name="google"
                  backgroundColor="#cc3345"
                  onPress={loginWithGoogle}
                  size={15}
                >
                  <Text style={styles.iconText}>Continue with Google</Text>
                </FontAwesome.Button>
              </View>
              <View style={styles.iconContainer}>
                <AppleButton />
              </View>
              <View style={styles.iconContainer}>
                <FontAwesome.Button
                  style={styles.iconStyle}
                  name="mobile-phone"
                  backgroundColor="grey"
                  onPress={loginWithGoogle}
                >
                  <Text style={styles.iconText}>Continue with Phone</Text>
                </FontAwesome.Button>
              </View>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  iconStyle: {
    alignItems: "center",
    width: 250,
    height: 40,
    justifyContent: "center",
    padding: 10,
  },
  iconContainer: {
    margin: 10,
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
