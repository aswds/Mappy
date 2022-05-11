import { MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useLayoutEffect, useState } from "react";
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
import { actuatedNormalize } from "../../../components/actuaterNormalize";
import { useTheme } from "../../../Theme/ThemeProvider";
import { RenderImage } from "../RenderItems/RenderImage";
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

  useEffect(() => {
    if (route.params?.photos) {
      setMedia(route.params?.photos);
      delete route.params?.photos;
    }
  }, [route.params?.photos]);

  return (
    <>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ justifyContent: "space-between" }}
      >
        {/* fix KeyboardAvoidingView */}
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
                <InputSection style={{ borderColor: "#BEBDBD" }}>
                  <TextInput
                    placeholder="Write title to your post"
                    placeholderTextColor={"#AEAEAE"}
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
                <InputSection style={{ borderColor: "#BEBDBD" }}>
                  <TextInput
                    placeholder="Write"
                    placeholderTextColor={"#AEAEAE"}
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
          <ScrollView
            showsHorizontalScrollIndicator={false}
            horizontal
            key={Math.random()}
            contentContainerStyle={{
              justifyContent: "space-between",
              alignItems: "center",
              padding: 10,
            }}
            style={{
              flex: 1,
              backgroundColor: colors.background,
            }}
          >
            <TouchableOpacity
              style={{ ...styles.modalButton }}
              onPress={() => {
                navigation.navigate("ImagePicker");
              }}
            >
              <View
                style={{
                  flex: 1,
                  backgroundColor: "rgba(219,219,219,0.33)",
                  borderRadius: 10,
                  shadowOpacity: 0.4,
                  shadowOffset: {
                    height: 2,
                    width: 0,
                  },
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <MaterialIcons
                  name="add-photo-alternate"
                  size={40}
                  color="black"
                />
              </View>
            </TouchableOpacity>
            {media &&
              media.map((item, key) => <RenderImage item={item} key={key} />)}
          </ScrollView>
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

    modalButton: {
      height: actuatedNormalize(100),
      width: actuatedNormalize(100),
      margin: 10,
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
