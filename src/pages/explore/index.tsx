import React, { useEffect, useState, useCallback, useRef } from "react";
import { Paper, InputBase, InputAdornment, Typography, Button, Grid, Slider } from "@mui/material";
import SearchIcon from "../../assets/icons/icon-search.svg";
import Box, { BoxProps } from "@mui/material/Box";

import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Collapse from "@mui/material/Collapse";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import { Link, useLocation, useParams, useNavigate, useSearchParams } from "react-router-dom";
import { homeIcon, movieIcon, tvSeriesIcon, bookmarkIcon, arrowDownIcon, exploreIcon } from "../../assets";

import axios from "axios";
import { GenresData, MovieDataType, TVDataType } from "../../assets/data";

const MovieItem: React.FC<{ movie: any }> = ({ movie }) => (
  <Item>
    <Paper elevation={0} sx={{ backgroundColor: "transparent" }}>
      <Card variant="outlined" sx={{ bgcolor: "transparent", color: "#E0E0E0", my: 3, border: "none" }}>
        <CardContent sx={{ p: 0, position: "relative" }}>
          <img
            src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`}
            alt={movie.title}
            style={{ width: "100%", height: "100%", borderRadius: "8px" }}
          />
          <Typography aria-label="movie rating" padding={0} textAlign={"center"}>
            {movie.title}
          </Typography>
          <Typography
            variant="button"
            sx={{
              position: "absolute",
              top: 0,
              right: 0,
              padding: "0.5rem",
              backgroundColor: "blue",
              borderRadius: "1rem",
              fontWeight: "bold",
              fontSize: "15px",
            }}>
            {movie.vote_average}
          </Typography>
        </CardContent>
      </Card>
    </Paper>
  </Item>
);

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}>
      {value === index && <Box sx={{ p: 1 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function Item(props: BoxProps) {
  const { sx, ...other } = props;
  return (
    <Box
      sx={{
        p: 1,
        m: 1,
        color: (theme) => (theme.palette.mode === "dark" ? "#101010" : "grey.100"),
        borderRadius: 2,
        fontSize: "0.875rem",
        fontWeight: "700",
        ...sx,
      }}
      {...other}
    />
  );
}

const navLinks = [
  {
    name: "Home",
    icon: homeIcon,
    link: "/",
  },
  {
    name: "Explore",
    icon: exploreIcon,
    link: "/explore",
  },
  {
    name: "Movies",
    icon: movieIcon,
    link: "/movies",
  },
  {
    name: "TV Series",
    icon: tvSeriesIcon,
    link: "/tv-series",
  },
  {
    name: "Bookmarks",
    icon: bookmarkIcon,
    link: "/bookmarks",
  },
];
const minDistance = 20;
const Explore = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [sortBy, setSortBy] = useState<string>("");
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);
  const [page, setPage] = useState(1);
  const [runTime, setRunTime] = useState<number[]>([0, 200]);

  const [listsMovieSearch, setListsMovieSearch] = React.useState<MovieDataType[]>([]);
  const [listsTVShowSearch, setListsTVShowSearch] = React.useState<TVDataType[]>([]);

  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef<IntersectionObserver | null>(null);
  const lastMovieElementRef = useCallback(
    (node: HTMLElement | null) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const genreParams = searchParams.getAll("genre");
    setSelectedGenres(genreParams.map(Number));
    setSortBy(searchParams.get("sort_by") || "popularity.desc");
  }, [location.search]);

  useEffect(() => {
    setListsMovieSearch([]);
    setPage(1);
    setHasMore(true);
  }, [location]);

  useEffect(() => {
    setLoading(true);
    const fetchDetails = async () => {
      try {
        const headers = {
          accept: "application/json",
          Authorization: `Bearer ${process.env.REACT_APP_API_TOKEN}`,
        };

        const [response1, response2] = await Promise.all([
          axios.get("https://api.themoviedb.org/3/discover/movie", {
            params: {
              include_adult: false,
              include_video: false,
              language: "en-US",
              page: page,
              sort_by: sortBy,
              with_genres: selectedGenres.toString(),
              // "with_runtime.gte": runTime[0],
              // "with_runtime.lte": runTime[1],
            },
            headers,
          }),
          axios.get("https://api.themoviedb.org/3/discover/tv", {
            params: {
              include_adult: false,
              include_video: false,
              language: "en-US",
              page: page,
              sort_by: sortBy,
              with_genres: selectedGenres.toString(),
            },
            headers,
          }),
        ]);
        setListsMovieSearch((prevMovies) =>
          page === 1 ? response1.data.results : [...prevMovies, ...response1.data.results]
        );
        setListsTVShowSearch((prevMovies) =>
          page === 1 ? response2.data.results : [...prevMovies, ...response2.data.results]
        );
        setHasMore(response2.data.results.length > 0);
        setLoading(false);
      } catch (err) {
        console.log("error: ", err);
        setLoading(false);
      }
    };
    fetchDetails();
  }, [sortBy, selectedGenres, page, runTime]);

  const { pathname } = useLocation();

  const [typeFilms, setTypeFilms] = React.useState(0);
  const handleChange = async (event: React.SyntheticEvent, newValue: number) => {
    setTypeFilms(newValue);
  };
  const [filterCollapse, setFilterCollapse] = React.useState(true);
  const [sortCollapse, setSortCollapse] = React.useState(true);

  const handleFilterCollapse = (type: string) => {
    if (type === "sortCollapse") {
      setSortCollapse((prev) => !prev);
    } else {
      setFilterCollapse((prev) => !prev);
    }
  };

  const handleChangeSortSearch = (event: SelectChangeEvent) => {
    const newSortBy = event.target.value;
    setSortBy(newSortBy);
    updateURL(selectedGenres, newSortBy, runTime);
  };
  const handleChangeGenresSearch = (genreId: number) => {
    setSelectedGenres((prev) => {
      const updatedGenres = prev.includes(genreId) ? prev.filter((id) => id !== genreId) : [...prev, genreId];
      updateURL(updatedGenres, sortBy, runTime);
      return updatedGenres;
    });
  };

  const handleChangeRunTimeSearch = (event: Event, newValue: number | number[], activeThumb: number) => {
    if (!Array.isArray(newValue)) {
      return;
    }
    if (activeThumb === 0) {
      setRunTime([Math.min(newValue[0], runTime[1] - minDistance), runTime[1]]);
    } else {
      setRunTime([runTime[0], Math.max(newValue[1], runTime[0] + minDistance)]);
    }
    setRunTime(newValue as number[]);
    updateURL(selectedGenres, sortBy, newValue);
  };

  const updateURL = (updatedGenres: number[], updatedSortBy: string, updatedRunTime: number[] | number) => {
    const searchParams = new URLSearchParams();
    console.log("updatedRunTime = ", updatedRunTime);
    // console.log("updatedRunTime.length > 1 = ", updatedRunTime.length > 1);

    updatedGenres.forEach((id) => searchParams.append("genre", id.toString()));
    searchParams.set("sort_by", updatedSortBy);
    // searchParams.set("minRuntime", updatedRunTime.length > 1 && updatedRunTime[0].toString());
    // searchParams.set("maxRuntime", updatedRunTime[1].toString());
    navigate(`/explore?${searchParams.toString()}`);
  };

  const genresMovieLocal: string | null = localStorage.getItem("genresMovieData");
  const genresMovieData: GenresData[] = genresMovieLocal !== null && JSON.parse(genresMovieLocal);

  const genresTVLocal: string | null = localStorage.getItem("genresTVData");
  const genresTVData: GenresData[] = genresTVLocal !== null && JSON.parse(genresTVLocal);
  // console.log("listsTVShowSearch = ", listsTVShowSearch);
  return (
    <>
      <Box
        sx={{
          backgroundColor: "#10141F",
          display: "flex",
          flexDirection: {
            xs: "column",
            lg: "row",
          },
          color: "white",
          gap: 2,
          height: "100vh",
          overflowY: "hidden",
        }}>
        <Box
          sx={{
            backgroundColor: "#161d2f",
            padding: 2,
            borderRadius: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: {
              sm: "100%",
              lg: 40,
            },
          }}>
          <Box
            sx={{
              py: {
                xs: "0px",
                lg: "16px",
              },
              display: "flex",
              flexDirection: {
                xs: "row",
                lg: "column",
              },
              gap: 4,
            }}>
            {navLinks.map((item) => (
              <Link key={item.name} to={item.link} style={{ textDecoration: "none" }}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    color: "white",
                    textDecoration: "none",
                  }}>
                  <img
                    src={item.icon}
                    alt={item.name}
                    style={{
                      width: "18px",
                      filter: `${
                        pathname === item.link
                          ? "invert(58%) sepia(14%) saturate(3166%) hue-rotate(215deg) brightness(91%) contrast(87%)"
                          : "invert(84%)"
                      }`,
                    }}
                  />
                </Box>
              </Link>
            ))}
          </Box>
        </Box>

        <Box sx={{ width: "100%", overflowY: "scroll", padding: "2rem" }}>
          <Box sx={{ display: "flex" }}>
            <Typography variant="h3" sx={{ width: "75%" }}>
              Find films that best fit to you
            </Typography>
            <InputBase
              placeholder="Search here ..."
              sx={{
                mx: 1,
                flex: 1,
                color: "white",
                border: "1px solid #ccc",
                borderRadius: "1rem",
                px: 1,
              }}
              startAdornment={
                <InputAdornment position="start">
                  <img src={SearchIcon} alt="Search icon" width={20} height={20} />
                </InputAdornment>
              }
            />
          </Box>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs value={typeFilms} onChange={handleChange} aria-label="basic tabs example">
              <Tab sx={{ color: "white" }} label="Movie" {...a11yProps(0)} />
              <Tab sx={{ color: "white" }} label="TV Series" {...a11yProps(1)} />
            </Tabs>
          </Box>
          <CustomTabPanel value={typeFilms} index={0}>
            <Grid container spacing={2} columns={15}>
              {listsMovieSearch.map((movie, index) => (
                <Grid
                  item
                  xs={3}
                  key={movie.id}
                  ref={index === listsMovieSearch.length - 1 ? lastMovieElementRef : null}>
                  <MovieItem movie={movie} />
                </Grid>
              ))}
            </Grid>
          </CustomTabPanel>
          <CustomTabPanel value={typeFilms} index={1}>
            <div>TV series</div>
            <Grid container spacing={2} columns={15}>
              {listsTVShowSearch.map((movie, index) => (
                <Grid
                  item
                  xs={3}
                  key={movie.id}
                  ref={index === listsTVShowSearch.length - 1 ? lastMovieElementRef : null}>
                  <MovieItem movie={movie} />
                </Grid>
              ))}
            </Grid>
          </CustomTabPanel>
        </Box>

        {/* Sidebar Right */}
        <Box
          sx={{
            backgroundColor: "#161d2f",
            padding: 2,
            borderRadius: 2,
            display: "flex",
            flexDirection: {
              xs: "row",
              lg: "column",
            },
            gap: 2,
            width: {
              sm: "100%",
              lg: 550,
            },
            overflowY: "scroll",
          }}>
          {/* Sort */}
          <Box sx={{ width: "100%" }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h2>Sort</h2>
              <Button
                startIcon={<img src={arrowDownIcon} alt="filter" />}
                sx={{ color: "white" }}
                onClick={() => handleFilterCollapse("sortCollapse")}
              />
            </Box>
            {/* Sort collapse */}
            <Collapse in={sortCollapse}>
              <h2>Sort results by</h2>
              <FormControl fullWidth sx={{ backgroundColor: "#49494b" }}>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  onChange={handleChangeSortSearch}
                  sx={{ color: "white" }}
                  defaultValue="popularity.desc">
                  <MenuItem value="popularity.desc">Most popular</MenuItem>
                  <MenuItem value="vote_average.desc">Most rating</MenuItem>
                  <MenuItem value="release_date.desc">Most recent</MenuItem>
                </Select>
              </FormControl>
            </Collapse>
          </Box>

          {/* Filter */}
          <Box>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h2>Filter</h2>
              <Button
                startIcon={<img src={arrowDownIcon} alt="filter" />}
                sx={{ color: "white" }}
                onClick={() => handleFilterCollapse("filterCollapse")}
              />
            </Box>

            {/* Filter collapse */}
            <Collapse in={filterCollapse}>
              <h4>Genres</h4>
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 2,
                  overflowY: "scroll",
                  maxHeight: "200px",
                  padding: "1rem",
                }}>
                {typeFilms === 0
                  ? genresMovieData.map((genre) => {
                      return (
                        <Typography
                          key={genre.id}
                          sx={{
                            backgroundColor: selectedGenres.includes(12) ? "blue" : "gray",
                            padding: "0.5rem",
                            borderRadius: "1rem",
                          }}
                          onClick={() => handleChangeGenresSearch(12)}>
                          {genre.name}
                        </Typography>
                      );
                    })
                  : genresTVData.map((genre) => {
                      return (
                        <Typography
                          key={genre.id}
                          sx={{
                            backgroundColor: selectedGenres.includes(12) ? "blue" : "gray",
                            padding: "0.5rem",
                            borderRadius: "1rem",
                          }}
                          onClick={() => handleChangeGenresSearch(12)}>
                          {genre.name}
                        </Typography>
                      );
                    })}
              </Box>
              {/* Run time */}
              <Box>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <h5>From {runTime[0]} min</h5>
                  <h5>To {runTime[1]} min</h5>
                </Box>
                <Slider
                  value={runTime}
                  onChange={handleChangeRunTimeSearch}
                  valueLabelDisplay="off"
                  aria-labelledby="range-slider"
                  marks={[]}
                  step={10}
                  min={0}
                  max={200}
                  sx={{
                    "& .MuiSlider-rail": {
                      backgroundColor: "black", // Color for the unselected range
                    },
                    "& .MuiSlider-track": {
                      backgroundColor: "blue", // Color for the selected range
                    },
                    "& .MuiSlider-thumb": {
                      backgroundColor: "blue", // Color for the thumb
                    },
                  }}
                />
              </Box>
              {/* Realease date */}
              <Box>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <h5>From </h5>
                  <input type="date" />
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <h5>To </h5>
                  <input type="date" />
                </Box>
              </Box>
            </Collapse>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Explore;
