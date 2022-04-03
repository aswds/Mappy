import React from "react";
import { View, Dimensions } from "react-native";
import { SliderBox } from "react-native-image-slider-box";
export const RenderPosts = ({ item }) => {
  return (
    <View
      style={{
        width: Dimensions.get("window").width / 3,
        justifyContent: "center",
        aspectRatio: 1 / 1,
        justifyContent: "center",
        alignItems: "center",
      }}
      key={item.id}
    >
      <SliderBox
        sliderBoxHeight={Dimensions.get("window").width / 3}
        imageLoadingColor={"#fff"}
        paginationBoxStyle={{
          position: "absolute",
          padding: 0,
          alignItems: "center",
          alignSelf: "center",
          justifyContent: "center",
        }}
        dotColor="#fff"
        inactiveDotColor="#333333"
        dotStyle={{
          width: 7,
          height: 7,
          borderRadius: 5,
          marginHorizontal: 5,
          backgroundColor: "rgba(128, 128, 128, 0.92)",
          shadowOpacity: 0.4,
          shadowOffset: {
            height: 2,
            width: 0,
          },
        }}
        images={item.downloadURLs}
        ImageComponentStyle={{
          width: Dimensions.get("window").width / 3,
        }}
        parentWidth={Dimensions.get("window").width / 3}
      />
    </View>
  );
};
