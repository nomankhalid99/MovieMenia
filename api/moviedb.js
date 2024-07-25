import axios from "axios";
import { apiKey } from "../constants";

// endpoints
const apiBaseUrl = "https://api.themoviedb.org/3";
const trendingMovieEndPoint = `${apiBaseUrl}/trending/movie/day`;
const upComingMovieEndPoint = `${apiBaseUrl}/movie/upcoming`;
const topRatedMovieEndPoint = `${apiBaseUrl}/movie/top_rated`;

// dynamic endpoints
export const movieDetailsEndPoint = (id) => `${apiBaseUrl}/movie/${id}`;
export const movieCreditsEndPoint = (id) => `${apiBaseUrl}/movie/${id}/credits`;
export const similarMoviesEndPoint = (id) =>
  `${apiBaseUrl}/movie/${id}/similar`;
export const searchMoviesEndPoint = `${apiBaseUrl}/search/movie`;

export const personDetailsEndPoint = (id) => `${apiBaseUrl}/person/${id}`;
export const personMoviesEndPoint = (id) =>
  `${apiBaseUrl}/person/${id}/movie_credits`;

export const img500 = (path) =>
  path ? `https://image.tmdb.org/t/p/w500${path}` : null;
export const img342 = (path) =>
  path ? `https://image.tmdb.org/t/p/w342${path}` : null;
export const img185 = (path) =>
  path ? `https://image.tmdb.org/t/p/w185${path}` : null;

export const falllBackPersonImage =
  "https://img.freepik.com/free-photo/user-profile-icon-front-side-with-white-background_187299-40010.jpg";
export const falllBackPosterImage =
  "https://img.freepik.com/premium-vector/numerator-with-number-3-line-icon-film-cinema-popcorn-theater-director-actor-screen-art-comedy-film-vector-icon-business-advertising_855332-4896.jpg?w=740";

const apiCall = async (endpoint, params) => {
  const options = {
    method: "GET",
    url: endpoint,
    params: { ...params, api_key: apiKey },
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.log("error: ", error);
    return {};
  }
};

export const fetchingTrendingMovies = () => {
  return apiCall(trendingMovieEndPoint);
};

export const fetchingUpComingMovies = () => {
  return apiCall(upComingMovieEndPoint);
};

export const fetchingTopRatedMovies = () => {
  return apiCall(topRatedMovieEndPoint);
};

export const fetchingMovieDetails = (id) => {
  return apiCall(movieDetailsEndPoint(id));
};

export const fetchingMovieCredits = (id) => {
  return apiCall(movieCreditsEndPoint(id));
};

export const fetchingSimilarMovies = (id) => {
  return apiCall(similarMoviesEndPoint(id));
};

export const fetchingPersonDetails = (id) => {
  return apiCall(personDetailsEndPoint(id));
};
export const fetchingPersonMovies = (id) => {
  return apiCall(personMoviesEndPoint(id));
};

export const searchMovies = (params) => {
  return apiCall(searchMoviesEndPoint, params);
};
