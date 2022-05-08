import firebase from "firebase";
export function fetchUserPosts(userUID) {
  return new Promise((resolve, reject) =>
    firebase
      .firestore()
      .collection("posts")
      .doc(userUID)
      .collection("userPosts")
      .orderBy("creation", "asc")
      .get()
      .then((snapshot) => {
        let posts = snapshot.docs.map((doc) => {
          const data = doc.data();
          const id = doc.id;

          return { id, ...data };
        });
        if (posts.length === 0) {
          return null;
        } else {
          resolve(posts);
        }
      })
      .catch((e) => Alert.alert(e))
  );
}
