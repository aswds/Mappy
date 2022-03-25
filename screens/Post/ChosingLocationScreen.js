import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
  PermissionsAndroid,
  Platform,
  Text,
  Image,
} from "react-native";
import WhiteButton from "../../components/headerComponents/whiteButton";
import { actuatedNormalize } from "../../components/actuaterNormalize";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { mapDarkStyle } from "../../components/mapDarkStyle";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import * as Haptics from "expo-haptics";
import * as Animatable from "react-native-animatable";
import MapView, { Marker, PROVIDER_GOOGLE, Callout } from "react-native-maps";
import { useNavigation, useRoute } from "@react-navigation/native";
import { bindActionCreators } from "redux";
import { fetchUser } from "../../redux/actions";
import { connect } from "react-redux";
import CustomTopNavigator from "../../components/CustomTopNavigator";

const ChosingLocationScreen = (props) => {
  const navigation = useNavigation();
  const route = useRoute();
  const [marker, setMarker] = useState();
  const [searchAnimation, setSearchAnimation] = useState();
  const [position, setPosition] = useState({
    latitude: 0,
    longitude: 0,
  });
  const [markerCoordinates, setMarkerCoordinates] = useState({
    latitude: null,
    longitude: null,
  });

  useEffect(() => {
    props.fetchUser();
  }, []);
  return (
    <View style={styles.container}>
      <MapView
        customMapStyle={mapDarkStyle}
        showsUserLocation
        mapType="standard"
        mapPadding={{ bottom: 0 }}
        style={{ ...StyleSheet.absoluteFillObject }}
        provider={PROVIDER_GOOGLE}
        region={
          position.latitude && position.longitude
            ? {
                latitude: position.latitude,
                longitude: position.longitude,
                latitudeDelta: 0.05,
                longitudeDelta: 0.1,
              }
            : null
        }
        onMapReady={() => {
          Platform.OS === "android"
            ? PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
              )
            : "";
        }}
        onPress={() => setSearchAnimation(false)}
      >
        {markerCoordinates.longitude && markerCoordinates.latitude ? (
          <Marker
            key={Math.random()}
            coordinate={{
              longitude: markerCoordinates.longitude,
              latitude: markerCoordinates.latitude,
            }}
          >
            <View style={styles.markerStyle}>
              <Image
                source={require("../../src/image/marker.png")}
                style={{
                  width: "50%",
                  height: "100%",
                }}
              />
            </View>

            <Callout>
              <Text>Hello</Text>
            </Callout>
          </Marker>
        ) : null}
      </MapView>
      <Callout>
        <CustomTopNavigator style={styles.customTopNavigatorStyle}>
          <TouchableOpacity
            onPress={() => {
              navigation.pop();
            }}
            style={{
              width: "15%",
              backgroundColor: "white",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Ionicons name="chevron-back-sharp" size={40} color="black" />
          </TouchableOpacity>
        </CustomTopNavigator>

        <SafeAreaView>
          <View style={styles.calloutView}>
            {searchAnimation ? (
              <View style={styles.googleAutocompleteStyle}>
                <Animatable.View
                  animation={"bounceInRight"}
                  duration={1000}
                  style={{
                    width: "100%",
                  }}
                >
                  <GooglePlacesAutocomplete
                    enablePoweredByContainer={false}
                    styles={{}}
                    minLength={2}
                    autoFocus={false}
                    returnKeyType={"default"}
                    placeholder="Search"
                    fetchDetails={true}
                    onPress={(data, details) => {
                      setPosition({
                        ...position,
                        latitude: details.geometry.location.lat,
                        longitude: details.geometry.location.lng,
                      });
                      setMarkerCoordinates({
                        ...markerCoordinates,
                        latitude: details.geometry.location.lat,
                        longitude: details.geometry.location.lng,
                      });
                    }}
                    onFail={(error) => console.error(error)}
                    query={{
                      key: "AIzaSyDW-1EM4u1QkHxZ9KmKb4tFBTXHwCpUdaM",
                      language: "en",
                      location: "latitude,longitude",
                    }}
                  />
                </Animatable.View>
                <Animatable.View
                  animation={"fadeIn"}
                  duration={1000}
                  style={{ width: "100%" }}
                >
                  <TouchableOpacity
                    style={styles.closeAnimationContainer}
                    onPress={() => {
                      setSearchAnimation(false);
                    }}
                  >
                    <AntDesign name="close" size={44} color="white" />
                  </TouchableOpacity>
                </Animatable.View>
              </View>
            ) : (
              <TouchableOpacity
                activeOpacity={0.1}
                style={{
                  ...styles.calloutSearch,
                  alignSelf: "flex-end",
                  height: 55,
                  width: 55,
                }}
                onPress={() => {
                  {
                    Haptics.impactAsync();
                    setSearchAnimation(true);
                  }
                }}
              >
                <FontAwesome5 name="search-location" size={30} color="black" />
              </TouchableOpacity>
            )}
          </View>
        </SafeAreaView>
      </Callout>
      <Callout
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: actuatedNormalize(40),
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {markerCoordinates.longitude && markerCoordinates.latitude ? (
          <View
            style={{
              width: "80%",
              maxWidth: "90%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <WhiteButton
              style={{ height: "100%", width: "100%" }}
              text="Countinue"
              textStyle={{ fontFamily: "Roboto-Bold" }}
              onPress={() => {
                navigation.navigate("PostCreatingScreen", {
                  location: {
                    longitude: position.longitude,
                    latitude: position.latitude,
                  },
                });
              }}
            />
          </View>
        ) : (
          <View
            style={{
              width: "80%",
              maxWidth: "90%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <WhiteButton
              buttonStyle={{ backgroundColor: "grey" }}
              style={{ height: "100%", width: "100%" }}
              text="Choose a location"
              textStyle={{ fontFamily: "Roboto-Bold" }}
            />
          </View>
        )}
      </Callout>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    height: "100%",
  },
  rightIconsContainer: {
    position: "absolute",
    width: Dimensions.get("window").width / 7,
    height: Dimensions.get("window").height / 2,
    alignSelf: "flex-end",
    justifyContent: "flex-end",
  },
  calloutView: {
    width: Dimensions.get("window").width,
    marginTop: "1%",
  },
  iconView: {
    width: Dimensions.get("window").width,
    marginTop: 20,
  },
  calloutSearch: {
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "center",
    marginRight: 10,
    borderRadius: 100,
    backgroundColor: "white",
    shadowOpacity: 0.5,
    shadowRadius: 2.5,
    shadowOffset: {
      width: 0,
      height: 1.5,
    },
    borderColor: "#a39c9c",
    marginTop: 0,
  },
  poweredContainer: {
    justifyContent: "flex-end",
    alignItems: "center",
    borderBottomRightRadius: 5,
    borderBottomLeftRadius: 5,
    borderColor: "#c8c7cc",
  },
  markerStyle: {
    height: 60,
    width: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  customTopNavigatorStyle: {
    backgroundColor: "transparent",
    width: "100%",
  },
  googleAutocompleteStyle: {
    width: "80%",
    alignSelf: "flex-start",
    marginTop: 5,
    marginLeft: 10,
    flexDirection: "row",
  },
  closeAnimationContainer: {
    height: 55,
    width: 55,
    alignItems: "center",
    shadowOpacity: 0.5,
    shadowRadius: 2.5,
    shadowOffset: {
      width: 0,
      height: 1.5,
    },
  },
});
ChosingLocationScreen.navigationOptions = () => {
  return {
    headerShown: true,
    headerTitle: () => {
      return null;
    },
    headerTransparent: {
      position: "absolute",
      backgroundColor: "transparent",
      zIndex: 100,
      top: 0,
      left: 0,
      right: 0,
    },
  };
};
const mapDispatchProps = (dispatch) => {
  return bindActionCreators({ fetchUser }, dispatch);
};
const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
});
export default connect(
  mapStateToProps,
  mapDispatchProps
)(ChosingLocationScreen);
