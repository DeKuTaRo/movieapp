import React, { useEffect, useState, useCallback, useRef, SyntheticEvent } from "react";
import {
  Paper,
  InputBase,
  InputAdornment,
  Typography,
  Button,
  Grid,
  Slider,
  MenuItem,
  Select,
  SelectChangeEvent,
  Box,
  BoxProps,
  Card,
  CardContent,
  Collapse,
  Tabs,
  Tab,
} from "@mui/material";
import SearchIcon from "../../assets/icons/icon-search.svg";

import { Link, useLocation, useNavigate } from "react-router-dom";
import { homeIcon, movieIcon, tvSeriesIcon, bookmarkIcon, exploreIcon } from "../../assets";

import axios from "axios";
import { GenresData, MovieDataType } from "../../assets/data";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { themeDarkMode } from "../../themes/ThemeProvider";

const MovieItem: React.FC<{ movie: any }> = ({ movie }) => (
  <Item>
    <Paper elevation={0} sx={{ backgroundColor: "transparent", margin: 0 }}>
      <Card variant="outlined" sx={{ bgcolor: "transparent", color: "#E0E0E0", border: "none" }}>
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
            {parseFloat(movie.vote_average).toFixed(1)}
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

  const defaultSortBy = "popularity.desc";
  const defaultRunTime = [0, 200];
  const [sortBy, setSortBy] = useState<string>(defaultSortBy);
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);
  const [page, setPage] = useState(1);
  const [runTime, setRunTime] = useState<number[]>(defaultRunTime);
  const [runTimeUpdateURL, setRunTimeUpdateURL] = useState<number[]>(defaultRunTime);
  const [selectedFromDate, setSelectedFromDate] = useState<Dayjs | null>(null);
  const [selectedToDate, setSelectedToDate] = useState<Dayjs | null>(null);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  const [listsMovieSearch, setListsMovieSearch] = React.useState<MovieDataType[]>([]);
  const [listsTVShowSearch, setListsTVShowSearch] = React.useState<MovieDataType[]>([]);

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
              "with_runtime.gte": runTime[0],
              "with_runtime.lte": runTime[1],
              "primary_release_date.gte": selectedFromDate,
              "primary_release_date.lte": selectedToDate,
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
        setHasMore(response1.data.results.length > 0);
        setLoading(false);
      } catch (err) {
        console.log("error: ", err);
        setLoading(false);
      }
    };
    fetchDetails();
  }, [sortBy, selectedGenres, page, runTime, selectedFromDate, selectedToDate]);

  const [typeFilms, setTypeFilms] = React.useState(0);
  const handleChange = async (event: React.SyntheticEvent, newValue: number) => {
    setTypeFilms(newValue);
  };
  const [filterCollapse, setFilterCollapse] = React.useState(true);
  const [sortCollapse, setSortCollapse] = React.useState(true);

  const handleChangeSortSearch = (event: SelectChangeEvent) => {
    const updatedSortedby = event.target.value;
    setSortBy(updatedSortedby);
    setIsInitialLoad(false);
  };
  const handleChangeGenresSearch = (genreId: number) => {
    setSelectedGenres((prev) => {
      const updatedGenres = prev.includes(genreId) ? prev.filter((id) => id !== genreId) : [...prev, genreId];
      return updatedGenres;
    });
    setIsInitialLoad(false);
  };
  const handleChangeRunTimeSearch = (event: Event, newValue: number | number[], activeThumb: number) => {
    if (!Array.isArray(newValue)) {
      return;
    }
    let updatedRunTime: number[];
    if (activeThumb === 0) {
      updatedRunTime = [Math.min(newValue[0], runTime[1] - minDistance), runTime[1]];
    } else {
      updatedRunTime = [runTime[0], Math.max(newValue[1], runTime[0] + minDistance)];
    }
    setRunTime(updatedRunTime);
    setIsInitialLoad(false);
  };
  const handleChangeCommitted = (event: Event | SyntheticEvent<Element, Event>, newValue: number | number[]) => {
    if (!Array.isArray(newValue)) {
      return;
    }
    setRunTimeUpdateURL(newValue as number[]);
    setIsInitialLoad(false);
  };
  const handleFromDateChange = (newValue: dayjs.Dayjs | null) => {
    setSelectedFromDate(newValue);
    setIsInitialLoad(false);
  };
  const handleToDateChange = (newValue: Dayjs | null) => {
    setSelectedToDate(newValue);
    setIsInitialLoad(false);
  };

  useEffect(() => {
    if (isInitialLoad) return;
    const searchParams = new URLSearchParams();

    if (sortBy !== defaultSortBy) {
      searchParams.set("sort_by", sortBy);
    }

    selectedGenres.forEach((genre) => searchParams.append("genre", genre.toString()));

    if (runTimeUpdateURL[0] !== defaultRunTime[0]) {
      searchParams.set("minRuntime", runTimeUpdateURL[0].toString());
    }

    if (runTimeUpdateURL[1] !== defaultRunTime[1]) {
      searchParams.set("maxRuntime", runTimeUpdateURL[1].toString());
    }

    if (selectedFromDate) {
      searchParams.set("from", selectedFromDate.format("YYYY-MM-DD"));
    }

    if (selectedToDate) {
      searchParams.set("to", selectedToDate.format("YYYY-MM-DD"));
    }

    const search = searchParams.toString();
    navigate(search ? `/explore?${search}` : "/explore", { replace: true });
  }, [sortBy, selectedGenres, runTimeUpdateURL, selectedFromDate, selectedToDate]);

  const genresMovieLocal: string | null = localStorage.getItem("genresMovieData");
  const genresMovieData: GenresData[] = genresMovieLocal !== null && JSON.parse(genresMovieLocal);

  const genresTVLocal: string | null = localStorage.getItem("genresTVData");
  const genresTVData: GenresData[] = genresTVLocal !== null && JSON.parse(genresTVLocal);
  return (
    <>
      <Box
        sx={{
          backgroundColor: themeDarkMode.backgroundColor,
          display: "flex",
          flexDirection: {
            xs: "column",
            lg: "row",
          },
          color: "white",
          gap: 2,
          height: "100vh",
          overflowY: "scroll",
          overflowX: "hidden",
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
                        location.pathname === item.link
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

        <Box sx={{ width: "100%", padding: "2rem" }}>
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
            <Tabs value={typeFilms} onChange={handleChange} aria-label="tab type movies">
              <Tab sx={{ color: "white" }} label="Movie" {...a11yProps(0)} />
              <Tab sx={{ color: "white" }} label="TV Series" {...a11yProps(1)} />
            </Tabs>
          </Box>
          <CustomTabPanel value={typeFilms} index={0}>
            <Grid container spacing={1} columns={15}>
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
            <Grid container spacing={1} columns={15}>
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
            display: "flex",
            flexDirection: {
              xs: "row",
              lg: "column",
            },
            gap: 2,
            width: {
              sm: "100%",
              lg: 450,
            },
            mt: 4,
            mr: 4,
          }}>
          {/* Sort */}
          <Box sx={{ backgroundColor: "#161d2f", padding: 2, borderRadius: 2 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h2>Sort</h2>
              <Button
                startIcon={<KeyboardArrowDownIcon />}
                sx={{ color: "white" }}
                onClick={() => setSortCollapse((prev) => !prev)}
              />
            </Box>
            {/* Sort collapse */}
            <Collapse in={sortCollapse}>
              <h2>Sort results by</h2>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                fullWidth
                onChange={handleChangeSortSearch}
                sx={{ color: "white", backgroundColor: "#49494b", borderRadius: 2 }}
                defaultValue="popularity.desc">
                <MenuItem value="popularity.desc">Most popular</MenuItem>
                <MenuItem value="vote_average.desc">Most rating</MenuItem>
                <MenuItem value="release_date.desc">Most recent</MenuItem>
              </Select>
            </Collapse>
          </Box>

          {/* Filter */}
          <Box sx={{ backgroundColor: "#161d2f", padding: 2, borderRadius: 2 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h2>Filter</h2>
              <Button
                startIcon={<KeyboardArrowDownIcon />}
                sx={{ color: "white" }}
                onClick={() => setFilterCollapse((prev) => !prev)}
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
                            backgroundColor: selectedGenres.includes(genre.id) ? "blue" : "gray",
                            padding: "0.5rem",
                            borderRadius: "1rem",
                          }}
                          onClick={() => handleChangeGenresSearch(genre.id)}>
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
              <h4>Run time</h4>
              <Box>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <h5>From {runTime[0]} min</h5>
                  <h5>To {runTime[1]} min</h5>
                </Box>
                <Slider
                  value={runTime}
                  onChangeCommitted={handleChangeCommitted}
                  onChange={handleChangeRunTimeSearch}
                  valueLabelDisplay="off"
                  aria-labelledby="range-slider"
                  disableSwap
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
                    maxWidth: "96%",
                    margin: "0 0.5rem",
                    padding: "0.5rem 0",
                  }}
                />
              </Box>
              {/* Realease date */}
              <h4>Realease date</h4>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>From </div>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      value={selectedFromDate}
                      onChange={handleFromDateChange}
                      slotProps={{
                        textField: {
                          sx: {
                            backgroundColor: "gray",
                            borderRadius: "0.5rem",
                            "& .MuiInputBase-input": {
                              color: "white",
                            },
                          },
                        },
                      }}
                    />
                  </LocalizationProvider>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>To </div>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      value={selectedToDate}
                      onChange={handleToDateChange}
                      slotProps={{
                        textField: {
                          sx: {
                            backgroundColor: "gray",
                            borderRadius: "0.5rem",
                            "& .MuiInputBase-input": {
                              color: "white",
                            },
                          },
                        },
                      }}
                    />
                  </LocalizationProvider>
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
