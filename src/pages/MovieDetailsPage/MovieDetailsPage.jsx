import { useState, useEffect, useRef } from "react";
import {
  Link,
  NavLink,
  useLocation,
  useParams,
  Outlet,
} from "react-router-dom";
import { Suspense } from "react";
import { detailsOfMovies } from "../../movies-api";
import css from "./MovieDetailsPage.module.css";
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const location = useLocation();
  const backLinkRef = useRef(location.state ?? "/");

  useEffect(() => {
    async function fetchDetails() {
      try {
        setLoading(true);
        const data = await detailsOfMovies(movieId);
        setMovie(data);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchDetails();
  }, [movieId]);

  return (
    <div>
      <Link to={backLinkRef.current} className={css.backBtn}>
        Go back
      </Link>
      {movie && (
        <div className={css.container}>
          <img
            src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
            alt="movie poster"
          />
          <div className={css.description}>
            <h2>{movie.original_title}</h2>
            <p>User score: {movie.vote_average * 10}%</p>
            <h2>Overview</h2>
            <p>{movie.overview}</p>
            <h2>Genres</h2>
            <ul>
              {movie.genres.map(({ id, name }) => (
                <li key={id}>{name}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
      <div className={css.linkBox}>
        <h2 className={css.titleDetails}>Additional information</h2>
        <NavLink className={css.link} to="cast">
          Cast
        </NavLink>
        <NavLink className={css.link} to="reviews">
          Reviews
        </NavLink>
      </div>
      <Suspense fallback={<b>Loading...</b>}>
        <Outlet />
      </Suspense>

      {loading && <Loader />}
      {error && <ErrorMessage />}
    </div>
  );
};

export default MovieDetailsPage;
