import {
  FontAwesome5,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { List } from "react-native-paper";
export const PasswordRules = () => {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{
        justifyContent: "space-evenly",
        flex: 1,
      }}
    >
      <List.Item
        title="Length"
        description="At least 8 characters—the more characters, the better"
        left={(props) => (
          <FontAwesome5
            size={30}
            name="ruler-horizontal"
            style={{
              alignSelf: "center",
              aspectRatio: 1 / 1,
              marginHorizontal: 10,
            }}
          />
        )}
      />
      <List.Item
        title="Letter types"
        description="A mixture of both uppercase and lowercase letters"
        left={(props) => (
          <MaterialIcons
            size={30}
            name="format-size"
            style={{
              alignSelf: "center",
              aspectRatio: 1 / 1,
              marginHorizontal: 10,
            }}
          />
        )}
      />
      <List.Item
        title="Order"
        description="A mixture of letters and numbers"
        left={(props) => (
          <MaterialCommunityIcons
            size={30}
            name="bowl-mix"
            style={{
              alignSelf: "center",
              aspectRatio: 1 / 1,
              marginHorizontal: 10,
            }}
          />
        )}
      />
      <List.Item
        title="Special character"
        description="Inclusion of at least one special character, e.g., ! @ # ?"
        left={(props) => (
          <MaterialIcons
            size={30}
            name="emoji-symbols"
            style={{
              alignSelf: "center",
              aspectRatio: 1 / 1,
              marginHorizontal: 10,
            }}
          />
        )}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 10,
  },
  title: {
    fontFamily: "WorkSans-Bold",
    fontSize: 20,
  },
  ruleTextStyle: {
    fontFamily: "WorkSans-Regular",
    fontSize: 15,
  },
});
