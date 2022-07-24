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
  rate = rate == undefined ? null : rate;
  caption = caption == undefined ? null : caption;

  console.log(`UPloading: ${rateCaption}`);
  console.log(
    `media:${media}\nlocation:${location}\ntitle:${title}\ncaption${caption}\nrate:${rate}\nrateCaption:${rateCaption}`
  );
  addingPost(downloadURLs, location, title, caption, rate, rateCaption);
};
