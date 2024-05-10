import { searchMovies } from "../../movies-api";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import SearchForm from "../../components/SearchForm/SearchForm";
import MovieList from "../../components/MovieList/MovieList";
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

export default function MoviesPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState("");
  const searchMoviesParams = searchParams.get("query") ?? "";

  useEffect(() => {
    async function fetchMovie() {
      try {
        setLoading(true);
        const data = await searchMovies(searchMoviesParams);
        setMovies(data);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchMovie();
  }, [searchMoviesParams, query]);

  const handleSearch = (newMovie) => {
    searchParams.set("query", newMovie);
    setSearchParams(searchParams);
    setQuery(newMovie);
  };

  return (
    <div>
      <SearchForm value={searchMoviesParams} onSubmit={handleSearch} />
      {movies.length > 0 && <MovieList movies={movies} />}
      {loading && <Loader />}
      {error && <ErrorMessage />}
    </div>
  );
}
