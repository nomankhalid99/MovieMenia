import { useNavigation } from "@react-navigation/native";
import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  useWindowDimensions,
} from "react-native";
import { falllBackPosterImage, img185 } from "../api/moviedb";

const MovieList = ({ title, data, hiddenSeeAll }) => {
  const navigation = useNavigation();

  const { width: windowWidth, height: windowHeight } = useWindowDimensions();

  return (
    <View className="mb-8 space-y-4">
      <View className="flex-row justify-between mx-4 items-center">
        <Text className="text-white text-xl">{title}</Text>
        {!hiddenSeeAll && (
          <TouchableOpacity>
            <Text style={{ color: "#E6A706" }} className="text-lg">
              See All
            </Text>
          </TouchableOpacity>
        )}
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}
      >
        {data.map((item, index) => (
          <TouchableWithoutFeedback
            key={index}
            onPress={() => navigation.push("Movie", item)}
          >
            <View className="space-y-1 mr-4">
              <Image
                source={{
                  uri: img185(item.poster_path) || falllBackPosterImage,
                }}
                className="rounded-3xl"
                style={{
                  width: windowWidth * 0.33,
                  height: windowHeight * 0.22,
                }}
              />
              <Text className="text-neutral-300 ml-3">
                {item.title.length > 14
                  ? item.title.slice(0, 14) + "..."
                  : item.title}
              </Text>
            </View>
          </TouchableWithoutFeedback>
        ))}
      </ScrollView>
    </View>
  );
};

export default MovieList;
