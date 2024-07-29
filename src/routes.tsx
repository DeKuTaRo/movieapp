import { createBrowserRouter } from "react-router-dom";
import { Home, Error, MovieDetails, Explore, Search, Login, Bookmarked } from "./pages";
import PersonDetail from "./pages/movies/PersonDetail";
import History from "./pages/history";
import Profile from "./pages/profile";

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
    path: "/login",
    element: <Login />,
    errorElement: <Error />,
  },
  {
    path: "/bookmarked",
    element: <Bookmarked />,
    errorElement: <Error />,
  },
  {
    path: "/history",
    element: <History />,
    errorElement: <Error />,
  },
  {
    path: "/profile",
    element: <Profile />,
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
  {
    path: "/person/:id",
    element: <PersonDetail />,
    errorElement: <Error />,
  },
]);
