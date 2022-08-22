import { MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useLayoutEffect, useState } from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { actuatedNormalize } from "../../../components/actuaterNormalize";
import { useTheme } from "../../../Theme/ThemeProvider";
import { RenderImage } from "../RenderItems/RenderImage";
import AddPhotoButtonComp from "./components/AddPhotoButtonComp";
import { ShareButton } from "./ShareButton";
import { DescriptionContainer, InputSection, Section } from "./styles";
export const Description = () => {
  // const rate = route.params?.rate;
  // const rateCaption = route.params?.rateCaption;
  // const locationData = route.params?.locationData;
  const route = useRoute();
  const navigation = useNavigation();
  const [title, setTitle] = useState();
  const [caption, setCaption] = useState();
  const [media, setMedia] = useState(null);
  const [rate, setRate] = useState(route.params?.rate);
  const [rateCaption, setRateCaption] = useState(route.params?.rateCaption);
  const [locationData, setLocationData] = useState(route.params?.locationData);
  const { theme } = useTheme();
  const colors = theme.colors;
  const styles = makeStyles(colors, theme);
  const placeHolderTextColor = theme.dark ? "#AEAEAE" : "rgba(130,130,130,1)";
  const borderColor = {
    borderColor: theme.dark ? "#BEBDBD" : "rgb(0,0,0)",
  };
  if (route.params?.photos) {
    setMedia(route.params.photos);
    delete route.params.photos;
  }
  function onDelete(id) {
    media.map((item) => {
      console.log(item.id);
    });
    setMedia(
      media.filter((item) => {
        return item.id !== id;
      })
    );
  }
  return (
    <>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ justifyContent: "space-between" }}
      >
        <TouchableWithoutFeedback
          style={{ flex: 1 }}
          onPress={() => {
            Keyboard.dismiss();
          }}
        >
          <KeyboardAvoidingView style={{ flex: 1 }}>
            <DescriptionContainer
              style={{
                height: Dimensions.get("window").height / 2.5,
              }}
            >
              <Section>
                <Text style={styles.title}>Title</Text>
                <InputSection style={borderColor}>
                  <TextInput
                    placeholder="Write title to your post"
                    placeholderTextColor={placeHolderTextColor}
                    onChangeText={setTitle}
                    style={{
                      padding: 10,
                      fontWeight: "bold",
                      color: colors.text,
                      fontSize: 17,
                    }}
                    multiline
                  />
                </InputSection>
              </Section>
              <Section style={{ maxHeight: "40%" }}>
                <Text style={styles.title}>Caption</Text>
                <InputSection style={borderColor}>
                  <TextInput
                    placeholder="Write"
                    placeholderTextColor={placeHolderTextColor}
                    style={{
                      padding: 10,
                      color: colors.text,
                    }}
                    onChangeText={setCaption}
                    multiline
                  />
                </InputSection>
              </Section>
            </DescriptionContainer>
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
        <View style={styles.scrollViewContainer}>
          <FlatList
            ListHeaderComponent={
              <AddPhotoButtonComp theme navigation={navigation} />
            }
            horizontal={true}
            contentContainerStyle={styles.scrollViewContentCont}
            data={media}
            renderItem={({ item }) => (
              <RenderImage item={item} id={item.id} onDelete={onDelete} />
            )}
            keyExtractor={(item) => item.id}
          />
        </View>
      </ScrollView>
      <ShareButton
        media={media}
        title={title}
        caption={caption}
        locationData={locationData}
        rate={rate}
        rateCaption={rateCaption}
      />
    </>
  );
};
const makeStyles = (colors, theme, inputHeight) =>
  StyleSheet.create({
    scrollViewContentCont: {
      justifyContent: "space-between",
      alignItems: "center",
      padding: 10,
    },
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },

    textInputStyle: {
      padding: 5,
      color: colors.text,
      height: inputHeight,
    },
    titleContainer: {
      marginHorizontal: 20,
    },

    title: {
      color: colors.text,
      fontFamily: "WorkSans-Bold",
      fontSize: 20,
      marginBottom: "5%",
    },

    nextButtonContainer: {
      width: "50%",
      alignItems: "center",
      justifyContent: "space-evenly",
      flexDirection: "row",
    },
    nextButtonText: {
      fontFamily: "WorkSans-Bold",
      color: colors.text,
    },
  });
