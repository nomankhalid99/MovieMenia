import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { falllBackPersonImage, img185 } from "../api/moviedb";

const Cast = ({ cast, navigation }) => {
  return (
    <View className="my-4">
      <Text className="text-white text-lg mx-4 mb-5">Top Cast</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}
      >
        {cast &&
          cast.map((person, index) => (
            <TouchableOpacity
              onPress={() => navigation.navigate("Person", person)}
              key={index}
              className="mr-4 text-center"
            >
              <View className="h-20 w-20 rounded-full items-center overflow-hidden border border-neutral-500">
                <Image
                  className="rounded-2xl h-24 w-20"
                  source={{
                    uri: img185(person?.profile_path || falllBackPersonImage),
                  }}
                />
              </View>
              <Text className="text-white text-xs mt-1">
                {person?.character.length > 10
                  ? person?.character.slice(0, 10) + "..."
                  : person?.character}
              </Text>
              <Text className="text-neutral-400 text-xs mt-1">
                {person?.original_name.length > 10
                  ? person?.original_name.slice(0, 10) + "..."
                  : person?.original_name}
              </Text>
            </TouchableOpacity>
          ))}
      </ScrollView>
    </View>
  );
};

export default Cast;
