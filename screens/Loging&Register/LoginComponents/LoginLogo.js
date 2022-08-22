import { View, Image } from "react-native";
import { styles } from "../Login/styles";
export const Logo = () => {
  return (
    <View style={styles.imageContainer}>
      <Image
        style={{}}
        source={require("../../../src/image/logoAuth.png")}
        style={{
          height: "100%",
          width: "100%",
        }}
      />
    </View>
  );
};
