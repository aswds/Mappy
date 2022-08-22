import { FontAwesome } from "@expo/vector-icons";
import { View, StyleSheet } from "react-native";

export const SingInType = ({ name, size, onPress, style }) => {
  return (
    <View style={[styles.iconContainer, style]}>
      <FontAwesome
        name={name}
        backgroundColor="#121212"
        color={"white"}
        onPress={onPress}
        size={size}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  iconContainer: {
    borderWidth: 2,
    borderRadius: 5,
    borderColor: "white",
    alignItems: "center",
    width: 70,
    height: 50,
    justifyContent: "center",
  },
});
