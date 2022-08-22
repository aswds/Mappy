import { LinearGradient } from "expo-linear-gradient";
import { Text, View } from "react-native";
import { actuatedNormalize } from "../../../components/actuaterNormalize";

export const Line = () => {
  return (
    <View
      style={{
        height: "10%",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <LinearGradient
        colors={["#D9D9D9", "#121212"]}
        style={{ height: 3, width: actuatedNormalize(90), borderRadius: 2 }}
        start={[1, 0]}
        end={[0, 1]}
      />

      <Text style={{ color: "white", margin: "5%", fontSize: 13 }}>
        Or countinue with
      </Text>
      <LinearGradient
        colors={["#D9D9D9", "#121212"]}
        style={{ height: 3, width: actuatedNormalize(90), borderRadius: 2 }}
        start={[0, 1]}
        end={[1, 0]}
      />
    </View>
  );
};
