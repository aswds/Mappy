import {
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  TouchableWithoutFeedback,
  Modal,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useNavigation, useRoute, useTheme } from "@react-navigation/native";
import { theme } from "../../components/theme";
import { useState } from "react";
import { uploadImage } from "../../components/ProfileFunc/uploadImage";

export const ModalPhoto = (props) => {
  const [image, setImage] = useState();
  const { colors } = useTheme();
  const navigation = useNavigation();
  const styles = makeStyles(colors);
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      props.imageHandler(result.uri);
    }
  };
  return (
    <Modal animationType="slide" transparent={true} visible={props.showModal}>
      <TouchableWithoutFeedback
        onPress={() => {
          props.hideModal();
        }}
        style={{ height: "100%", width: "100%" }}
      >
        <View style={{ ...styles.centeredView }}>
          <View
            style={{
              ...styles.modalView,
              justifyContent: "space-around",
              alignItems: "center",
              borderWidth: 6,
              borderColor: "white",
            }}
          >
            <TouchableOpacity
              style={styles.modalButtonsStyle}
              onPress={() => {
                props.hideModal(),
                  navigation.push("CameraStack", {
                    routeName: props.routeName,
                  });
              }}
            >
              <MaterialIcons name="photo-camera" size={100} color="white" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalButtonsStyle}
              onPress={() => {
                props.hideModal(), pickImage();
              }}
            >
              <MaterialIcons name="insert-photo" size={100} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};
const makeStyles = (colors: any) =>
  StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: "flex-end",
      alignItems: "center",
    },

    modalView: {
      top: 10,
      flexDirection: "row",
      alignItems: "flex-start",
      width: Platform.OS === "ios" ? "98%" : "100%",
      height: Dimensions.get("window").height >= 800 ? "30%" : "40%",
      backgroundColor: "black",
      borderTopRightRadius: 40,
      borderTopLeftRadius: 40,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },

    whiteButtonContainer: {
      width: "100%",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "row",
      marginVertical: 20,
    },
    modalButtonsStyle: {
      height: 130,
      width: 130,
      borderRadius: 20,
      padding: 10,
      borderWidth: 6,
      borderColor: theme.dark ? "white" : colors.border,
      alignItems: "center",
      justifyContent: "center",
    },
  });
