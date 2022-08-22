import React from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Dimensions,
} from "react-native";
const StyledButton = (props) => {
  return (
    <TouchableOpacity
      {...props}
      activeOpacity={0.7}
      style={{ ...styles.container, ...props.style }}
    >
      <View style={{ justifyContent: "center" }}>
        <Text style={{ ...props.textStyle }}>{props.children}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    width: Dimensions.get("window").width / 1.5,
    height: Dimensions.get("window").height / 17,
    borderRadius: 50,
    overflow: "hidden",
    backgroundColor: "#13294B",
    borderWidth: 0,
  },
  linearGradient: {
    flex: 1,
  },
});
export default StyledButton;
