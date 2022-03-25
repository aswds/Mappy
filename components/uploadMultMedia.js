import firebase from "firebase";
import saveMediaToStorage from "./saveMediaToStorage";
import { useState } from "react";
import addingPost from "./addingPost";
import { postUploadingStart, postUploadingEnd } from "../redux/actions";
export const uploadMultMedia = async (media, location, caption) => {
  const downloadURLs = await Promise.all(
    media.map((p) => saveMediaToStorage(p))
  );
  await addingPost(downloadURLs, location, caption);
};
