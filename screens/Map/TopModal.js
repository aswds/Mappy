import React, { useState } from "react";
import {
  Modal,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  StyleSheet,
  Dimensions,
  SafeAreaView,
} from "react-native";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";
import { createIconSetFromIcoMoon } from "@expo/vector-icons";

const TopModal = (props) => {
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
              <View style={styles.iconContainer}></View>
              <View style={styles.iconContainer}></View>
              <View style={styles.iconContainer}></View>
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
    justifyContent: "flex-start",
    padding: 15,
  },
  iconContainer: {
    margin: 10,
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

export default TopModal;
