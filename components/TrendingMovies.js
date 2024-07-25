import React from "react";
import {
  Image,
  Text,
  TouchableWithoutFeedback,
  View,
  useWindowDimensions,
} from "react-native";
import Carousel from "react-native-snap-carousel";
import { useNavigation } from "@react-navigation/native";
import { img500 } from "../api/moviedb";

const TrendingMovies = ({ data }) => {
  const navigation = useNavigation();
  const { width: windowWidth, height: windowHeight } = useWindowDimensions();

  const handleClick = (item) => {
    navigation.navigate("Movie", item);
  };

  return (
    <View className="mb-8">
      <Text className="text-white text-xl mb-5 mx-4">Trending</Text>
      <Carousel
        data={data}
        renderItem={({ item }) => (
          <MovieCard
            item={item}
            handleClick={() => handleClick(item)}
            windowHeight={windowHeight}
            windowWidth={windowWidth}
          />
        )}
        sliderWidth={windowWidth}
        itemWidth={windowWidth * 0.62}
        firstItem={1}
        inactiveSlideOpacity={0.6}
        slideStyle={{ display: "flex", alignItems: "center" }}
      />
    </View>
  );
};

const MovieCard = ({ item, handleClick, windowHeight, windowWidth }) => {
  return (
    <TouchableWithoutFeedback onPress={() => handleClick(item)}>
      <Image
        source={{
          uri: img500(item.poster_path),
        }}
        style={{
          width: windowWidth * 0.6,
          height: windowHeight > 500 ? windowHeight * 0.4 : windowHeight * 2,
        }}
        className="rounded-3xl"
      />
    </TouchableWithoutFeedback>
  );
};

export default TrendingMovies;
