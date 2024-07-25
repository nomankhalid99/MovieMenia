import {
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  Bars3CenterLeftIcon,
  MagnifyingGlassIcon,
} from "react-native-heroicons/outline";
import { useEffect, useState } from "react";
import TrendingMovies from "../components/TrendingMovies";
import MovieList from "../components/MovieList";
import { useNavigation } from "@react-navigation/native";
import Loading from "../components/Loading";
import {
  fetchingTopRatedMovies,
  fetchingTrendingMovies,
  fetchingUpComingMovies,
} from "../api/moviedb";

const HomeScreen = () => {
  const [trending, setTrending] = useState([]);
  const [upComing, setUpComing] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const navigation = useNavigation();

  useEffect(() => {
    getTrendingMovies();
    getUpComingMovies();
    getTopRatedMovies();
  }, []);

  const getTrendingMovies = async () => {
    const data = await fetchingTrendingMovies();
    if (data && data.results) setTrending(data.results);
    setIsLoading(false);
  };
  const getUpComingMovies = async () => {
    const data = await fetchingUpComingMovies();
    if (data && data.results) setUpComing(data.results);
  };
  const getTopRatedMovies = async () => {
    const data = await fetchingTopRatedMovies();
    if (data && data.results) setTopRated(data.results);
  };

  return (
    <View
      style={{ paddingTop: StatusBar.currentHeight }}
      className="flex-1 bg-neutral-900"
    >
      <StatusBar
        barStyle="auto"
        backgroundColor="rgba(0, 0, 0, 0)"
        translucent={true}
      />
      <SafeAreaView className={Platform.OS === "ios" ? "-mb-2" : "mb-3"}>
        <View className="flex-row justify-between items-center mx-4">
          <Bars3CenterLeftIcon size="30" strokeWidth={2} color="white" />
          <Text className="text-white text-3xl font-bold">
            <Text style={{ color: "#E6A706" }}>M</Text>ovies
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Search")}>
            <MagnifyingGlassIcon size="30" strokeWidth={2} color="white" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      {isLoading ? (
        <Loading />
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 10 }}
        >
          {trending.length > 0 && <TrendingMovies data={trending} />}
          <MovieList title="UpComing" data={upComing} />
          <MovieList title="Top Rated" data={topRated} />
        </ScrollView>
      )}
    </View>
  );
};

export default HomeScreen;
