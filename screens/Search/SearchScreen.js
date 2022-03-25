import React, {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  FlatList,
  StatusBar,
  Platform,
  Image,
  ActivityIndicator,
  ImageBackground,
} from "react-native";
import HeaderSearchBar from "../../components/searchBar";
import { actuatedNormalize } from "../../components/actuaterNormalize";
import firebase from "firebase";
import { SearchBar } from "react-native-elements";
import { Avatar } from "@react-native-material/core";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";
import { Keyboard } from "react-native";
import { Image as CachedImage } from "react-native-expo-image-cache";
import { Skeleton } from "moti/skeleton";
import RenderItem from "./RenderItem";
import { fetchUsers } from "./fetchUsers";
import { useNavigation, useTheme } from "@react-navigation/native";
const SearchScreen = (props) => {
  const [textInput, setTextInput] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { colors } = useTheme();
  const theme = useTheme();
  const navigation = useNavigation();
  useEffect(() => {
    fetchUsers(textInput).then((users) => {
      if (users != filteredUsers) {
        setFilteredUsers(users);
      }
    });
  }, [textInput]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <StatusBar barStyle={theme.dark ? "light-content" : "dark-content"} />

      <SearchBar
        searchIcon={<FontAwesome name="search" size={20} color="grey" />}
        showLoading={isLoading}
        loadingProps={{ color: colors.text }}
        onChangeText={(search) => {
          setTextInput(search);
        }}
        style={{ color: "black" }}
        placeholder="Search"
        placeholderTextColor={"grey"}
        containerStyle={{
          backgroundColor: colors.background,
          borderTopWidth: 0,
          borderBottomWidth: 0,
        }}
        value={textInput}
        leftIconContainerStyle={{
          width: actuatedNormalize(30),
        }}
        inputContainerStyle={{
          width: "100%",
          height: actuatedNormalize(40),
          borderRadius: 10,
          backgroundColor: "#a5a5a5",
        }}
        clearIcon={() => {
          return (
            <TouchableOpacity
              style={{
                height: 35,
                width: 35,
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() => {
                setFilteredUsers(null);
                setTextInput(null);
              }}
            >
              <MaterialIcons name="cancel" size={24} color="black" />
            </TouchableOpacity>
          );
        }}
        onClear={() => onClear()}
      />

      <View style={{ flex: 1 }}>
        <FlatList
          style={{ flex: 1 }}
          data={filteredUsers}
          horizontal={false}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <RenderItem item={item} />}
          key={Math.random()}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
  },
  userContainer: {
    flex: 1,
    justifyContent: "flex-start",
    marginVertical: 20,
    marginHorizontal: 20,
  },
  image: {
    height: "100%",
    width: "100%",
    borderRadius: 100,
  },
  avataStyle: {
    margin: 10,
    height: actuatedNormalize(50),
    width: actuatedNormalize(50),
    borderRadius: 100,
  },
});

export default SearchScreen;
