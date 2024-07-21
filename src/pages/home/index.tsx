import React, { useState, useEffect } from "react";
import { Box, Tabs, Tab, Grid } from "@mui/material";
import axios from "axios";

// Import Swiper styles
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/mousewheel";
import ListMovies from "./listMovies";
import { MovieDataType, GenresData } from "../../assets/data";
import SidebarRight from "../../components/sidebar/sidebarRight";
import Sidebar from "../../components/sidebar";
import { themeDarkMode } from "../../themes/ThemeProvider";
import CustomSkeleton from "../../components/Skeleton";
import { headers } from "../../utils";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
  isLoading: boolean;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, isLoading, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}>
      {value === index && (
        <Box sx={{ p: 3, mb: 3 }}>
          {isLoading ? (
            <>
              <CustomSkeleton width={152} height={60} marginBottom="42px" marginTop="21px" />
              <CustomSkeleton height={508} marginTop="-112px" />
              <CustomSkeleton width={152} height={60} marginBottom="42px" marginTop="21px" />

              <Grid container spacing={2} columns={15}>
                {Array.from({ length: 5 }).map((_, index) => (
                  <Grid item xs={3} key={index}>
                    <CustomSkeleton variant="rounded" width={160} height={240} />
                  </Grid>
                ))}
              </Grid>
            </>
          ) : (
            children
          )}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const Home = () => {
  const [isLoadingMovie, setIsLoadingMovie] = useState<boolean>(true);
  const [isLoadingTV, setIsLoadingTV] = useState<boolean>(true);
  const [isFetchedMoviesData, setIsFetchedMoviesData] = useState<boolean>(false);
  const [isFetchedTVSeriesData, setIsFetchedTVSeriesData] = useState<boolean>(false);
  const [movieTopRated, setMovieTopRated] = useState<MovieDataType[]>([]);
  const [movieNowPlaying, setMovieNowPlaying] = useState<MovieDataType[]>([]);
  const [moviePopular, setMoviePopular] = useState<MovieDataType[]>([]);
  const [movieUpComing, setMovieUpComing] = useState<MovieDataType[]>([]);
  const [movieTrending, setMovieTrending] = useState<MovieDataType[]>([]);

  const [genresMovie, setGenresMovie] = useState<GenresData[]>([]);
  const [genresTV, setGenresTV] = useState<GenresData[]>([]);

  const [tvTopRated, setTvTopRated] = React.useState<MovieDataType[]>([]);
  const [tvAiringToday, setTvAiringToday] = React.useState<MovieDataType[]>([]);
  const [tvOnTheAir, setTvOnTheAir] = React.useState<MovieDataType[]>([]);
  const [tvPopular, setTvPopular] = React.useState<MovieDataType[]>([]);
  const [tvTrending, setTvTrending] = React.useState<MovieDataType[]>([]);

  const [typeFilms, setTypeFilms] = React.useState(0);
  const handleChangeFilmTab = async (event: React.SyntheticEvent, filmTab: number) => {
    setTypeFilms(filmTab);

    if (filmTab === 0 && !isFetchedMoviesData) {
      try {
        const [response1, response2, response3, response4, response5, response6] = await Promise.all([
          axios.get("https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1", { headers }),
          axios.get("https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=2", { headers }),
          axios.get("https://api.themoviedb.org/3/movie/popular?language=en-US&page=3", { headers }),
          axios.get("https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=4", { headers }),
          axios.get("https://api.themoviedb.org/3/genre/movie/list?language=en", { headers }),
          axios.get("https://api.themoviedb.org/3/trending/movie/day?language=en-US", { headers }),
        ]);
        setMovieTopRated(response1.data.results);
        setMovieNowPlaying(response2.data.results);
        setMoviePopular(response3.data.results);
        setMovieUpComing(response4.data.results);
        setGenresMovie(response5.data.genres);
        setMovieTrending(response6.data.results);

        setIsFetchedMoviesData(true);
      } catch (err) {
        console.log("err = ", err);
      } finally {
        setIsLoadingMovie(false);
      }
    } else if (filmTab === 1 && !isFetchedTVSeriesData) {
      try {
        const [response1, response2, response3, response4, response5, response6] = await Promise.all([
          axios.get("https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1", { headers }),
          axios.get("https://api.themoviedb.org/3/tv/airing_today?language=en-US&page=2", { headers }),
          axios.get("https://api.themoviedb.org/3/tv/on_the_air?language=en-US&page=3", { headers }),
          axios.get("https://api.themoviedb.org/3/tv/popular?language=en-US&page=4", { headers }),
          axios.get("https://api.themoviedb.org/3/genre/tv/list?language=en", { headers }),
          axios.get("https://api.themoviedb.org/3/trending/tv/day?language=en-US", { headers }),
        ]);

        setTvTopRated(response1.data.results);
        setTvAiringToday(response2.data.results);
        setTvOnTheAir(response3.data.results);
        setTvPopular(response4.data.results);
        setGenresTV(response5.data.genres);
        setTvTrending(response6.data.results);

        localStorage.setItem("genresTVData", JSON.stringify(response5.data.genres));

        setIsFetchedTVSeriesData(true);
      } catch (err) {
        console.log("err = ", err);
      } finally {
        setIsLoadingTV(false);
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [response1, response2, response3, response4, response5, response6] = await Promise.all([
          axios.get("https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1", { headers }),
          axios.get("https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=2", { headers }),
          axios.get("https://api.themoviedb.org/3/movie/popular?language=en-US&page=3", { headers }),
          axios.get("https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=4", { headers }),
          axios.get("https://api.themoviedb.org/3/genre/movie/list?language=en", { headers }),
          axios.get("https://api.themoviedb.org/3/trending/movie/day?language=en-US", { headers }),
        ]);

        setMovieTopRated(response1.data.results);
        setMovieNowPlaying(response2.data.results);
        setMoviePopular(response3.data.results);
        setMovieUpComing(response4.data.results);

        setGenresMovie(response5.data.genres);
        setMovieTrending(response6.data.results);
        localStorage.setItem("genresMovieData", JSON.stringify(response5.data.genres));

        setIsFetchedMoviesData(true);
      } catch (error) {
        console.log("error = ", error);
      } finally {
        setIsLoadingMovie(false);
      }
    };

    if (!isFetchedMoviesData) {
      fetchData();
    }
  }, [isFetchedMoviesData]);

  return (
    <Box
      sx={{
        backgroundColor: themeDarkMode.backgroundColor,
        display: "flex",
        flexDirection: {
          xs: "column",
          lg: "row",
        },
        color: themeDarkMode.title,
        overflowY: "hidden",
        height: "100vh",
      }}>
      <Sidebar />
      <Box sx={{ width: "100%", overflowX: "hidden", overflowY: "scroll", padding: 2, marginTop: 1 }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs value={typeFilms} onChange={handleChangeFilmTab} aria-label="tab type movies">
            <Tab sx={{ color: themeDarkMode.title }} label="Movie" {...a11yProps(0)} />
            <Tab sx={{ color: themeDarkMode.title }} label="TV Series" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={typeFilms} index={0} isLoading={isLoadingMovie}>
          <ListMovies
            title={"Top Rated"}
            listMovies={movieTopRated}
            type="poster"
            typeFilms={0}
            genresMovie={genresMovie}
          />
          <ListMovies title={"Now Playing"} listMovies={movieNowPlaying} typeFilms={0} genresMovie={genresMovie} />
          <ListMovies title={"Popular"} listMovies={moviePopular} typeFilms={0} genresMovie={genresMovie} />
          <ListMovies title={"Up Coming"} listMovies={movieUpComing} typeFilms={0} genresMovie={genresMovie} />
        </CustomTabPanel>
        <CustomTabPanel value={typeFilms} index={1} isLoading={isLoadingTV}>
          <ListMovies title={"Top Rated"} listMovies={tvTopRated} type="poster" typeFilms={1} genresMovie={genresTV} />
          <ListMovies title={"Airing Today"} listMovies={tvAiringToday} typeFilms={1} genresMovie={genresTV} />
          <ListMovies title={"On The Air"} listMovies={tvOnTheAir} typeFilms={1} genresMovie={genresTV} />
          <ListMovies title={"Popular"} listMovies={tvPopular} typeFilms={1} genresMovie={genresTV} />
        </CustomTabPanel>
      </Box>
      <Box
        sx={{
          backgroundColor: themeDarkMode.backgroundSidebar,
          padding: 2,
          display: "flex",
          flexDirection: {
            xs: "row",
            lg: "column",
          },
          gap: 3,
          alignItems: "center",
          width: {
            sm: "100%",
            lg: 450,
          },
        }}>
        {typeFilms === 0 ? (
          <SidebarRight
            isLoading={isLoadingMovie}
            movieTrending={movieTrending}
            typeFilms={typeFilms}
            genres={genresMovie}
          />
        ) : (
          <SidebarRight isLoading={isLoadingTV} movieTrending={tvTrending} typeFilms={typeFilms} genres={genresTV} />
        )}
      </Box>
    </Box>
  );
};

export default Home;
