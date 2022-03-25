import React, { useRef, useState } from "react";
import { View, StyleSheet, Button } from "react-native";
import { Video, AVPlaybackStatus } from "expo-av";

export default function VideoScreen(props) {
  const video = useRef(null);
  const [status, setStatus] = useState({});
  const [photos, setPhotos] = useState(props.navigation.getParam("photos"));

  return (
    <View style={styles.container}>
      <Video
        ref={video}
        style={styles.video}
        source={{
          uri: "https://firebasestorage.googleapis.com/v0/b/firstapp-4d323.appspot.com/o/post%2Ft39e988Sm1hIzbBLFIJ2M8lFd383%2F0.r8nz8syxj8?alt=media&token=e7829e42-cdce-43aa-9fbc-495de32f2f5f",
        }}
        useNativeControls
        isLooping
        onPlaybackStatusUpdate={(status) => setStatus(() => status)}
      />
      <View style={styles.buttons}>
        <Button
          title={status.isPlaying ? "Pause" : "Play"}
          onPress={() =>
            status.isPlaying
              ? video.current.pauseAsync()
              : video.current.playAsync()
          }
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  video: {
    height: "50%",
    width: "50%",
  },
});
