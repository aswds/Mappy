import { View, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { actuatedNormalize } from "../../../../components/actuaterNormalize";
export default function AddPhotoButtonComp({ theme, navigation }) {
  return (
    <TouchableOpacity
      style={{ ...styles.modalButton }}
      onPress={() => {
        navigation.navigate("ImagePicker");
      }}
    >
      <View
        style={[
          styles.addPhotosContainer,
          {
            backgroundColor: theme.dark
              ? "rgba(219,219,219,0.33)"
              : "rgba(160,160,160,1)",
          },
        ]}
      >
        <MaterialIcons name="add-photo-alternate" size={40} color="black" />
      </View>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  addPhotosContainer: {
    flex: 1,

    borderRadius: 10,
    shadowOpacity: 0.4,
    shadowOffset: {
      height: 2,
      width: 0,
    },
    justifyContent: "center",
    alignItems: "center",
  },
  modalButton: {
    height: actuatedNormalize(100),
    width: actuatedNormalize(100),
    margin: 10,
  },
});
