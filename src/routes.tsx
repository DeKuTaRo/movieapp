import { createBrowserRouter } from "react-router-dom";
import { Home, Error, MovieDetails, Explore, Search } from "./pages";

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
    path: "/search",
    element: <Search />,
    errorElement: <Error />,
  },
  {
    path: "/movie/:id",
    element: <MovieDetails />,
    errorElement: <Error />,
  },
  {
    path: "/tv/:id",
    element: <MovieDetails />,
    errorElement: <Error />,
  },
]);
