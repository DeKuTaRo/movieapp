import React, { useEffect, useState } from "react";
import {
  Paper,
  InputBase,
  InputAdornment,
  Typography,
  Button,
  Grid,
  Box,
  BoxProps,
  List,
  ListItem,
  Avatar,
  Card,
  CardContent,
  CardMedia,
  Tabs,
  Tab,
} from "@mui/material";
import SearchIcon from "../../assets/icons/icon-search.svg";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

import { Link, useLocation, useParams } from "react-router-dom";

import EmptyBackDrop from "../../assets/images/emptyBackdrop.jpg";
import { homeIcon, movieIcon, tvSeriesIcon, bookmarkIcon } from "../../assets";

import axios from "axios";
import { GenresData, MovieDataType, DetailCastMovie, DetailReviewMovie, DetailMediaMovie } from "../../assets/data";

import { Star, StarBorder, StarHalf } from "@mui/icons-material";
import { themeDarkMode } from "../../themes/ThemeProvider";
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

interface RatingProps {
  value: number;
  maxValue?: number;
  totalStars?: number;
}

const Rating: React.FC<RatingProps> = ({ value, maxValue = 10, totalStars = 5 }) => {
  // Convert the value to a 0-5 scale
  const normalizedValue = (value / maxValue) * totalStars;
  const filledStars = Math.floor(normalizedValue);
  const hasHalfStar = normalizedValue % 1 >= 0.5;
  const emptyStars = totalStars - filledStars - (hasHalfStar ? 1 : 0);

  return (
    <Box display="flex" alignItems="center">
      {[...Array(filledStars)].map((_, index) => (
        <Star key={index} style={{ color: "yellow" }} />
      ))}
      {hasHalfStar && <StarHalf style={{ color: "yellow" }} />}
      {[...Array(emptyStars)].map((_, index) => (
        <StarBorder key={index} style={{ color: "gray" }} />
      ))}
    </Box>
  );
};

const formatDateString = (dateString: string): string => {
  // Extract the date part (YYYY-MM-DD) from the full date-time string
  const datePart = dateString.split("T")[0];

  // Split the date part into its components
  const [year, month, day] = datePart.split("-");

  // Rearrange the components to the desired format (DD-MM-YYYY)
  const formattedDate = `${day}-${month}-${year}`;

  return formattedDate;
};

interface NumberCircleProps {
  number: number;
}

const NumberCircle: React.FC<NumberCircleProps> = ({ number }) => {
  const roundedNumber = Math.round(number * 10) / 10;

  const radius = 18;
  const circumference = 2 * Math.PI * radius;
  const percentage = (roundedNumber / 10) * 100;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;
  return (
    <Box
      sx={{
        position: "relative",
        display: "inline-flex",
        justifyContent: "center",
        alignItems: "center",
        width: 72,
        height: 72,
      }}>
      <svg
        width={72}
        height={72}
        viewBox="0 0 72 72"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
        }}>
        <circle cx="36" cy="36" r={radius} fill="none" stroke="#161d2f" strokeWidth="4" />
        <circle
          cx="36"
          cy="36"
          r={radius}
          fill="none"
          stroke="#1976d2"
          strokeWidth="4"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          transform="rotate(-90 36 36)"
        />
      </svg>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: "50%",
          width: 36,
          height: 36,
          backgroundColor: "#161d2f",
          color: "white",
          fontSize: 16,
          fontFamily: "Arial, sans-serif",
          zIndex: 1,
        }}>
        {roundedNumber.toFixed(1)}
      </Box>
    </Box>
  );
};

const navLinks = [
  {
    name: "Home",
    icon: homeIcon,
    link: "/",
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

const MovieDetails = () => {
  const params = useParams();
  const location = useLocation();
  const [value, setValue] = React.useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const [detailsMovie, setDetailsMovie] = React.useState<MovieDataType | null>(null);
  const [detailCastsMovie, setDetailCastsMovie] = React.useState<DetailCastMovie[]>([]);
  const [detailReviewsMovie, setDetailReviewsMovie] = React.useState<DetailReviewMovie | null>(null);
  const [detailMediasMovie, setDetailMediasMovie] = React.useState<DetailMediaMovie | null>(null);
  const [detailSimilarMovie, setDetailSimilarMovie] = React.useState<MovieDataType[]>([]);
  const path = location.pathname;
  const isMoviePath = path.startsWith("/movie/");
  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const headers = {
          accept: "application/json",
          Authorization: `Bearer ${process.env.REACT_APP_API_TOKEN}`,
        };
        const [response1, response2, response3, response4, response5] = await Promise.all([
          axios.get(`https://api.themoviedb.org/3/${isMoviePath ? "movie" : "tv"}/${params.id}?language=en-US`, {
            headers,
          }),
          axios.get(
            `https://api.themoviedb.org/3/${isMoviePath ? "movie" : "tv"}/${params.id}/credits?language=en-US`,
            {
              headers,
            }
          ),
          axios.get(
            `https://api.themoviedb.org/3/${isMoviePath ? "movie" : "tv"}/${params.id}/reviews?language=en-US`,
            {
              headers,
            }
          ),
          axios.get(`https://api.themoviedb.org/3/${isMoviePath ? "movie" : "tv"}/${params.id}/videos?language=en-US`, {
            headers,
          }),
          axios.get(
            `https://api.themoviedb.org/3/${isMoviePath ? "movie" : "tv"}/${params.id}/similar?language=en-US&page=1`,
            { headers }
          ),
        ]);

        setDetailsMovie(response1.data);
        setDetailCastsMovie(response2.data.cast);
        setDetailReviewsMovie(response3.data);
        setDetailMediasMovie(response4.data);
        setDetailSimilarMovie(response5.data.results);
      } catch (err) {
        console.log("error: ", err);
      }
    };
    fetchDetails();
  }, [params.id, location.pathname, isMoviePath]);

  const { pathname } = useLocation();
  const genresMovieLocal: string | null = localStorage.getItem("genresMovieData");
  const genresMovieData: GenresData[] = genresMovieLocal !== null && JSON.parse(genresMovieLocal);

  const genresTVLocal: string | null = localStorage.getItem("genresTVData");
  const genresTVData: GenresData[] = genresTVLocal !== null && JSON.parse(genresTVLocal);

  const [expandedIndex, setExpandedIndex] = useState<string | null>(null);
  const handleShowFullReview = (id: string) => {
    setExpandedIndex(expandedIndex === id ? null : id);
  };

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

        {detailsMovie && (
          <Box sx={{ width: "100%", overflowY: "scroll" }}>
            <Box
              sx={{
                position: "relative",
                backgroundImage: `url("https://image.tmdb.org/t/p/original/${detailsMovie.backdrop_path}")`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                height: { xs: "500px", md: "400px" },
                borderBottomLeftRadius: "2rem",
                borderTopLeftRadius: "2rem",
              }}>
              <Box
                sx={{
                  position: "absolute",
                  height: "100%",
                  width: "100%",
                  borderBottomLeftRadius: "2rem",
                  borderTopLeftRadius: "2rem",
                  backgroundImage: "linear-gradient(to bottom right , transparent, rgba(0,0,0,0.7))",
                }}
              />
              <Box
                sx={{
                  position: "absolute",
                  top: "40%",
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-evenly",
                  borderRadius: 1,
                }}>
                <Item sx={{ width: "150px" }}>
                  <img
                    src={`https://image.tmdb.org/t/p/w200/${detailsMovie.poster_path}`}
                    style={{ borderRadius: "8px", width: "100%", display: "block" }}
                    alt={detailsMovie.title || detailsMovie.name}
                  />
                </Item>
                <Item sx={{ width: "500px" }}>
                  <Typography variant="h3" style={{ marginTop: "2rem", marginBottom: "1rem", fontWeight: "bold" }}>
                    {detailsMovie.original_title || detailsMovie.original_name}
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: 2,
                    }}>
                    {detailsMovie.genres.map((genre, index) =>
                      isMoviePath
                        ? genresMovieData.map(
                            (localGenre) =>
                              localGenre.id === genre.id && (
                                <Typography
                                  key={index}
                                  sx={{
                                    backgroundColor: "transparent",
                                    padding: "0.75rem",
                                    borderRadius: "1rem",
                                    color: "white",
                                    border: "1px solid white",
                                  }}>
                                  {localGenre.name}
                                </Typography>
                              )
                          )
                        : genresTVData.map(
                            (localGenre) =>
                              localGenre.id === genre.id && (
                                <Typography
                                  key={index}
                                  sx={{
                                    backgroundColor: "transparent",
                                    padding: "0.75rem",
                                    borderRadius: "1rem",
                                    color: "white",
                                    border: "1px solid white",
                                  }}>
                                  {localGenre.name}
                                </Typography>
                              )
                          )
                    )}
                  </Box>
                </Item>
                <Item sx={{ marginTop: "8rem" }}>
                  <Button size="large" startIcon={<PlayArrowIcon />} variant="contained">
                    Watch
                  </Button>
                </Item>
              </Box>
            </Box>
            <Box sx={{ display: "flex", flexGrow: 1, height: "550px" }}>
              <Grid container>
                <Grid
                  item
                  xs={2}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 4,
                    maxHeight: "400px",
                    textAlign: "center",
                  }}>
                  <Box>
                    <Typography>Rating</Typography>
                    <NumberCircle number={parseFloat(detailsMovie.vote_average)} />
                  </Box>
                  <Box>
                    <Typography>EP Length</Typography>
                    <Typography>{detailsMovie.runtime} mins</Typography>
                  </Box>
                </Grid>
                <Grid item xs={7}>
                  <Box>
                    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                      <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" centered>
                        <Tab sx={{ color: "white" }} label="Overall" {...a11yProps(0)} />
                        <Tab sx={{ color: "white" }} label="Cast" {...a11yProps(1)} />
                        <Tab sx={{ color: "white" }} label="Reviews" {...a11yProps(2)} />
                        {/* <Tab sx={{ color: "white" }} label="Seasons" {...a11yProps(2)} /> */}
                      </Tabs>
                    </Box>
                    <CustomTabPanel value={value} index={0}>
                      <Typography
                        variant="h5"
                        noWrap
                        sx={{
                          fontWeight: "bold",
                          fontStyle: "italic",
                        }}
                        align="center">
                        {detailsMovie.tagline}
                      </Typography>
                      <Typography
                        variant="h5"
                        sx={{
                          fontWeight: "bold",
                        }}>
                        Story
                      </Typography>
                      <Typography
                        variant="subtitle1"
                        sx={{
                          color: "gray",
                          marginLeft: "1.5rem",
                        }}>
                        {detailsMovie.overview}
                      </Typography>
                      <Typography
                        variant="h5"
                        sx={{
                          fontWeight: "bold",
                        }}>
                        Details
                      </Typography>
                      <Box sx={{ marginLeft: "1.5rem" }}>
                        <Typography variant="subtitle1">Status: {detailsMovie.status}</Typography>
                        <Typography variant="subtitle1">
                          {`Release date : ${detailsMovie.release_date}` ||
                            `Last air date: ${detailsMovie.last_air_date}`}
                        </Typography>
                        <Typography variant="subtitle1">{`Spoken language: ${
                          detailsMovie.spoken_languages &&
                          detailsMovie.spoken_languages.map((lang) => lang.english_name).join(", ")
                        }`}</Typography>
                      </Box>
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={1}>
                      <Grid container spacing={2} sx={{ height: "450px", overflowY: "scroll" }}>
                        {detailCastsMovie &&
                          detailCastsMovie.map((cast) => (
                            <Grid item xs={6} key={cast.id}>
                              <Item sx={{ display: "flex", alignItems: "center" }}>
                                <Avatar
                                  alt={cast.original_name}
                                  src={`https://image.tmdb.org/t/p/original/${cast.profile_path}`}
                                />
                                <Typography sx={{ marginLeft: "1rem" }}>{cast.name}</Typography>
                              </Item>
                            </Grid>
                          ))}
                      </Grid>
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={2}>
                      <Grid container spacing={1} sx={{ height: "400px", overflowY: "scroll", marginTop: "1rem" }}>
                        {detailReviewsMovie ? (
                          detailReviewsMovie.results.map((review) => (
                            <React.Fragment key={review.id}>
                              <Grid item xs={2}>
                                <Item>
                                  <Avatar
                                    alt="Remy Sharp"
                                    src={
                                      review.author_details.avatar_path
                                        ? `https://image.tmdb.org/t/p/original/${review.author_details.avatar_path}`
                                        : EmptyBackDrop
                                    }
                                    sx={{ width: 60, height: 60 }}
                                  />{" "}
                                </Item>
                              </Grid>
                              <Grid item xs={10}>
                                <Item>
                                  <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                    <Typography>
                                      {review.author} ({review.author_details.username})
                                    </Typography>
                                    <Rating value={review.author_details.rating} />
                                  </Box>
                                  {expandedIndex === review.id ? (
                                    <Typography>{review.content}</Typography>
                                  ) : (
                                    <Typography
                                      sx={{
                                        overflow: "hidden",
                                        display: "-webkit-box",
                                        WebkitLineClamp: 3,
                                        WebkitBoxOrient: "vertical",
                                      }}>
                                      {review.content}
                                    </Typography>
                                  )}
                                  <Button
                                    variant="outlined"
                                    sx={{ color: "white" }}
                                    onClick={() => handleShowFullReview(review.id)}>
                                    {expandedIndex === review.id ? "Show less" : "Show more"}
                                  </Button>
                                  <Typography align="right">{formatDateString(review.created_at)}</Typography>
                                </Item>
                              </Grid>
                            </React.Fragment>
                          ))
                        ) : (
                          <Typography>There is no reviews yet</Typography>
                        )}
                      </Grid>
                    </CustomTabPanel>
                    {/* <CustomTabPanel value={value} index={3}>
                      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                        <Typography>Total seasons: 26</Typography>
                        <Typography>Total episodes: 694</Typography>
                      </Box>
                      <Box
                        sx={{ height: "250px", overflowY: "scroll", display: "flex", flexDirection: "column", gap: 2 }}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                          <img
                            src={"https://image.tmdb.org/t/p/w200/c6MRUtPk0nEPQ9FBD9RdRKt2rIm.jpg"}
                            style={{ borderRadius: "8px", width: "200px", height: "200px" }}
                            alt=""
                          />
                          <Box>
                            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                              <Typography>Specials</Typography>
                              <Typography>203 episodes</Typography>
                            </Box>
                            <Typography>
                              How do you review a show like Doctor Who that has been running for so long, enjoying
                              dizzying highs and terrible lows I'm looking at you The Twin Dil How do you review a show
                              like Doctor Who that has been running for so long, enjoying dizzying highs and terrible
                              lows I'm looking at you The Twin Dil
                            </Typography>
                            <Typography>1991-08-26</Typography>
                          </Box>
                        </Box>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                          <img
                            src={"https://image.tmdb.org/t/p/w200/c6MRUtPk0nEPQ9FBD9RdRKt2rIm.jpg"}
                            style={{ borderRadius: "8px", width: "200px", height: "200px" }}
                            alt=""
                          />
                          <Box>
                            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                              <Typography>Specials</Typography>
                              <Typography>203 episodes</Typography>
                            </Box>
                            <Typography>
                              How do you review a show like Doctor Who that has been running for so long, enjoying
                              dizzying highs and terrible lows I'm looking at you The Twin Dil How do you review a show
                              like Doctor Who that has been running for so long, enjoying dizzying highs and terrible
                              lows I'm looking at you The Twin Dil
                            </Typography>
                            <Typography>1991-08-26</Typography>
                          </Box>
                        </Box>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                          <img
                            src={"https://image.tmdb.org/t/p/w200/c6MRUtPk0nEPQ9FBD9RdRKt2rIm.jpg"}
                            style={{ borderRadius: "8px", width: "200px", height: "200px" }}
                            alt=""
                          />
                          <Box>
                            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                              <Typography>Specials</Typography>
                              <Typography>203 episodes</Typography>
                            </Box>
                            <Typography>
                              How do you review a show like Doctor Who that has been running for so long, enjoying
                              dizzying highs and terrible lows I'm looking at you The Twin Dil How do you review a show
                              like Doctor Who that has been running for so long, enjoying dizzying highs and terrible
                              lows I'm looking at you The Twin Dil
                            </Typography>
                            <Typography>1991-08-26</Typography>
                          </Box>
                        </Box>
                      </Box>
                    </CustomTabPanel> */}
                  </Box>
                </Grid>
                <Grid item xs={3}>
                  <h1>Media</h1>
                  {/* <Box sx={{ paddingRight: "0.75rem", height: "400px", overflowY: "scroll" }}>
                    {detailMediasMovie ? (
                      detailMediasMovie.results.map((media) => (
                        <Box key={media.id}>
                          <Typography>{media.type}</Typography>
                          <iframe
                            allowFullScreen={true}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            title="Video trailer"
                            width="100%"
                            height="100%"
                            src={`https://www.youtube.com/embed/${media.key}?enablejsapi=1&amp;amp;origin=http%3A%2F%2Flocalhost%3A3000&amp;amp;widgetid=1`}
                            id="widget2"
                            className="absolute top-0 left-0 !w-full !h-full"></iframe>
                          <Typography variant="h6" noWrap>
                            {media.name}
                          </Typography>
                        </Box>
                      ))
                    ) : (
                      <Typography>There is no media available.</Typography>
                    )}
                  </Box> */}
                </Grid>
              </Grid>
            </Box>
          </Box>
        )}
        <Box
          sx={{
            backgroundColor: "#161d2f",
            padding: 2,
            display: "flex",
            flexDirection: {
              xs: "row",
              lg: "column",
            },
            gap: 2,
            alignItems: "center",
            width: {
              sm: "100%",
              lg: 350,
            },
          }}>
          <Paper
            component={"form"}
            sx={{
              display: "flex",
              alignItems: "center",
              borderRadius: "default",
              p: 1,
              backgroundColor: themeDarkMode.backgroundColor,
              border: "none",
            }}>
            <InputBase
              placeholder="Search here ..."
              sx={{
                mx: 1,
                flex: 1,
                color: "white",
                border: "none",
              }}
              // value={search}
              // onChange={handleSearch}
              startAdornment={
                <InputAdornment position="start">
                  <img src={SearchIcon} alt="Search icon" width={20} height={20} />
                </InputAdornment>
              }
            />
          </Paper>
          <List sx={{ maxHeight: "90%", overflowY: "scroll" }}>
            {detailSimilarMovie.map(
              (movie) =>
                movie.backdrop_path !== null && (
                  <ListItem key={movie.id} sx={{ px: 0 }}>
                    <Card sx={{ display: "flex", backgroundColor: "#161d2f", color: "white", width: "100%" }}>
                      <CardMedia
                        component="img"
                        sx={{ width: "26%" }}
                        image={`https://image.tmdb.org/t/p/w342${movie.backdrop_path}`}
                        alt={movie.title || movie.name}
                      />
                      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <CardContent sx={{ flex: "1 0 auto" }}>
                          <Typography variant="subtitle1" noWrap>
                            {movie.title || movie.name}
                          </Typography>
                          <Typography variant="subtitle2">{movie.release_date || movie.first_air_date}</Typography>
                        </CardContent>
                      </Box>
                    </Card>
                  </ListItem>
                )
            )}
          </List>
          <Button variant="outlined">See more</Button>
        </Box>
      </Box>
    </>
  );
};

export default MovieDetails;
