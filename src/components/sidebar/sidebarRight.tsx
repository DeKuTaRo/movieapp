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
import { SearchIcon } from "../icons";
import { GenresData, MovieDataType } from "../../assets/data";
import { themeDarkMode } from "../../themes/ThemeProvider";
import { Star } from "@mui/icons-material";
import CustomSkeleton from "../Skeleton";

const SidebarRight = ({
  isLoading,
  genres,
  typeFilms,
  movieTrending,
}: {
  isLoading: boolean;
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
              <SearchIcon />
            </InputAdornment>
          }
        />
      </Paper>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 1.5,
          height: "120px",
          overflowY: "scroll",
        }}
        px={2}>
        {(isLoading ? Array.from(new Array(12)) : genres).map((item, index) =>
          item ? (
            <Typography
              key={item.id}
              variant="body2"
              component="h1"
              sx={{
                backgroundColor: themeDarkMode.backgroundColor,
                padding: "0.75rem 1rem",
                borderRadius: "1rem",
              }}>
              {item.name}
            </Typography>
          ) : (
            <CustomSkeleton keyItem={index} width={57} height={36} />
          )
        )}
      </Box>
      <Typography variant="h5" component="h1" mb={1} align="left" sx={{ width: "100%", fontWeight: "bold" }}>
        {isLoading ? <CustomSkeleton width={152} height={60} /> : "Trending"}
      </Typography>

      {isLoading ? (
        Array.from({ length: 2 }).map((_, index) => (
          <CustomSkeleton keyItem={index} variant="rectangular" width={265} height={127} />
        ))
      ) : (
        <List>
          {movieTrending.slice(0, 3).map((movie) => (
            <ListItem key={movie.id}>
              <Link href={`${typeFilms === 0 ? "/movie/" : "/tv/"}${movie.id}`} underline="none">
                <Card
                  sx={{
                    display: "flex",
                    backgroundColor: "transparent",
                    color: themeDarkMode.title,
                    "&:hover": {
                      opacity: "0.8",
                    },
                  }}>
                  <CardMedia
                    component="img"
                    sx={{ width: "26%" }}
                    image={`https://image.tmdb.org/t/p/w342/${movie.backdrop_path}`}
                    alt={movie.title || movie.name}
                  />

                  <CardContent sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                    <Typography variant="subtitle1" noWrap>
                      {movie.title || movie.name}
                    </Typography>
                    <Typography variant="subtitle2" sx={{ color: themeDarkMode.textColor }}>
                      {movie.release_date || movie.first_air_date}
                    </Typography>
                    <Typography
                      variant="body1"
                      component="span"
                      sx={{
                        padding: "0.125rem 0.625rem",
                        backgroundColor: themeDarkMode.textPrimary,
                        borderRadius: "0.5rem",
                        display: "flex",
                        alignItems: "center",
                        width: "fit-content",
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
                      <Star sx={{ width: "0.75rem", height: "0.75rem" }} />
                    </Typography>
                  </CardContent>
                </Card>
              </Link>
            </ListItem>
          ))}
        </List>
      )}
      <Button
        sx={{
          backgroundColor: themeDarkMode.backgroundColor,
          color: themeDarkMode.title,
          border: "none",
          width: "80%",
          borderRadius: "1rem",
        }}
        variant="outlined"
        href="/explore">
        See more
      </Button>
    </>
  );
};

export default SidebarRight;
