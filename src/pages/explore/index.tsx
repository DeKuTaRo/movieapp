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
  Link,
} from "@mui/material";
import { SearchIcon, StarIcon, ArrowDownIcon } from "../../components/icons";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { GenresData, MovieDataType } from "../../assets/data";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";
import { themeDarkMode } from "../../themes/ThemeProvider";
import SidebarShorten from "../../components/sidebar/sidebarShorten";
import { headers } from "../../utils";
import CustomSkeleton from "../../components/Skeleton";

const MovieItem: React.FC<{ movie: MovieDataType; typeFilm: number }> = ({ movie, typeFilm }) => (
  <Item>
    <Link href={`${typeFilm === 0 ? "/movie/" : "/tv/"}${movie.id}`} underline="none">
      <Paper elevation={0} sx={{ backgroundColor: "transparent", margin: 0 }}>
        <Card
          variant="outlined"
          sx={{
            bgcolor: "transparent",
            color: themeDarkMode.title,
            border: "none",
            transition: "transform 0.3s ease-in-out",
            "&:hover": {
              transform: "scale(1.05)",
            },
          }}>
          <CardContent sx={{ p: 0, position: "relative" }}>
            <img
              src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`}
              alt={movie.title}
              style={{ height: 250, borderRadius: "0.5rem" }}
            />
            <Typography variant="subtitle2" aria-label="movie rating" textAlign="center" noWrap>
              {movie.title}
            </Typography>
            <Typography
              variant="body1"
              component="span"
              sx={{
                position: "absolute",
                top: "6%",
                left: "10%",
                padding: "0.125rem 0.625rem",
                backgroundColor: themeDarkMode.textPrimary,
                borderRadius: "0.5rem",
                display: "flex",
                alignItems: "center",
              }}>
              <Typography
                sx={{
                  fontWeight: "bold",
                  fontSize: "10px",
                  marginRight: "0.125rem",
                  marginTop: "0.125rem",
                }}>
                {movie.vote_average && parseFloat(movie.vote_average).toFixed(1)}
              </Typography>
              <StarIcon width="12" height="12" />
            </Typography>
          </CardContent>
        </Card>
      </Paper>
    </Link>
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
        borderRadius: 2,
        fontSize: "0.875rem",
        fontWeight: "700",
        ...sx,
      }}
      {...other}
    />
  );
}

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
  const [isContinueFetch, setIsContinueFetch] = useState(false);
  const observer = useRef<IntersectionObserver | null>(null);

  const lastMovieElementRef = useCallback(
    (node: HTMLElement | null) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
          setIsContinueFetch(true);
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
    <Box
      sx={{
        backgroundColor: themeDarkMode.backgroundColor,
        display: "flex",
        flexDirection: {
          xs: "column",
          lg: "row",
        },
        color: themeDarkMode.title,
        gap: 2,
        height: "100vh",
      }}>
      <SidebarShorten />

      <Box sx={{ width: "100%", py: 4, px: 2, display: "flex", overflowY: "scroll", overFlowX: "hidden", gap: 1.5 }}>
        <Grid container spacing={1}>
          <Grid item xs={9}>
            <Box sx={{ display: "flex" }}>
              <Typography variant="h3" sx={{ width: "75%" }}>
                Find films that best fit to you
              </Typography>
              <InputBase
                placeholder="Search here ..."
                sx={{
                  mx: 1,
                  flex: 1,
                  color: themeDarkMode.title,
                  border: `1px solid ${themeDarkMode.textColor}`,
                  borderRadius: "1rem",
                  px: 1,
                }}
                startAdornment={
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                }
              />
            </Box>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={typeFilms}
                onChange={handleChange}
                aria-label="tab type movies"
                sx={{
                  "& .MuiTab-root": { color: themeDarkMode.title },
                  "& .Mui-selected": { color: `${themeDarkMode.textPrimary} !important` },
                  "& .MuiTabs-indicator": { backgroundColor: themeDarkMode.textPrimary },
                }}>
                <Tab label="Movie" {...a11yProps(0)} />
                <Tab label="TV Series" {...a11yProps(1)} />
              </Tabs>
            </Box>
            <CustomTabPanel value={typeFilms} index={0}>
              {loading && !isContinueFetch ? (
                <Grid container spacing={1} columns={15} sx={{ marginLeft: "0.5rem" }}>
                  {Array.from({ length: 10 }).map((_, index) => (
                    <Grid item xs={3} key={index} sx={{ marginTop: "2rem", marginBottom: "2rem" }}>
                      <CustomSkeleton variant="rounded" width={150} height={250} />
                    </Grid>
                  ))}
                </Grid>
              ) : (
                <Grid container spacing={1} columns={15}>
                  {listsMovieSearch.map((movie, index) => (
                    <Grid
                      item
                      xs={3}
                      key={movie.id}
                      ref={index === listsMovieSearch.length - 1 ? lastMovieElementRef : null}>
                      <MovieItem movie={movie} typeFilm={0} />
                    </Grid>
                  ))}
                </Grid>
              )}
            </CustomTabPanel>
            <CustomTabPanel value={typeFilms} index={1}>
              {loading && !isContinueFetch ? (
                <Grid container spacing={1} columns={15} sx={{ marginLeft: "0.5rem" }}>
                  {Array.from({ length: 10 }).map((_, index) => (
                    <Grid item xs={3} key={index} sx={{ marginTop: "2rem", marginBottom: "2rem" }}>
                      <CustomSkeleton variant="rounded" width={197} height={240} />
                    </Grid>
                  ))}
                </Grid>
              ) : (
                <Grid container spacing={1} columns={15}>
                  {listsTVShowSearch.map((movie, index) => (
                    <Grid
                      item
                      xs={3}
                      key={movie.id}
                      ref={index === listsMovieSearch.length - 1 ? lastMovieElementRef : null}>
                      <MovieItem movie={movie} typeFilm={1} />
                    </Grid>
                  ))}
                </Grid>
              )}
            </CustomTabPanel>
          </Grid>
          <Grid item xs={3}>
            {/* Sidebar Right */}
            <Box
              sx={{
                display: "flex",
                flexDirection: {
                  xs: "row",
                  lg: "column",
                },
                gap: 2,

                // mt: 4,
                // mr: 4,
              }}>
              {/* Sort */}
              <Box sx={{ backgroundColor: themeDarkMode.backgroundSidebar, padding: 2, borderRadius: 2 }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: "bold",
                    }}>
                    Sort
                  </Typography>
                  <Button
                    startIcon={<ArrowDownIcon />}
                    sx={{ color: "white" }}
                    onClick={() => setSortCollapse((prev) => !prev)}
                  />
                </Box>
                {/* Sort collapse */}
                <Collapse in={sortCollapse} sx={{ px: 1.5 }}>
                  <Typography variant="h6" gutterBottom>
                    Sort results by
                  </Typography>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    fullWidth
                    onChange={handleChangeSortSearch}
                    sx={{
                      color: themeDarkMode.title,
                      backgroundColor: themeDarkMode.backgroundSidebar,
                      borderRadius: 2,
                      border: `1px solid ${themeDarkMode.title}`,
                    }}
                    defaultValue="popularity.desc">
                    <MenuItem value="popularity.desc">Most popular</MenuItem>
                    <MenuItem value="vote_average.desc">Most rating</MenuItem>
                    <MenuItem value="release_date.desc">Most recent</MenuItem>
                  </Select>
                </Collapse>
              </Box>

              {/* Filter */}
              <Box sx={{ backgroundColor: themeDarkMode.backgroundSidebar, padding: 2, borderRadius: 2 }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: "bold",
                      width: "fit-content",
                    }}>
                    Filter
                  </Typography>
                  <Button
                    startIcon={<ArrowDownIcon />}
                    sx={{ color: "white" }}
                    onClick={() => setFilterCollapse((prev) => !prev)}
                  />
                </Box>

                {/* Filter collapse */}
                <Collapse in={filterCollapse} sx={{ px: 1.5, display: "flex", flexDirection: "column", gap: 0.5 }}>
                  <Typography variant="h6" gutterBottom>
                    Genres
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: 2,
                      overflowY: "scroll",
                      maxHeight: "200px",
                      mb: 1,
                    }}>
                    {(typeFilms === 0 ? genresMovieData : genresTVData).map((genre) => {
                      return (
                        <Typography
                          key={genre.id}
                          sx={{
                            backgroundColor: selectedGenres.includes(genre.id)
                              ? themeDarkMode.textPrimary
                              : themeDarkMode.backgroundSidebar,
                            padding: "0.5rem",
                            borderRadius: "1rem",
                            border: `1px solid ${themeDarkMode.title}`,
                            cursor: "pointer",
                          }}
                          onClick={() => handleChangeGenresSearch(genre.id)}>
                          {genre.name}
                        </Typography>
                      );
                    })}
                  </Box>
                  {/* Run time */}
                  <Typography variant="h6" gutterBottom>
                    Run time
                  </Typography>
                  <Box sx={{ display: "flex", justifyContent: "space-between", px: 1.5 }}>
                    <Typography variant="body2" gutterBottom>
                      From {runTime[0]} min
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      To {runTime[1]} min
                    </Typography>
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
                        backgroundColor: "black",
                      },
                      "& .MuiSlider-track": {
                        backgroundColor: themeDarkMode.textPrimary,
                      },
                      "& .MuiSlider-thumb": {
                        backgroundColor: themeDarkMode.textPrimary,
                      },
                      maxWidth: "96%",
                      margin: "0 0.5rem",
                      padding: "0.5rem 0",
                    }}
                  />
                  {/* Realease date */}
                  <Typography variant="h6" gutterBottom>
                    Realease date
                  </Typography>
                  <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    <Grid container spacing={1.5} sx={{ alignItems: "center" }}>
                      <Grid item xs={2}>
                        <Typography variant="body2" gutterBottom>
                          From
                        </Typography>
                      </Grid>
                      <Grid item xs={10}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DatePicker
                            value={selectedFromDate}
                            onChange={handleFromDateChange}
                            slotProps={{
                              textField: {
                                sx: {
                                  backgroundColor: themeDarkMode.textColor,
                                  borderRadius: "0.5rem",
                                  "& .MuiInputBase-input": {
                                    color: themeDarkMode.title,
                                  },
                                },
                              },
                            }}
                          />
                        </LocalizationProvider>
                      </Grid>
                      <Grid item xs={2}>
                        <Typography variant="body2" gutterBottom>
                          To
                        </Typography>
                      </Grid>
                      <Grid item xs={10}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DatePicker
                            value={selectedToDate}
                            onChange={handleToDateChange}
                            slotProps={{
                              textField: {
                                sx: {
                                  backgroundColor: themeDarkMode.textColor,
                                  borderRadius: "0.5rem",
                                  "& .MuiInputBase-input": {
                                    color: themeDarkMode.title,
                                  },
                                },
                              },
                            }}
                          />
                        </LocalizationProvider>
                      </Grid>
                    </Grid>
                  </Box>
                </Collapse>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Explore;
