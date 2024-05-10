import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { creditsOfMovies } from "../../movies-api";
import css from "./MovieCast.module.css";
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

export default function MovieCast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!movieId) return;
    async function fetchCreditsOfMovies() {
      try {
        setLoading(true);
        const data = await creditsOfMovies(movieId);
        setCast(data.cast);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchCreditsOfMovies();
  }, [movieId]);

  return (
    <div>
      {cast && cast.length > 0 ? (
        <ul className={css.cast}>
          {cast.map((el) => (
            <li key={el.id}>
              <img
                src={
                  el.profile_path
                    ? `https://image.tmdb.org/t/p/w300${el.profile_path}`
                    : "https://i.pinimg.com/736x/15/c1/ec/15c1ec0f3beb08c3587d65462fd0fc7a.jpg"
                }
                alt="cast"
                className={css.castImg}
              />
              <p>{el.name}</p>
              <p>Character: {el.character}</p>
            </li>
          ))}
        </ul>
      ) : (
        "Sorry, we don't have any cast for this movie."
      )}
      {loading && <Loader />}
      {error && <ErrorMessage />}
    </div>
  );
}
