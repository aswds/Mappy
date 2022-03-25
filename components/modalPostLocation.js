import React, { useState } from "react";
import {
  Modal,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  StyleSheet,
  Dimensions,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
const ModalPost = (props) => {
  const [showModal, setShowModal] = useState(props.show);
  return (
    <Modal animationType="slide" transparent={true} visible={showModal}>
      <TouchableWithoutFeedback
        onPress={() => {
          setShowModal(!showModal);
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
          ></View>
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
  containerSafeArea: {
    flex: 1,
    backgroundColor: "black",
  },
  modalView: {
    top: 10,
    flexDirection: "row",
    alignItems: "flex-start",
    width: Platform.OS === "ios" ? "98%" : "100%",
    height: Dimensions.get("window").height >= 800 ? "30%" : "40%",
    backgroundColor: "black",
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default ModalPost;
