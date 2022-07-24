import React, { useState } from "react";
import {
  Modal,
  Platform,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";

const CustomAlert = (props) => {
  const [modalVisible, setModalVisible] = useState(props.showModal);
  return (
    <View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={props.showModal}
        onRequestClose={() => {
          props.hideModal();
        }}
      >
        <Pressable
          style={[
            Platform.OS === "ios" ? styles.iOSBackdrop : styles.androidBackdrop,
            styles.backdrop,
          ]}
          onPress={() => props.hideModal()}
        />

        <SafeAreaView>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <View
              style={{
                backgroundColor: "rgba(40,40,40,1)",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 20,
                padding: 10,
                width: "65%",
              }}
            >
              <Text
                style={{ color: "rgba(110,110,110,1)", textAlign: "center" }}
              >
                {props.errorMsg}
              </Text>
            </View>
          </View>
        </SafeAreaView>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },

  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },

  iOSBackdrop: {
    backgroundColor: "#000000",
    opacity: 0.3,
  },
  androidBackdrop: {
    backgroundColor: "#232f34",
    opacity: 0.32,
  },
  backdrop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});

export default CustomAlert;
