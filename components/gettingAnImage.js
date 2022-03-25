import firebase from "firebase";
const getProfileImage = async () => {
  const uri = await firebase
    .storage()
    .ref("profileImages/" + firebase.auth().currentUser.uid)
    .getDownloadURL();
  return uri;
};

export default getProfileImage;
