import firebase from "firebase";
import saveMediaToStorage from "./saveMediaToStorage";
import { useState } from "react";
import addingPost from "./addingPost";
import { postUploadingStart, postUploadingEnd } from "../redux/actions";
export const uploadMultMedia = async (
  media,
  location,
  title,
  caption,
  rate,
  rateCaption
) => {
  const downloadURLs = await Promise.all(
    media.map((p) => saveMediaToStorage(p))
  );
  console.log(`UPloading: ${rateCaption}`);
  addingPost(downloadURLs, location, title, caption, rate, rateCaption);
};
