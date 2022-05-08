import { TouchableOpacity, Image } from "react-native";
import { actuatedNormalize } from "../../../components/actuaterNormalize";
export const RenderImage = ({ item }, { key }) => {
  return (
    <TouchableOpacity
      style={{
        height: actuatedNormalize(100),
        width: actuatedNormalize(100),
        margin: 10,
      }}
      key={key + Math.random()}
    >
      <Image
        style={{ height: "100%", width: "100%", borderRadius: 5 }}
        source={{ uri: item.uri }}
        key={key + Math.random() + "image"}
      />
    </TouchableOpacity>
  );
};
