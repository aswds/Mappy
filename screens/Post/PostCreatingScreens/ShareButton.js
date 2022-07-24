import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  SafeAreaView,
  Alert,
} from "react-native";
import { useDispatch } from "react-redux";
import { actuatedNormalize } from "../../../components/actuaterNormalize";
import { uploadMultMedia } from "../../../components/uploadMultMedia";
import { postUploadingStart, postUploadingEnd } from "../../../redux/actions";
import { useTheme } from "../../../Theme/ThemeProvider";
export const ShareButton = ({
  media,
  locationData,
  title,
  caption,
  rate,
  rateCaption,
}) => {
  const { theme } = useTheme();
  const colors = theme.colors;
  const styles = makeStyles(theme, colors);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <TouchableOpacity
        onPress={async () => {
          if (media && title) {
            dispatch(postUploadingStart());
            navigation.navigate("ProfileScreen");
            await uploadMultMedia(
              media,
              locationData,
              title,
              caption,
              rate,
              rateCaption
            );
            dispatch(postUploadingEnd());
          } else {
            Alert.alert(
              "No files found...",
              "Choose some images and pick a title to countinue."
            );
          }
        }}
        style={styles.nextButtonContainer}
      >
        <Text style={styles.nextButtonText}>Share</Text>
        <FontAwesome5 name="arrow-right" size={30} color={colors.text} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};
const makeStyles = ({ colors, theme, inputHeight }) =>
  StyleSheet.create({
    nextButtonContainer: {
      width: "50%",
      alignItems: "center",
      justifyContent: "space-evenly",
      flexDirection: "row",
    },
    safeAreaContainer: {
      alignItems: "flex-end",
      position: "absolute",
      bottom: 5,
      right: 0,
    },
    nextButtonText: {
      color: colors.text,
      fontFamily: "WorkSans-Bold",
    },
  });
