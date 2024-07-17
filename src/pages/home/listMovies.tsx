import { Box, Paper, Typography, Card, CardContent } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import EmptyBackdrop from "../../assets/images/emptyBackdrop.jpg";
// Import Swiper styles
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/mousewheel";
import { MovieDataType, GenresData } from "../../assets/data";

const ListMovies = ({
  title,
  listMovies,
  type,
  genresMovie,
}: {
  title: string;
  listMovies: MovieDataType[];
  type: string;
  genresMovie: GenresData[];
}) => {
  if (type === "poster") {
    return (
      <>
        <h1>Top Rated</h1>
        <Swiper
          modules={[Autoplay]}
          spaceBetween={50}
          slidesPerView={1}
          loop={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}>
          {listMovies.map((movie, index) => {
            return (
              <SwiperSlide key={index}>
                <Paper elevation={0} sx={{ backgroundColor: "transparent" }}>
                  <Card variant="outlined" sx={{ bgcolor: "transparent", color: "#E0E0E0", my: 3, border: "none" }}>
                    <CardContent
                      sx={{
                        padding: 0,
                        position: "relative",
                        display: "inline-block",
                      }}>
                      <Box
                        sx={{
                          content: `'""'`,
                          position: "absolute",
                          top: 0,
                          left: 0,
                          width: "100%",
                          height: "100%",
                          backgroundImage: "linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.7))",
                        }}></Box>
                      <img
                        src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
                        alt={movie.title}
                        style={{ borderRadius: "8px", width: "100%", display: "block" }}
                      />
                      <Box
                        sx={{
                          position: "absolute",
                          top: "50%",
                          left: "5%",
                          maxWidth: "65%",
                        }}>
                        <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                          {movie.title}
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{
                            fontSize: "20px",
                            fontWeight: "600",
                            overflow: "hidden",
                            display: "-webkit-box",
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: "vertical",
                            color: "red",
                          }}>
                          "{movie.overview}
                        </Typography>
                        <Typography variant="h6" sx={{ color: "red", fontSize: "20px", fontWeight: "600" }}>
                          Release date : {movie.release_date}
                        </Typography>
                        <Box
                          sx={{
                            display: "flex",
                            flexWrap: "wrap",
                            gap: 2,
                          }}>
                          {movie.genre_ids.map((id: number, index) =>
                            genresMovie.map(
                              (genres) =>
                                genres.id === id && (
                                  <Typography
                                    key={index}
                                    sx={{ backgroundColor: "gray", padding: "0.5rem", borderRadius: "1rem" }}>
                                    {genres.name}
                                  </Typography>
                                )
                            )
                          )}
                        </Box>
                      </Box>

                      <Typography
                        variant="button"
                        sx={{
                          position: "absolute",
                          top: "10px",
                          right: "10px",
                          padding: "0.5rem",
                          backgroundColor: "blue",
                          borderRadius: "1rem",
                          fontWeight: "bold",
                          fontSize: "20px",
                        }}>
                        {parseFloat(movie.vote_average).toFixed(1)}
                      </Typography>
                    </CardContent>
                  </Card>
                </Paper>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </>
    );
  } else {
    return (
      <>
        <h1>{title}</h1>
        <Swiper spaceBetween={20} slidesPerView={4} loop={true}>
          {listMovies.map((movie, index) => {
            return (
              <SwiperSlide key={index}>
                <Paper elevation={0} sx={{ backgroundColor: "transparent" }}>
                  <Card variant="outlined" sx={{ bgcolor: "transparent", color: "#E0E0E0", my: 3, border: "none" }}>
                    <CardContent sx={{ p: 0, position: "relative" }}>
                      <img
                        src={
                          movie.backdrop_path ? `https://image.tmdb.org/t/p/w200/${movie.backdrop_path}` : EmptyBackdrop
                        }
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
              </SwiperSlide>
            );
          })}
        </Swiper>
      </>
    );
  }
};
export default ListMovies;
