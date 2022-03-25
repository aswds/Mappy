import React, { useState } from "react";
import firebase from "firebase";
import { ImageStore } from "react-native";
import * as MediaLibrary from "expo-media-library";
const saveMediaToStorage = async (media) => {
  const childPath = `post/${
    firebase.auth().currentUser.uid
  }/${Math.random().toString(36)}`;
  let uri = media.uri;
  if (media.mediaType) {
    let myAssetId = await uri.slice(5);
    let returnedAssetInfo = await MediaLibrary.getAssetInfoAsync(myAssetId);
    uri = returnedAssetInfo.localUri;
  }
  const response = await fetch(uri);
  const blob = await response.blob();

  const snapshot = await firebase.storage().ref().child(childPath).put(blob);
  const downloadURL = await snapshot.ref.getDownloadURL();
  return downloadURL;
};
export default saveMediaToStorage;
