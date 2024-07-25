import React, { useCallback, useState } from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  useWindowDimensions,
} from "react-native";
import { XMarkIcon } from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";
import Loading from "../components/Loading";
import {debounce} from 'lodash'
import { falllBackPosterImage, img185, searchMovies } from "../api/moviedb";

const SearchScreen = () => {
  const { width: windowWidth, height: windowHeight } = useWindowDimensions();
  const navigation = useNavigation();
  const [result, setResult] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = (value) => {
    if(value && value.length>2){
      setIsLoading(true)
      searchMovies({
        query: value,
        include_adult: 'false',
        language:"en-US",
        page:"1"
      }).then(data => {
        setIsLoading(false)
        if(data && data.results) setResult(data.results)
      })
    }  else{
      setIsLoading(false)
      setResult([])
    }
  }

  const handleTextDebounce = useCallback(debounce(handleSearch, 400), [])

  return (
    <SafeAreaView
      style={{ paddingTop: StatusBar.currentHeight }}
      className="bg-neutral-900 flex-1"
    >
      <View className="mx-4 mb-3 flex-row justify-between items-center border border-neutral-500 rounded-full">
        <TextInput
        onChangeText={handleTextDebounce}
          className="flex-1 py-1 pl-6 text-base font-semibold text-white tracking-wider"
          placeholder="Search Movie"
          placeholderTextColor={"lightgray"}
        />
        <TouchableOpacity
          onPress={() => navigation.navigate("Home")}
          className="rounded-full p-3 m-1 bg-neutral-500"
        >
          <XMarkIcon size="28" color="white" />
        </TouchableOpacity>
      </View>
      {/* results */}
      {isLoading ? (
        <Loading />
      ) : result.length > 0 ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 15 }}
          className="space-y-3"
        >
          <Text className="text-white font-semibold ml-1">
            Results ({result.length})
          </Text>
          <View className="flex-row justify-between flex-wrap">
            {result.map((item, index) => (
              <TouchableWithoutFeedback
                key={index}
                onPress={() => navigation.push("Movie", item)}
              >
                <View className="space-y-2 mb-4">
                  <Image
                    className="rounded-3xl"
                    source={{
                      uri: img185(item?.poster_path) || falllBackPosterImage,
                    }}
                    style={{
                      width: windowWidth * 0.44,
                      height: windowHeight * 0.3,
                    }}
                  />
                  <Text className="text-neutral-300 ml-1">
                    {item?.title.length > 20
                      ? item?.title.slice(0, 20) + "..."
                      : item?.title}
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            ))}
          </View>
        </ScrollView>
      ) : (
        <View className="flex-row justify-center items-center">
          <Image source={require("../assets/MovieTime.png")} className="w-96" />
        </View>
      )}
    </SafeAreaView>
  );
};

export default SearchScreen;
