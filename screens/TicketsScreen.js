import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Dimensions,
  Button,
  Modal,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";
import StyledButton from "../components/button";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import * as Animatable from "react-native-animatable";
import DateTimePicker from "@react-native-community/datetimepicker";

const TicketsScreen = () => {
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setOpenDatePicker(Platform.OS === "ios");
    setDate(currentDate);
  };
  const [date, setDate] = useState(new Date());
  const [openDatePicker, setOpenDatePicker] = useState(false);
  const [expandedSearch, setExpandedSearch] = useState(true);
  const [showSmallSearch, setShowSmallSearch] = useState(false);
  return (
    <View style={styles.container}>
      {showSmallSearch ? (
        <Animatable.View
          animation={!expandedSearch ? "bounceInLeft" : "bounceOutRight"}
          duration={900}
          style={{ flex: 1 }}
        >
          <View
            style={{
              ...styles.searchContainer,
              height: Dimensions.get("window").height / 4.4,
              borderBottomEndRadius: 15,
              borderBottomStartRadius: 15,
            }}
          >
            <View style={styles.inputField}>
              <TextInput placeholder="From" style={styles.textInput} />
            </View>
            <View style={{ flexDirection: "row" }}>
              <StyledButton
                style={{
                  marginLeft: 20,
                  borderRadius: 18,
                  marginTop: 20,
                  width: Dimensions.get("window").width / 1.3,
                }}
                onPress={() => {
                  setExpandedSearch(!expandedSearch);
                  setTimeout(() => {
                    setShowSmallSearch(!showSmallSearch);
                  }, 750);
                }}
              >
                Find
              </StyledButton>
              <TouchableOpacity
                style={{
                  alignSelf: "center",
                  justifyContent: "flex-end",
                  marginTop: 20,
                  marginLeft: 10,
                }}
              >
                <Ionicons name="filter" size={40} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        </Animatable.View>
      ) : (
        <Animatable.View
          animation={expandedSearch ? "bounceInLeft" : "bounceOutRight"}
          duration={1000}
          style={{ flex: 1 }}
        >
          <View style={styles.searchContainer}>
            <View style={styles.inputField}>
              <TextInput placeholder="From" style={styles.textInput} />
            </View>
            <View style={styles.inputField}>
              <TextInput placeholder="To" style={styles.textInput} />
            </View>
            <View style={{ flexDirection: "row" }}>
              <View
                style={{
                  ...styles.inputField,
                  width: Dimensions.get("window").width / 1.3,
                }}
              >
                <TextInput
                  placeholder="Date"
                  style={styles.textInput}
                  defaultValue={date.toLocaleDateString()}
                />
              </View>

              <TouchableOpacity
                style={{
                  width: 50,
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: 30,
                  marginLeft: 5,
                }}
                onPress={() => {
                  setOpenDatePicker(true);
                }}
              >
                <AntDesign name="calendar" size={40} color="white" />
              </TouchableOpacity>
            </View>

            <View style={{ flexDirection: "row" }}>
              <StyledButton
                style={{
                  marginLeft: 20,
                  borderRadius: 18,
                  marginTop: 20,
                  width: Dimensions.get("window").width / 1.3,
                }}
                onPress={() => {
                  setExpandedSearch(!expandedSearch);
                  setTimeout(() => {
                    setShowSmallSearch(!showSmallSearch);
                  }, 750);
                }}
              >
                Find
              </StyledButton>
              <TouchableOpacity
                style={{
                  alignSelf: "center",
                  justifyContent: "flex-end",
                  marginTop: 20,
                  marginLeft: 10,
                }}
              >
                <Ionicons name="filter" size={40} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        </Animatable.View>
      )}
      {openDatePicker && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={openDatePicker}
        >
          <TouchableWithoutFeedback
            onPress={() => {
              setOpenDatePicker(false);
            }}
          >
            <View style={{ height: "100%", justifyContent: "flex-end" }}>
              <DateTimePicker
                style={{ backgroundColor: "grey", borderRadius: 20 }}
                testID="dateTimePicker"
                value={date}
                minimumDate={new Date()}
                mode={"date"}
                is24Hour={false}
                display="spinner"
                onChange={onChange}
                dateFormat="longdate"
                neutralButtonLabel={true}
              />
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  searchContainer: {
    justifyContent: "center",
    height: Dimensions.get("window").height / 2.3,
    width: Dimensions.get("window").width,
    backgroundColor: "#1f1f1f",
    borderBottomEndRadius: 20,
    borderBottomStartRadius: 20,
  },
  filterButton: {
    width: 100,
  },
  inputField: {
    flexDirection: "row",
    backgroundColor: "white",
    marginTop: "6%",
    width: Dimensions.get("window").width / 1.1,
    height: Dimensions.get("window").height / 17,
    justifyContent: "flex-start",
    paddingLeft: 10,
    borderRadius: 15,
    alignItems: "center",
    marginLeft: 20,
  },
  textInput: {
    height: "100%",
    width: "100%",
  },
});

export default TicketsScreen;
