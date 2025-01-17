import React, { useState } from "react";
import {
  Paper,
  InputBase,
  InputAdornment,
  Typography,
  Button,
  Grid,
  MenuItem,
  Box,
  BoxProps,
  Card,
  CardContent,
  Collapse,
  Link,
  Pagination,
  PaginationItem,
} from "@mui/material";
import axios from "axios";
import { MovieDataType } from "../../assets/data";
import { themeDarkMode } from "../../themes/ThemeProvider";
import { GirlBackground, EmptyBackdrop } from "../../assets";
import Sidebar from "../../components/sidebar";
import { headers } from "../../utils";
import {
  SearchIcon,
  ClearIcon,
  StarIcon,
  ArrowDownIcon,
  ArrowPrevIcon,
  ArrowNextIcon,
  FirstPageIcon,
  LastPageIcon,
} from "../../components/icons";

const MovieItem: React.FC<{ movie: MovieDataType }> = ({ movie }) => {
  const getImageUrl = (movie: MovieDataType) => {
    if (movie.poster_path) {
      return `https://image.tmdb.org/t/p/w200/${movie.poster_path}`;
    } else if (movie.profile_path) {
      return `https://image.tmdb.org/t/p/w200/${movie.profile_path}`;
    } else {
      return EmptyBackdrop;
    }
  };
  return (
    <Item>
      <Link
        href={`${
          movie.mediaType === "movie"
            ? `/movie/${movie.id}`
            : movie.mediaType === "tv"
            ? `/tv/${movie.id}`
            : `person/${movie.id}`
        }`}
        underline="none">
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
                src={getImageUrl(movie)}
                alt={movie.title || movie.name}
                style={{ width: 200, height: 300, borderRadius: 1 }}
              />
              <Typography aria-label="movie rating" padding={0} textAlign={"center"} noWrap>
                {movie.title || movie.name}
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
};

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

const Search = () => {
  const [searchInput, setSearchInput] = useState<string>("");
  const [searchMovieShow, setSearchMovieShow] = useState<string>("");
  const [listMovieSearch, setListMovieSearch] = useState<MovieDataType[]>([]);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [totalResults, setTotalResults] = useState<number>(0);
  const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const [sortCollapse, setSortCollapse] = React.useState(true);

  const [page, setPage] = React.useState(1);
  const [typeSearch, setTypeSearch] = React.useState<string>("multi");

  const handleChangeTypeSearch = (type: string) => {
    setTypeSearch(type);
    setPage(1);
    fetchData(searchInput, 1, type);
  };
  const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    fetchData(searchInput, value, typeSearch);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      fetchData(searchInput, page, typeSearch);
      setSearchMovieShow(searchInput);
    }
  };

  const fetchData = async (searchTerm: string, page: number, typeSearch: string) => {
    try {
      const response = await axios.get(`https://api.themoviedb.org/3/search/${typeSearch}`, {
        params: {
          query: searchTerm,
          include_adult: false,
          language: "en-US",
          page: page,
        },
        headers,
      });
      setListMovieSearch(response.data.results);
      setTotalPages(response.data.total_pages);
      setTotalResults(response.data.total_results);
      window.scrollTo(0, 0);
      console.log("response = ", response);
    } catch (err) {
      console.log("err = ", err);
    }
  };

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

      <Box sx={{ width: "100%", overflowX: "hidden", overflowY: "scroll" }}>
        <Grid container spacing={1}>
          <Grid item xs={9}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginTop: listMovieSearch.length > 0 ? undefined : "8rem",
              }}>
              {listMovieSearch.length > 0 ? undefined : (
                <Typography variant="h4" align="center">
                  Find your favourite movies, TV shows, people and more
                </Typography>
              )}
              <InputBase
                placeholder="Search here ..."
                value={searchInput}
                onChange={handleChangeSearch}
                onKeyDown={handleKeyDown}
                sx={{
                  m: 2,
                  color: themeDarkMode.title,
                  border: `1px solid ${themeDarkMode.title}`,
                  borderRadius: "1rem",
                  p: 2,
                  width: "50%",
                  textAlign: "center",
                }}
                startAdornment={
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                }
                endAdornment={
                  <InputAdornment position="start" sx={{ cursor: "pointer" }} onClick={() => setSearchInput("")}>
                    <ClearIcon />
                  </InputAdornment>
                }
              />
              {listMovieSearch.length > 0 ? undefined : (
                <img
                  src={GirlBackground}
                  alt={"Girl"}
                  style={{ borderRadius: "0.5rem", width: "70%", height: "400px", display: "block" }}
                />
              )}
              <Box sx={{ px: 5 }}>
                {listMovieSearch.length > 0 ? (
                  <Typography align="left" sx={{ width: "100%" }}>
                    Search results for "{searchMovieShow}" ({totalResults} results found)
                  </Typography>
                ) : undefined}
                <Grid container spacing={1}>
                  {listMovieSearch.map((movie) => (
                    <Grid item xs={3}>
                      <MovieItem movie={movie} />
                    </Grid>
                  ))}
                </Grid>
              </Box>
              {listMovieSearch.length > 0 ? (
                <Pagination
                  count={totalPages}
                  page={page}
                  onChange={handleChangePage}
                  showFirstButton
                  showLastButton
                  renderItem={(item) => {
                    const isSpecialButton = ["first", "last", "next", "previous"].includes(item.type);
                    return (
                      <PaginationItem
                        {...item}
                        slots={{
                          previous: ArrowPrevIcon,
                          next: ArrowNextIcon,
                          first: FirstPageIcon,
                          last: LastPageIcon,
                        }}
                        sx={{
                          marginBottom: 4,
                          bgcolor:
                            item.page === page || (isSpecialButton && !item.disabled)
                              ? `${themeDarkMode.textPrimary} !important`
                              : themeDarkMode.backgroundSidebar,
                          color:
                            item.page === page || (isSpecialButton && !item.disabled)
                              ? themeDarkMode.title
                              : themeDarkMode.textColor,
                        }}
                      />
                    );
                  }}
                />
              ) : undefined}
            </Box>
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
                mr: 4,
                mt: 16,
              }}>
              {/* Search filter */}
              <Box
                sx={{
                  backgroundColor: themeDarkMode.backgroundSidebar,
                  padding: 1,
                  borderRadius: 2,
                }}>
                <Box sx={{ display: "flex", justifyContent: "space-around" }}>
                  <Typography variant="h5" component="h1" my={2} sx={{ fontWeight: "bold" }}>
                    Search Results
                  </Typography>
                  <Button
                    startIcon={<ArrowDownIcon />}
                    sx={{ color: themeDarkMode.title }}
                    onClick={() => setSortCollapse((prev) => !prev)}
                  />
                </Box>

                {/* Sort collapse */}

                <Collapse in={sortCollapse}>
                  <Paper
                    sx={{
                      padding: 2,
                      backgroundColor: "transparent",
                      color: themeDarkMode.title,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}>
                    <MenuItem
                      sx={{
                        width: "100%",
                        justifyContent: "center",
                        backgroundColor: typeSearch === "multi" ? themeDarkMode.textColor : "transparent",
                        borderRadius: "0.5rem",
                      }}
                      onClick={() => handleChangeTypeSearch("multi")}>
                      All
                    </MenuItem>
                    <MenuItem
                      sx={{
                        width: "100%",
                        justifyContent: "center",
                        backgroundColor: typeSearch === "movie" ? themeDarkMode.textColor : "transparent",
                        borderRadius: "0.5rem",
                      }}
                      onClick={() => handleChangeTypeSearch("movie")}>
                      Movie
                    </MenuItem>
                    <MenuItem
                      sx={{
                        width: "100%",
                        justifyContent: "center",
                        backgroundColor: typeSearch === "tv" ? themeDarkMode.textColor : "transparent",
                        borderRadius: "0.5rem",
                      }}
                      onClick={() => handleChangeTypeSearch("tv")}>
                      TV Show
                    </MenuItem>
                    <MenuItem
                      sx={{
                        width: "100%",
                        justifyContent: "center",
                        backgroundColor: typeSearch === "person" ? themeDarkMode.textColor : "transparent",
                        borderRadius: "0.5rem",
                      }}
                      onClick={() => handleChangeTypeSearch("person")}>
                      People
                    </MenuItem>
                  </Paper>
                </Collapse>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Search;
