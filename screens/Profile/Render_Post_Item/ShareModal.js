import React from "react";
import { View, StyleSheet, Text, ScrollView } from "react-native";
import BottomSheet from "reanimated-bottom-sheet";
import Modal from "react-native-modal";

interface Props {
  isVisible: boolean;
  onDismiss: () => void;
}

export default function SheetModal(props) {
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
}

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
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
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