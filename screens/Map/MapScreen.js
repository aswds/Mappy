import {
  AntDesign,
  FontAwesome5,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import * as Location from "expo-location";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  PermissionsAndroid,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import * as Animatable from "react-native-animatable";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import MapView, { Callout, PROVIDER_GOOGLE } from "react-native-maps";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { mapDarkStyle } from "../../components/mapDarkStyle";
import { fetchUser } from "../../redux/actions";
import TopModal from "./TopModal";

const MainScreen = (props) => {
  const [marker, setMarker] = useState();
  const [searchAnimation, setSearchAnimation] = useState();
  const [position, setPosition] = useState({
    latitude: 0,
    longitude: 10,
  });
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync();
      setPosition({
        ...position,
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    };
  }, []);
  const _hideModal = () => {
    setShowModal(false);
  };
  return (
    <View style={styles.container}>
      <MapView
        customMapStyle={mapDarkStyle}
        showsMyLocationButton={true}
        showsUserLocation={true}
        mapType="standard"
        style={StyleSheet.absoluteFillObject}
        provider={PROVIDER_GOOGLE}
        region={
          position.latitude && position.longitude
            ? {
                latitude: position.latitude,
                longitude: position.longitude,
                latitudeDelta: 0.1,
                longitudeDelta: 10,
              }
            : null
        }
        onPress={() => setSearchAnimation(false)}
        onMapReady={() => {
          Platform.OS === "android"
            ? PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
              )
            : "";
        }}
      ></MapView>
      {/* <Marker
          key={markers.name}
          coordinate={{
            latitude: markers.latitude,
            longitude: markers.longitude,
          }}
        >
          <Callout></Callout>
        </Marker> */}
      <Callout style={{ backgroundColor: "yellow" }}>
        <SafeAreaView>
          <View style={styles.calloutView}>
            {searchAnimation ? (
              <View style={styles.animationSearchContainer}>
                <Animatable.View
                  animation={"bounceInRight"}
                  duration={1000}
                  style={{ width: "100%" }}
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
                    style={styles.closeButtonStyle}
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
      <Callout style={{ backgroundColor: "red", right: 0, top: "20%" }}>
        <TouchableOpacity
          style={{
            ...styles.calloutSearch,
            alignSelf: "flex-end",
            height: 55,
            width: 55,
            marginVertical: "10%",
          }}
        >
          <MaterialCommunityIcons name="map-marker-up" size={40} />
        </TouchableOpacity>
      </Callout>
      <TopModal showModal={showModal} hideModal={_hideModal} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  rightIconsContainer: {
    position: "absolute",
    width: Dimensions.get("window").width / 7,
    height: Dimensions.get("window").height / 2,
    marginTop: "70%",
    marginRight: 10,
    alignSelf: "flex-end",
    justifyContent: "flex-end",
  },
  calloutView: {
    width: Dimensions.get("window").width,
    marginTop: "10%",
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
  },
  poweredContainer: {
    justifyContent: "flex-end",
    alignItems: "center",
    borderBottomRightRadius: 5,
    borderBottomLeftRadius: 5,
    borderColor: "#c8c7cc",
  },
  closeButtonStyle: {
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
  animationSearchContainer: {
    width: "80%",
    alignSelf: "flex-start",
    marginTop: 5,
    marginLeft: 10,
    flexDirection: "row",
  },
});
MainScreen.navigationOptions = () => {
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
export default connect(mapStateToProps, mapDispatchProps)(MainScreen);
