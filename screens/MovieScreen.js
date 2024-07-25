import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { HeartIcon } from "react-native-heroicons/solid";
import { LinearGradient } from "expo-linear-gradient";
import Cast from "../components/Cast";
import MovieList from "../components/MovieList";
import Loading from "../components/Loading";
import {
  falllBackPosterImage,
  fetchingMovieCredits,
  fetchingMovieDetails,
  fetchingSimilarMovies,
  img500,
} from "../api/moviedb";

const MovieScreen = () => {
  const { params: item } = useRoute();
  const navigation = useNavigation();
  const [isFavourite, setIsFavourite] = useState(false);
  const { width: windowWidth, height: windowHeight } = useWindowDimensions();
  const [cast, setCast] = useState([]);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [movie, setMovie] = useState({});

  useEffect(() => {
    setIsLoading(true);
    getMovieDetails(item.id);
    getMovieCredits(item.id);
    getSimilarMovies(item.id);
    setIsLoading(false);
  }, [item]);

  const getMovieDetails = async (id) => {
    const data = await fetchingMovieDetails(id);
    if (data) setMovie(data);
    setIsLoading(false);
  };
  const getMovieCredits = async (id) => {
    const data = await fetchingMovieCredits(id);
    if (data && data.cast) setCast(data.cast);
    setIsLoading(false);
  };
  const getSimilarMovies = async (id) => {
    const data = await fetchingSimilarMovies(id);
    if (data && data.results) setSimilarMovies(data.results);
    setIsLoading(false);
  };

  return (
    <ScrollView
      contentContainerStyle={{
        paddingBottom: 20,
      }}
      className="flex-1 bg-neutral-900"
    >
      {/* back button and movie poster*/}
      <View className="w-full">
        <SafeAreaView
          className="absolute z-20 w-full flex-row justify-between items-center px-4"
          style={{ paddingTop: StatusBar.currentHeight }}
        >
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{ backgroundColor: "#E6A706" }}
            className="rounded-xl p-1"
          >
            <ChevronLeftIcon size="28" strokeWidth={2.5} color="white" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setIsFavourite(!isFavourite)}>
            <HeartIcon
              size="34"
              strokeWidth={2.5}
              color={isFavourite ? "#E6A706" : "white"}
            />
          </TouchableOpacity>
        </SafeAreaView>
        {isLoading ? (
          <Loading />
        ) : (
          <View>
            <Image
              source={{
                uri: img500(movie.poster_path) || falllBackPosterImage,
              }}
              style={{ width: windowWidth, height: windowHeight * 0.5 }}
            />
            <LinearGradient
              colors={["transparent", "rgba(23,23,23,0.8)", "rgba(23,23,23,1)"]}
              style={{ width: windowWidth, height: windowHeight * 0.5 }}
              start={{ x: 0.2, y: 0.6 }}
              end={{ x: 0.2, y: 1 }}
              className="absolute bottom-0"
            />
          </View>
        )}
      </View>
      {/* Moive Details */}
      <View className="space-y-2">
        <Text className="text-white text-center text-3xl font-bold tracking-wider">
          {movie?.title}
        </Text>
        {movie?.id ? (
          <Text className="text-neutral-400 text-center text-base font-semibold">
            {movie?.status} . {movie?.release_date?.split("-")[0]} .{" "}
            {movie?.runtime} min
          </Text>
        ) : null}
        {/* Genre */}
        <View className="flex-row justify-center mx-4 space-x-2">
          {movie?.genres?.map((genre, index) => {
            let showDot = index + 1 !== movie.genres.length;
            return (
              <Text
                key={index}
                className="text-neutral-400 text-center text-base font-semibold"
              >
                {genre?.name} {showDot ? "." : null}
              </Text>
            );
          })}
        </View>
        <Text className="text-neutral-400 tracking-wider mx-4">
          {movie?.overview}
        </Text>
      </View>
      {/* Cast */}
      {cast.length > 0 ? <Cast cast={cast} navigation={navigation} /> : null}
      {/* Similar movies */}
      {similarMovies.length > 0 ? (
        <MovieList
          title="Similar Movies"
          hiddenSeeAll={true}
          data={similarMovies}
        />
      ) : null}
    </ScrollView>
  );
};

export default MovieScreen;
[];
