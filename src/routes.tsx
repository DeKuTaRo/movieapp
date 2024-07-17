import { createBrowserRouter } from "react-router-dom";
import { Home, Error, MovieDetails, Explore } from "./pages";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <Error />,
  },
  {
    path: "/explore",
    element: <Explore />,
    errorElement: <Error />,
  },
  {
    path: "/details/:id",
    element: <MovieDetails />,
    errorElement: <Error />,
  },
]);
