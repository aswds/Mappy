import { AntDesign } from "@expo/vector-icons";
import { View, TouchableOpacity, Image } from "react-native";
import { actuatedNormalize } from "../../../components/actuaterNormalize";
import * as Haptics from "expo-haptics";
import { useTheme } from "../../../Theme/ThemeProvider";
export const RenderImage = ({ item, id, onDelete }) => {
  const { theme } = useTheme();
  const colors = theme.colors;
  const bgColor = theme.dark ? "white" : "black";
  const iconColor = theme.dark ? "black" : "white";

  return (
    <View
      style={{
        height: actuatedNormalize(100),
        width: actuatedNormalize(100),
        margin: 10,
      }}
      key={id}
    >
      <TouchableOpacity
        style={{
          position: "absolute",
          zIndex: 1,
          right: -10,
          top: -10,
          backgroundColor: bgColor,
          borderRadius: 100,
          borderWidth: 1,
          borderColor: bgColor,
        }}
        onPress={() => {
          onDelete(id);
        }}
      >
        <AntDesign name="closecircle" size={24} color={iconColor} />
      </TouchableOpacity>
      <Image
        style={{ height: "100%", width: "100%", borderRadius: 5 }}
        source={{ uri: item.uri }}
        key={id}
      />
    </View>
  );
};
