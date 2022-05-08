import { StyleSheet, TouchableOpacity, View } from "react-native";
import { actuatedNormalize } from "../actuaterNormalize";

export const RatingButton = ({ icon, rating, onPress, backgroundColor }) => {
  return (
    <TouchableOpacity style={styles.modalButton} onPress={onPress}>
      <View style={{ ...styles.iconContainer, backgroundColor }}>{icon}</View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  modalButton: {
    height: actuatedNormalize(60),
    width: actuatedNormalize(60),
    margin: 10,
  },
  iconContainer: {
    flex: 1,
    backgroundColor: "rgba(219,219,219,0.6)",
    borderRadius: 50,
    shadowOpacity: 0.4,
    shadowOffset: {
      height: 2,
      width: 0,
    },
    justifyContent: "center",
    alignItems: "center",
  },
});
