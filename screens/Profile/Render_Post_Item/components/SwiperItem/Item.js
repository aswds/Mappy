import { View, StyleSheet, Dimensions, Text } from "react-native";
import firebase from "firebase";
import { useState, useRef, useEffect } from "react";
import { Image as CachedImage } from "react-native-expo-image-cache";
import { Video, AVPlaybackStatus } from "expo-av";
const { width } = Dimensions.get("window");

const Item = ({ item, id }) => {
  const [contentType, setContentType] = useState();

  const userUID = firebase.auth().currentUser.uid;
  const storage = firebase.storage();
  const filePath = storage.refFromURL(item).fullPath;
  const forestRef = storage.ref().child(filePath);
  const [status, setStatus] = useState({});
  console.log(id);

  useEffect(() => {
    forestRef
      .getMetadata()
      .then((metadata) => {
        setContentType(metadata.contentType);
      })
      .catch((e) => {});
  }, []);
  const video = useRef(null);

  return (
    <View style={styles.imageContainer} key={item.id}>
      {/* {contentType == "video/quicktime" || contentType == "video/mp4" ? ( */}
      <View style={styles.container}>
        <Video
          ref={video}
          posterStyle
          style={styles.video}
          source={{
            uri: "https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
          }}
          resizeMode="contain"
          isLooping
          onPlaybackStatusUpdate={(status) => setStatus(() => status)}
        />
      </View>
      {/* // ) : ( // <CachedImage uri={item} style={styles.image} />
      // )} */}
    </View>
  );
};
const styles = StyleSheet.create({
  imageContainer: {
    width,
    height: "100%",
    backgroundColor: "lightgrey",
  },
  image: {
    height: "100%",
    width: "100%",
    resizeMode: "contain",
  },
  video: {
    height: "100%",
    width: "100%",
    resizeMode: "contain",
  },
});
export default Item;
