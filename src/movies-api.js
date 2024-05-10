import axios from "axios";

axios.defaults.baseURL = "https://api.themoviedb.org/3";
const BASE_KEY = "068013fe7fcaed6b2249df15c9fb443d";
const API_TOKEN =
  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNjgwMTNmZTdmY2FlZDZiMjI0OWRmMTVjOWZiNDQzZCIsInN1YiI6IjY2MzE0NmY4NWE1ZWQwMDEyMzQzZjQxMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.XZknxwXEOGxMs-kGZ-z-0-4FMIBJrNp67CeKUwbc4og.eyJhdWQiOiIwNjgwMTNmZTdmY2FlZDZiMjI0OWRmMTVjOWZiNDQzZCIsInN1YiI6IjY2MzE0NmY4NWE1ZWQwMDEyMzQzZjQxMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.XZknxwXEOGxMs-kGZ-z-0-4FMIBJrNp67CeKUwbc4og";

const options = {
  headers: {
    // Замість api_read_access_token вставте свій токен
    Authorization: API_TOKEN,
  },
  include_adult: false,
};

export const getTrendingMovies = async () => {
  const response = await axios.get("/trending/movie/day", {
    params: {
      options,
      api_key: BASE_KEY,
    },
  });
  return response.data.results;
};

export const searchMovies = async (query) => {
  const response = await axios.get("/search/movie", {
    params: {
      options,
      query: query,
      api_key: BASE_KEY,
    },
    include_adult: false,
  });
  return response.data.results;
};

export const detailsOfMovies = async (movieId) => {
  const response = await axios.get(`/movie/${movieId}`, {
    params: {
      options,
      api_key: BASE_KEY,
    },
  });
  return response.data;
};

export const creditsOfMovies = async (movieId) => {
  const response = await axios.get(`/movie/${movieId}/credits`, {
    params: {
      options,
      api_key: BASE_KEY,
    },
  });
  return response.data;
};

export const reviewsOFMovie = async (movieId) => {
  const response = await axios.get(`/movie/${movieId}/reviews`, {
    params: {
      options,
      api_key: BASE_KEY,
    },
  });
  return response.data.results;
};
