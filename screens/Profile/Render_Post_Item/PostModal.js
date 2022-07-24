import { FontAwesome } from "@expo/vector-icons";
import React, { useEffect, useRef, useState } from "react";
import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  Animated,
  Dimensions,
  TouchableOpacity,
  PanResponder,
  SafeAreaView,
  Image,
  StatusBar,
  Easing,
} from "react-native";
import { useTheme } from "../../../Theme/ThemeProvider";
import { PanGestureHandler } from "react-native-gesture-handler";
import Swiper from "./components/Swiper";
import { CloseButton } from "./components/CloseButton";
import { ContentContainer, Title, TitleContainer } from "./components/styled";
import { RatingButton } from "../../../components/Post/RatingButtonPostCreating";
import RatingButtons from "./components/RatingButtons";
import MapView, { Callout, PROVIDER_GOOGLE } from "react-native-maps";
import { mapDarkStyle } from "../../../components/mapDarkStyle";
import { useNavigation } from "@react-navigation/native";

const PostModal = (props) => {
  const [animation, setAnimation] = useState(new Animated.Value(0));
  const [isAnimationRan, setIsAnimationRan] = useState(false);
  const [userCanScroll, setUserCanScroll] = useState(true);
  const { theme } = useTheme();
  const colors = theme.colors;
  const { data } = props;
  const iconSize = Dimensions.get("window").width * 0.1;
  const styles = makeStyle(theme, colors);
  const navigation = useNavigation();
  function closeModal() {
    setIsAnimationRan(false), props.hideModal();
    setAnimation(new Animated.Value(0));
  }
  const animationStart = async () => {
    if (!isAnimationRan) {
      await Animated.timing(animation, {
        toValue: 1,
        duration: 250,
        useNativeDriver: false,
      }).start(),
        setIsAnimationRan(true);
    }
  };
  const modalHeight = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ["85%", "100%"],
  });
  const modalStyle = {
    height: modalHeight,
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={props.showModal}
      onRequestClose={props.hideModal}
    >
      <StatusBar barStyle={!theme.dark ? "dark-content" : "light-content"} />

      <View style={styles.centeredView}>
        <Animated.View
          style={{
            ...modalStyle,
            ...styles.modalView,
          }}
        >
          <View style={styles.scrollViewContainer}>
            <SafeAreaView style={{ flex: 1 }}>
              <ScrollView
                onScroll={animationStart}
                scrollEnabled={userCanScroll}
                style={styles.scrollViewContainer}
                scrollEventThrottle={1}
              >
                <View>
                  <View style={styles.headerContainer}>
                    <View style={styles.titleContainer}>
                      <Title style={{ color: colors.text }} numberOfLines={3}>
                        {data.title}
                      </Title>
                    </View>
                    <CloseButton
                      closeModal={closeModal}
                      iconSize={iconSize}
                      color={colors.text}
                    />
                  </View>
                  <View style={{}}>
                    <View
                      style={{
                        height: Dimensions.get("window").width * 0.9,
                        width: "100%",
                      }}
                    >
                      <Swiper images={data.images} />
                    </View>
                  </View>
                  <View>
                    <ContentContainer>
                      <Text style={styles.textStyle}>{data.caption}</Text>
                    </ContentContainer>
                    <TitleContainer>
                      <Title style={{ color: colors.text }}>Rating</Title>
                    </TitleContainer>
                    <RatingButtons
                      rate={data.rate}
                      bgColor={theme.dark ? "#1D1D1D" : "white"}
                    />
                    <ContentContainer>
                      <Text style={styles.textStyle}>
                        {data.rateCaption ? data.rateCaption : ""}
                      </Text>
                    </ContentContainer>
                  </View>
                  <View>
                    <TitleContainer>
                      <Title style={{ color: colors.text }}>Location</Title>
                    </TitleContainer>
                    <View
                      style={{
                        height: Dimensions.get("window").height * 0.4,
                        marginTop: 10,
                        borderRadius: 10,
                      }}
                    >
                      <MapView
                        onPress={() => {
                          props.hideModal();
                          navigation.navigate("Map", { screen: "MapScreen" });
                        }}
                        customMapStyle={mapDarkStyle}
                        showsUserLocation={true}
                        mapType="standard"
                        style={[StyleSheet.absoluteFillObject, styles.mapStyle]}
                        provider={PROVIDER_GOOGLE}
                        onMapReady={() => {
                          Platform.OS === "android"
                            ? PermissionsAndroid.request(
                                PermissionsAndroid.PERMISSIONS
                                  .ACCESS_FINE_LOCATION
                              )
                            : "";
                        }}
                      />
                    </View>
                  </View>
                </View>
              </ScrollView>
            </SafeAreaView>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

const makeStyle = (theme, colors) => {
  return StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: "flex-end",

      alignItems: "center",
    },
    modalView: {
      justifyContent: "space-around",
      alignItems: "center",
      flexDirection: "row",
      width: "100%",
      backgroundColor: theme.dark ? "#1D1D1D" : "white",
      borderTopRightRadius: 40,
      borderTopLeftRadius: 40,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowColor: "white",
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    scrollViewContainer: { flex: 1 },
    headerContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      width: "100%",
    },
    titleContainer: {
      maxWidth: "75%",
      marginVertical: "5%",
      marginLeft: "5%",
    },
    title: {
      fontFamily: "WorkSans-Bold",
      color: colors.text,
      fontSize: 24,
    },
    textStyle: {
      color: colors.text,
      fontFamily: "WorkSans-Regular",
      fontSize: 14,
    },
    iconStyle: {
      alignItems: "center",
      width: 250,
      height: 40,
      justifyContent: "center",
      padding: 10,
    },

    iconText: { fontWeight: "bold", color: "white" },
    containerSafeArea: {
      flex: 1,
      backgroundColor: "black",
    },
    mapStyle: {
      borderRadius: 10,
      borderWidth: 2,
    },
  });
};

export default PostModal;
