import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { List } from "react-native-paper";

export const PasswordRules = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ justifyContent: "space-evenly", flex: 1 }}
      >
        <List.Item
          title="Length"
          description="At least 8 characters—the more characters, the better"
          left={(props) => <List.Icon {...props} icon="folder" />}
        />
        <List.Item
          title="Letter types"
          description="A mixture of both uppercase and lowercase letters"
          left={(props) => <List.Icon {...props} icon="folder" />}
        />
        <List.Item
          title="Order"
          description="A mixture of letters and numbers"
          left={(props) => <List.Icon {...props} icon="folder" />}
        />
        <List.Item
          title="Special character"
          description="Inclusion of at least one special character, e.g., ! @ # ?"
          left={(props) => <List.Icon {...props} icon="folder" />}
        />
      </ScrollView>
    </SafeAreaView>
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
