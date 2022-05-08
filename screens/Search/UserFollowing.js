import { FontAwesome, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
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
import { fetchUserFollowing } from "./fetchUserFollowing";
import RenderItem from "./RenderItem";
const UserFollowing = (props) => {
  const { theme } = useTheme();
  const colors = theme.colors;
  const [textInput, setTextInput] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const route = useRoute();
  const userUID = route.params?.userUID;
  useEffect(() => {
    fetchUserFollowing(textInput, userUID).then((users) => {
      setFilteredUsers(users);
    });
  }, [textInput]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <StatusBar />
      <View
        style={{
          height: actuatedNormalize(60),
          justifyContent: "flex-end",
          backgroundColor: colors.background,
          alignItems: "center",
          width: "100%",
        }}
      >
        <SearchBar
          searchIcon={<FontAwesome name="search" size={20} color="grey" />}
          showLoading={isLoading}
          loadingProps={{ color: "black" }}
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
      </View>

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

UserFollowing.navigationOptions = () => {
  return {
    headerStyle: {
      backgroundColor: "black",
    },
    headerLeft: () => {
      return (
        <TouchableOpacity
          onPress={() => {
            props.navigation.pop();
          }}
          style={{
            width: actuatedNormalize(60),
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Ionicons name="chevron-back-sharp" size={34} color="white" />
        </TouchableOpacity>
      );
    },
  };
};

export default UserFollowing;
