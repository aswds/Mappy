import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  StyleSheet,
  Dimensions,
  ScrollView,
  SafeAreaView,
  Text,
} from "react-native";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";
import { createIconSetFromIcoMoon } from "@expo/vector-icons";
import BottomSheet from "reanimated-bottom-sheet";
import Modal from "react-native-modal";
const TopModal = (props) => {
  return (
    <Modal
      style={styles.modal}
      isVisible={props.showModal}
      onDismiss={props.hideModal}
      onBackdropPress={props.hideModal}
    >
      <View style={styles.container} pointerEvents="box-none">
        <BottomSheet
          initialSnap={0}
          snapPoints={["60%", "90%", 0]}
          onCloseEnd={props.hideModal}
          renderHeader={() => (
            <View style={styles.sheetHeader}>
              <View style={styles.panelHeader}>
                <View style={styles.panelHandle} />
              </View>
            </View>
          )}
          renderContent={() => (
            <View style={styles.sheetContent}>
              <View
                style={{
                  backgroundColor: "red",
                  height: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <ScrollView style={{ flex: 1 }}>
                  <Text>Some content here</Text>
                </ScrollView>
              </View>
            </View>
          )}
        />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    margin: 0,
  },
  container: {
    flex: 1,
  },
  sheetHeader: {
    backgroundColor: "#fff",
    paddingTop: 10,
    borderTopLeftRadius: 46,
    borderTopRightRadius: 46,
  },
  sheetContent: {
    backgroundColor: "#fff",
    padding: 10,
  },
  panelHeader: {
    alignItems: "center",
  },
  panelHandle: {
    width: "15%",
    height: 7,
    borderRadius: 5,
    backgroundColor: "#00000040",
    marginBottom: 10,
  },
});

export default TopModal;
