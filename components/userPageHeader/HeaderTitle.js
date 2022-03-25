import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import firebase from "firebase";
function FollowUserPageHeader({ userUID }) {
  const [username, setUsername] = useState();
  useEffect(() => {
    firebase
      .firestore()
      .collection("users")
      .doc(userUID)
      .get()
      .then((snapshot) => {
        setUsername(snapshot.data());
      })
      .catch((e) => {
        console.log(e);
      });
  });
  return (
    <View style={{ justifyContent: "center" }}>
      <Text style={{ color: "white", fontFamily: "Lato-Bold", fontSize: 17 }}>
        {username}'s
      </Text>
    </View>
  );
}

export default FollowUserPageHeader;
