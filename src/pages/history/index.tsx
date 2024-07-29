import React from "react";
import { Box, BoxProps, Tabs, Tab, Grid, Typography, Link, Paper, Card, CardContent } from "@mui/material";

import Sidebar from "../../components/sidebar";
import { themeDarkMode } from "../../themes/ThemeProvider";
import { Star } from "@mui/icons-material";

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
      {value === index && <Box sx={{ p: 3, mb: 3 }}> {children} </Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

interface MovieProps {
  id: number;
  poster_path: string;
  title: string;
  vote_average: number;
}

const movie = {
  id: 1,
  poster_path: "/t9XkeE7HzOsdQcDDDapDYh8Rrmt.jpg",
  title: "Dragon",
  vote_average: 7.4,
};

const MovieItem: React.FC<{ movie: MovieProps; typeFilm: number }> = ({ movie, typeFilm }) => (
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
              style={{ width: "100%", height: "100%", borderRadius: "8px" }}
            />
            <Typography aria-label="movie rating" padding={0} textAlign={"center"}>
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
                {movie.vote_average && movie.vote_average.toFixed(1)}
              </Typography>
              <Star sx={{ width: "0.75rem", height: "0.75rem" }} />
            </Typography>
          </CardContent>
        </Card>
      </Paper>
    </Link>
  </Item>
);

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

const History = () => {
  const [typeFilms, setTypeFilms] = React.useState(0);
  const handleChangeFilmTab = async (event: React.SyntheticEvent, filmTab: number) => {
    setTypeFilms(filmTab);
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
      <Box sx={{ width: "100%", overflowY: "scroll", marginTop: 3, px: 3 }}>
        <Typography variant="h3">Films I watched</Typography>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={typeFilms}
            onChange={handleChangeFilmTab}
            aria-label="tab type movies"
            sx={{
              "& .MuiTab-root": { color: themeDarkMode.title },
              "& .Mui-selected": { color: `${themeDarkMode.textPrimary} !important` },
              "& .MuiTabs-indicator": { backgroundColor: themeDarkMode.textPrimary },
            }}>
            <Tab label="All" {...a11yProps(1)} />
            <Tab label="Movie" {...a11yProps(0)} />
            <Tab label="TV Series" {...a11yProps(2)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={typeFilms} index={0}>
          <div>List all films</div>
          <Grid container spacing={1}>
            <Grid item xs={2}>
              <MovieItem movie={movie} typeFilm={0} />
            </Grid>
            <Grid item xs={2}>
              <MovieItem movie={movie} typeFilm={0} />
            </Grid>
            <Grid item xs={2}>
              <MovieItem movie={movie} typeFilm={0} />
            </Grid>
            <Grid item xs={2}>
              <MovieItem movie={movie} typeFilm={0} />
            </Grid>
            <Grid item xs={2}>
              <MovieItem movie={movie} typeFilm={0} />
            </Grid>
            <Grid item xs={2}>
              <MovieItem movie={movie} typeFilm={0} />
            </Grid>
          </Grid>
        </CustomTabPanel>
        <CustomTabPanel value={typeFilms} index={1}>
          <div>List all movies</div>
        </CustomTabPanel>
        <CustomTabPanel value={typeFilms} index={2}>
          <div>List all tv shows</div>
        </CustomTabPanel>
      </Box>
    </Box>
  );
};

export default History;
