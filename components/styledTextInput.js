import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
const placeholderColor = "#616161";
export default StyledTextInput = (props) => {
  return (
    <View style={{ ...styles.inputField }}>
      <View style={styles.userInputContainer}>{props.children}</View>
      <TextInput
        placeholder="Username"
        style={{
          height: "100%",
          width: "100%",
          padding: 10,
          color: "white",
        }}
        placeholderTextColor={placeholderColor}
        onChangeText={(text) => {
          setUsername(text);
        }}
        defaultValue={props.defaultValue}
      />
    </View>
  );
};

const styles = StyleSheet.create({});
