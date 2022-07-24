import { StyleSheet, TouchableOpacity, View } from "react-native";
import { actuatedNormalize } from "../../../../components/actuaterNormalize";

export const RatingButton = ({ icon, rating, onPress, backgroundColor }) => {
  return (
    <View style={styles.modalButton}>
      <View style={{ ...styles.iconContainer, backgroundColor }}>{icon}</View>
    </View>
  );
};
const styles = StyleSheet.create({
  modalButton: {
    height: actuatedNormalize(50),

    aspectRatio: 1,
    marginHorizontal: 10,
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
