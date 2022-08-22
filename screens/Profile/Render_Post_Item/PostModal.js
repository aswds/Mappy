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
  Alert,
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
import { Feather } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
const PostModal = (props) => {
  const { data } = props;
  const location = useRef({
    latitude: undefined,
    longitude: undefined,
  });
  useEffect(() => {
    (location.current.latitude = data.location?.latitude),
      (location.current.longitude = data.location?.longitude);
  });

  const [animation, setAnimation] = useState(new Animated.Value(0));
  const [animationBorder, setAnimationBorder] = useState(new Animated.Value(0));
  const [isAnimationRan, setIsAnimationRan] = useState(false);
  const [userCanScroll, setUserCanScroll] = useState(true);

  const { theme } = useTheme();
  const colors = theme.colors;
  const iconSize = Dimensions.get("window").width * 0.1;
  const styles = makeStyle(theme, colors);
  const navigation = useNavigation();
  function closeModal() {
    setIsAnimationRan(false), props.hideModal();
    setAnimation(new Animated.Value(0));
    setAnimationBorder(new Animated.Value(0));
  }
  const animationStart = async () => {
    if (!isAnimationRan) {
      Animated.parallel([
        Animated.timing(animation, {
          toValue: 1,
          duration: 250,
          useNativeDriver: false,
        }),
        Animated.timing(animationBorder, {
          toValue: 1,
          duration: 300,
          useNativeDriver: false,
        }),
      ]).start(),
        setIsAnimationRan(true);
    }
  };
  const modalHeight = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ["85%", "100%"],
  });
  const modalBorderRad = animationBorder.interpolate({
    inputRange: [0, 1],
    outputRange: [40, 0],
  });
  const modalStyle = {
    height: modalHeight,
    borderTopLeftRadius: modalBorderRad,
    borderTopRightRadius: modalBorderRad,
  };
  const insets = useSafeAreaInsets();

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
            <ScrollView
              onScroll={animationStart}
              scrollEnabled={userCanScroll}
              style={styles.scrollViewContainer}
              scrollEventThrottle={1}
              contentContainerStyle={{
                paddingTop: insets.top,
                paddingBottom: insets.bottom,
              }}
              showsVerticalScrollIndicator={false}
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
                    <Swiper images={data.images} type={data.type} />
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
                  <TitleContainer style={styles.locationTitleStyle}>
                    <Title
                      style={{
                        color: colors.text,
                      }}
                    >
                      Location
                    </Title>
                    <TouchableOpacity
                      style={{ paddingHorizontal: 10 }}
                      onPress={() => {
                        Alert.alert(
                          "Location ",
                          "To see place in full screen, just tap on the map"
                        );
                      }}
                    >
                      <Feather name="info" size={20} color={colors.text} />
                    </TouchableOpacity>
                  </TitleContainer>
                  <ContentContainer>
                    <Text style={styles.locationText} numberOfLines={1}>
                      New York, Backer street fd Dfd
                    </Text>
                  </ContentContainer>
                  <View
                    style={{
                      height: Dimensions.get("window").height * 0.45,
                    }}
                  >
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
                        region={{
                          latitude: location.current.latitude,
                          longitude: location.current.longitude,
                          latitudeDelta: 0.4,
                          longitudeDelta: 15,
                        }}
                        style={[StyleSheet.absoluteFillObject, styles.mapStyle]}
                        provider={PROVIDER_GOOGLE}
                      />
                    </View>
                  </View>
                </View>
              </View>
            </ScrollView>
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
    locationTitleStyle: {
      flexDirection: "row",
      alignItems: "center",
    },
    locationText: {
      fontSize: 15,
      color: colors.text,
      fontFamily: "WorkSans-Bold",
      maxWidth: "85%",
      alignItems: "flex-start",
    },
  });
};

export default PostModal;
