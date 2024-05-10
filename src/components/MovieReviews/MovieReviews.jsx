import { reviewsOFMovie } from "../../movies-api";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import css from "./MovieReviews.module.css";
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

export default function MovieReviews() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [reviews, setReviews] = useState(null);

  const { movieId } = useParams();

  useEffect(() => {
    async function fetchReviews() {
      try {
        setLoading(true);
        const data = await reviewsOFMovie(movieId);
        setReviews(data);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchReviews();
  }, [movieId]);

  return (
    <div>
      {reviews && reviews.length > 0 ? (
        <ul>
          {reviews.map((review) => (
            <li key={review.id}>
              <h2 className={css.author}>Author: {review.author}</h2>
              <p>{review.content}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>We dont have any reviews for this movie</p>
      )}
      {loading && <Loader />}
      {error && <ErrorMessage />}
    </div>
  );
}
