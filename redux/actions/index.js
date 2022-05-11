import firebase from "firebase";
import { Alert } from "react-native";
import {
  USER_STATE_CHANGE,
  USER_POST_STATE_CHANGE,
  POST_UPLOADING_START,
  POST_UPLOADING_END,
  USER_FOLLOWING_STATE_CHANGE,
  USER_FOLLOWERS_STATE_CHANGE,
  SWITCH_THEME,
  USER_INFO_LOADED,
  USER_INFO_LOADING,
} from "../constans";
export function fetchUser() {
  return (dispatch) => {
    dispatch({ type: USER_INFO_LOADING });
    firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          return dispatch({
            type: USER_INFO_LOADED,
            currentUser: snapshot.data(),
          });
        } else {
          return alert("User not found");
        }
      });
  };
}
export function fetchUserPosts() {
  return (dispatch) => {
    firebase
      .firestore()
      .collection("posts")
      .doc(firebase.auth().currentUser.uid)
      .collection("userPosts")
      .orderBy("creation", "desc")
      .get()
      .then((snapshot) => {
        let posts = snapshot.docs.map((doc) => {
          const data = doc.data();
          const id = doc.id;

          return { id, ...data };
        });
        dispatch({
          type: USER_POST_STATE_CHANGE,
          posts,
        });
      })
      .catch((e) => Alert.alert(e));
  };
}
export const fetchUserFollowing = () => {
  return (dispatch) => {
    firebase
      .firestore()
      .collection("Following")
      .doc(firebase.auth().currentUser.uid)
      .collection("userFollowing")
      .onSnapshot((snapshot) => {
        let following = snapshot.docs.map((doc) => {
          const id = doc.id;
          return id;
        });
        dispatch({ type: USER_FOLLOWING_STATE_CHANGE, following });
      });
  };
};
export const fetchUserFollowers = () => {
  return (dispatch) => {
    firebase
      .firestore()
      .collection("Followers")
      .doc(firebase.auth().currentUser.uid)
      .collection("userFollowers")
      .onSnapshot((snapshot) => {
        let followers = snapshot.docs.map((doc) => {
          const id = doc.id;
          return id;
        });
        dispatch({ type: USER_FOLLOWERS_STATE_CHANGE, followers });
      });
  };
};
export const postUploadingStart = () => {
  return (dispatch) => {
    return dispatch({
      type: POST_UPLOADING_START,
      payload: true,
    });
  };
};

export const postUploadingEnd = () => {
  return (dispatch) => {
    return dispatch({
      type: POST_UPLOADING_END,
      payload: false,
    });
  };
};
export const switchTheme = (theme) => {
  return (dispatch) => {
    return dispatch({
      type: SWITCH_THEME,
      theme: theme,
    });
  };
};
