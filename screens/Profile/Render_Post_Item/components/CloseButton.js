import { TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export function CloseButton({ closeModal, color, iconSize }) {
  return (
    <TouchableOpacity onPress={closeModal} style={styles.iconContainer}>
      <Ionicons name="close" size={iconSize} color={color} />
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  iconContainer: {
    margin: 10,
  },
});
