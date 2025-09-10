import React from "react";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <main
      className="d-flex flex-column align-items-center justify-content-center vh-100 text-center"
      role="alert"
    >
      <h1 className="display-1 fw-bold text-danger">404</h1>
      <h3 className="mb-3">Page Not Found</h3>
      <p className="mb-4 text-muted">
        The page you're looking for doesn't exist.
      </p>
      <Link
        to="/"
        className="btn btn-primary rounded-1"
        aria-label="Go back to homepage"
      >
        Go Home
      </Link>
    </main>
  );
};

export default PageNotFound;
