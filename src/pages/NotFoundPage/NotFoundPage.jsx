import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div>
      <p>Oops! Page not found!</p>
      <p>
        Please visit out <Link to="/"> Home page</Link>
      </p>
    </div>
  );
};

export default NotFoundPage;
