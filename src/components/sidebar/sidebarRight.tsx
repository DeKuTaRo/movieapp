import {
  Box,
  Typography,
  Paper,
  InputBase,
  InputAdornment,
  List,
  ListItem,
  Card,
  CardMedia,
  CardContent,
  Button,
  Link,
} from "@mui/material";
import SearchIcon from "../../assets/icons/icon-search.svg";
import { GenresData, MovieDataType } from "../../assets/data";
import { themeDarkMode } from "../../themes/ThemeProvider";
const SidebarRight = ({
  genres,
  typeFilms,
  movieTrending,
}: {
  genres: GenresData[];
  typeFilms: number;
  movieTrending: MovieDataType[];
}) => {
  return (
    <>
      <Paper
        component={"form"}
        sx={{
          display: "flex",
          alignItems: "center",
          p: 1,
          mt: 2,
          backgroundColor: themeDarkMode.backgroundColor,
          width: "85%",
          borderRadius: "0.5rem",
        }}>
        <InputBase
          placeholder="Search here ..."
          sx={{
            flex: 1,
            color: themeDarkMode.title,
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

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 2,
          height: "200px",
          overflowY: "scroll",
        }}
        px={2}>
        {genres.map((item) => {
          return (
            <Typography
              key={item.id}
              variant="body2"
              component="h1"
              sx={{
                backgroundColor: themeDarkMode.backgroundColor,
                padding: "0.5rem",
                borderRadius: "1rem",
              }}>
              {item.name}
            </Typography>
          );
        })}
      </Box>
      <Typography variant="h5" component="h1" mb={1} align="left" sx={{ width: "100%", fontWeight: "bold" }}>
        Trending
      </Typography>
      <List>
        {movieTrending.slice(0, 2).map((movie) => (
          <ListItem>
            <Link href={`${typeFilms === 0 ? "/movie/" : "/tv/"}${movie.id}`} underline="none">
              <Card sx={{ display: "flex", backgroundColor: "transparent", color: themeDarkMode.title }}>
                <CardMedia
                  component="img"
                  sx={{ width: "26%" }}
                  image={`https://image.tmdb.org/t/p/w342/${movie.backdrop_path}`}
                  alt={movie.title || movie.name}
                />
                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <CardContent sx={{ flex: "1 0 auto" }}>
                    <Typography variant="subtitle1" noWrap>
                      {movie.title || movie.name}
                    </Typography>
                    <Typography variant="subtitle2" sx={{ color: themeDarkMode.textColor }}>
                      {movie.release_date || movie.first_air_date}
                    </Typography>
                  </CardContent>
                </Box>
              </Card>
            </Link>
          </ListItem>
        ))}
      </List>
      <Button
        sx={{
          backgroundColor: themeDarkMode.backgroundColor,
          color: themeDarkMode.title,
          border: "none",
          width: "80%",
          borderRadius: "1rem",
        }}
        variant="outlined">
        See more
      </Button>
    </>
  );
};

export default SidebarRight;
