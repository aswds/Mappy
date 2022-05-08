const renderPost = (item) => {
    return (
      <TouchableOpacity style={styles.sliderBoxContainer} key={item.id}>
        <SliderBox
          sliderBoxHeight={Dimensions.get("window").width / 3}
          imageLoadingColor={colors.text}
          paginationBoxStyle={styles.pagginationBoxStyle}
          dotColor={colors.text}
          inactiveDotColor="#333333"
          dotStyle={styles.dotStyle}
          images={item.downloadURLs}
          ImageComponentStyle={{
            width: Dimensions.get("window").width / 3,
          }}
          parentWidth={Dimensions.get("window").width / 3}
        />
      </TouchableOpacity>
    );
  };