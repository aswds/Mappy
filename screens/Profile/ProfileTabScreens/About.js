import React from "react";
import firebase from "firebase";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
} from "react-native";
import { useTheme } from "../../../Theme/ThemeProvider";
import { Title } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";
import { Section } from "./Section";
import { ICONS } from "../../../data/IconData";
import { useNavigation } from "@react-navigation/native";
export const About = (props) => {
  const { theme } = useTheme();
  const colors = theme.colors;
  const styles = makeSyles(colors, theme);
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Section
        title={"About me"}
        onPress={() => navigation.navigate("EditAbout")}
      >
        <Text
          style={{
            color: colors.text,
            fontFamily: "WorkSans-Regular",
            fontSize: 15,
          }}
        >
          i'm young app developer whos using react native to become his dream
          come true
        </Text>
      </Section>
      <View style={styles.section}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: 15,
          }}
        >
          <Text
            style={{
              color: "white",
              fontFamily: "WorkSans-Bold",
              color: colors.text,
              marginBottom: 10,
              fontSize: 20,
            }}
          >
            Hobbies
          </Text>

          <Text
            style={{
              color: colors.text,
              fontFamily: "WorkSans-Regular",
              paddingHorizontal: "1%",
              fontSize: 15,
            }}
            onPress={() => navigation.navigate("EditAbout")}
          >
            Edit
          </Text>
        </View>
        <FlatList
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          horizontal
          style={{ flex: 1 }}
          contentContainerStyle={{ height: 150, alignItems: "center" }}
          data={ICONS}
          renderItem={({ item }) => {
            return (
              <View style={styles.hobbiesContainer} key={item.id}>
                {item.iconName}
                <Text style={{ color: "white", fontFamily: "WorkSans-Bold" }}>
                  {item.title}
                </Text>
              </View>
            );
          }}
        />
      </View>
    </View>
  );
};
const makeSyles = (colors: any, theme) =>
  StyleSheet.create({
    container: { flex: 1, alignItems: "center" },
    hobbiesContainer: {
      justifyContent: "center",
      width: 100,
      height: 100,
      alignItems: "center",
      marginHorizontal: 10,
      borderRadius: 15,
      shadowOpacity: 0.4,
      shadowColor: theme.dark ? "white" : "black",
      backgroundColor: colors.background,
      shadowOffset: { width: 0, height: 1 },
      shadowRadius: 5,
      paddingHorizontal: 10,
    },
    section: {
      width: "90%",
      marginVertical: "5%",
      borderRadius: 15,
      shadowOpacity: 0.4,
      shadowColor: theme.dark ? "white" : "black",
      backgroundColor: colors.background,
      shadowOffset: { width: 0, height: 1 },
      shadowRadius: 5,
      paddingVertical: "5%",
    },
  });
