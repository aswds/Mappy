import { View, ScrollView, StyleSheet, Dimensions } from "react-native";
import { RatingButton } from "./RatingButton";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "../../../../Theme/ThemeProvider";
export default function RatingButtons({ rate, bgColor }) {
  const { theme } = useTheme();
  const colors = theme.colors;
  const styles = makeStyles(theme, colors);
  const rateBackground = "rgba(219,219,219,0.6)";
  const iconSize = 25;
  return (
    <View style={styles.scrollViewContainer}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        horizontal
        key={Math.random()}
        contentContainerStyle={{
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: 10,
        }}
        style={{
          flex: 1,
          paddingVertical: 10,
          backgroundColor: bgColor,
        }}
      >
        <RatingButton
          backgroundColor={rate === 5 ? "#57e32c" : rateBackground}
          icon={
            <MaterialCommunityIcons
              name="emoticon-excited-outline"
              size={iconSize}
              color={colors.background}
            />
          }
        />
        <RatingButton
          backgroundColor={rate === 4 ? "#b7dd29" : rateBackground}
          icon={
            <MaterialCommunityIcons
              name="emoticon-happy-outline"
              size={iconSize}
              color={colors.background}
            />
          }
        />
        <RatingButton
          backgroundColor={rate === 3 ? "#ffe234" : rateBackground}
          icon={
            <MaterialCommunityIcons
              name="emoticon-neutral-outline"
              size={iconSize}
              color={colors.background}
            />
          }
        />
        <RatingButton
          backgroundColor={rate === 2 ? "#ffa534" : rateBackground}
          icon={
            <MaterialCommunityIcons
              name="emoticon-confused-outline"
              size={iconSize}
              color={colors.background}
            />
          }
        />
        <RatingButton
          backgroundColor={rate === 1 ? "#ff4545" : rateBackground}
          icon={
            <MaterialCommunityIcons
              name="emoticon-sad-outline"
              size={iconSize}
              color={colors.background}
            />
          }
        />
      </ScrollView>
    </View>
  );
}
const makeStyles = (theme, colors) =>
  StyleSheet.create({
    scrollViewContainer: {
      width: Dimensions.get("window").width,
      borderColor: theme.dark ? "grey" : "black",
    },
  });
