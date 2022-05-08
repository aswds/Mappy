import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { SearchBar } from "react-native-elements";
import { actuatedNormalize } from "../../components/actuaterNormalize";
import { useTheme } from "../../Theme/ThemeProvider";
import { fetchUsers } from "./fetchUsers";
import RenderItem from "./RenderItem";
const SearchScreen = (props) => {
  const [textInput, setTextInput] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { theme } = useTheme();
  const colors = theme.colors;
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

      <View style={{ flex: 1, backgroundColor: colors.background }}>
        <FlatList
          style={{ flex: 1, backgroundColor: colors.background }}
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
