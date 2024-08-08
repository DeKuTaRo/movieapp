import React, { RefObject } from "react";
import { Box, Typography, CardContent } from "@mui/material";
import { Swiper as SwiperClass } from "swiper";
// Import Swiper styles
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/mousewheel";
import { MovieDataType, GenresData } from "../../../assets/data";
import IconButton from "@mui/material/IconButton";
import { themeDarkMode } from "../../../themes/ThemeProvider";
import { StarIcon, ArrowPrevIcon, ArrowNextIcon, PlayArrowIcon } from "../../../components/icons/index";

const ButtonNavPoster = ({
  swiperRef,
  isLastSlide,
  isFirstSlide,
}: {
  swiperRef: RefObject<SwiperClass>;
  isLastSlide: boolean;
  isFirstSlide: boolean;
}) => {
  const handlePrev = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (swiperRef.current && !isFirstSlide) {
      swiperRef.current.slidePrev();
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (swiperRef.current && !isLastSlide) {
      swiperRef.current.slideNext();
    }
  };
  return (
    <>
      <IconButton
        onClick={handlePrev}
        aria-label="previous slide"
        sx={{ position: "absolute", top: "2%", left: "2%", backgroundColor: "transparent", zIndex: 10 }}>
        <ArrowPrevIcon color={isFirstSlide ? themeDarkMode.textColor : themeDarkMode.title} />
      </IconButton>
      <IconButton
        onClick={handleNext}
        color="secondary"
        aria-label="next slide"
        sx={{
          position: "absolute",
          top: "2%",
          left: "6.5%",
          backgroundColor: "transparent",
          zIndex: 10,
        }}>
        <ArrowNextIcon color={isLastSlide ? themeDarkMode.textColor : themeDarkMode.title} />
      </IconButton>
    </>
  );
};

const PosterCardContent = ({
  swiperRef,
  movie,
  isLastSlide,
  isFirstSlide,
  genresMovie,
}: {
  swiperRef: RefObject<SwiperClass>;
  movie: MovieDataType;
  isLastSlide: boolean;
  isFirstSlide: boolean;
  genresMovie: GenresData[];
}) => {
  return (
    <>
      <CardContent
        sx={{
          padding: "0px !important",
          position: "relative",
          display: "inline-block",
          width: "100%",
          "&:hover .play-button": {
            display: "block",
          },
        }}>
        <Box
          sx={{
            content: `'""'`,
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "linear-gradient(270deg,transparent,rgba(0,0,0,.85) 65%)",
            borderRadius: "0.5rem",
            pointerEvents: "none",
          }}
        />
        <img
          src={`https://image.tmdb.org/t/p/w1280/${movie.backdrop_path}`}
          alt={movie.title || movie.name}
          style={{ borderRadius: "0.5rem", width: "100%", height: "400px", display: "block" }}
        />
        <Box
          sx={{
            position: "absolute",
            top: "15%",
            left: "5%",
            maxWidth: "40%",
            display: "flex",
            flexDirection: "column",
            gap: 1.5,
          }}>
          <Typography
            variant="h4"
            noWrap
            sx={{
              fontWeight: "bold",
              color: themeDarkMode.textPrimary,
            }}>
            {movie.title || movie.name}
          </Typography>
          <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
            {movie.original_title || movie.original_name}
          </Typography>
          <Typography variant="subtitle1" sx={{ color: themeDarkMode.textColor }}>
            {movie.release_date ? `Release date : ${movie.release_date}` : `First air date: ${movie.first_air_date}`}
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 2,
            }}>
            {movie.genre_ids &&
              movie.genre_ids.map((id: number) =>
                genresMovie.map(
                  (genres) =>
                    genres.id === id && (
                      <Typography
                        key={id}
                        sx={{
                          backgroundColor: "transparent",
                          color: themeDarkMode.title,
                          padding: "0.5rem",
                          borderRadius: "1rem",
                          border: `1px solid ${themeDarkMode.textColor}`,
                        }}>
                        {genres.name}
                      </Typography>
                    )
                )
              )}
          </Box>
          <Typography
            variant="subtitle1"
            sx={{
              overflow: "hidden",
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
              color: themeDarkMode.textColor,
            }}>
            {movie.overview}
          </Typography>
        </Box>
        <Typography
          variant="body1"
          component="span"
          sx={{
            position: "absolute",
            top: "6%",
            right: "2%",
            padding: "0.125rem 0.625rem",
            backgroundColor: themeDarkMode.textPrimary,
            borderRadius: "1rem",
            display: "flex",
            alignItems: "center",
          }}>
          <Typography sx={{ fontWeight: "bold", fontSize: "0.75rem", marginRight: 0.5 }}>
            {movie.vote_average && parseFloat(movie.vote_average).toFixed(1)}
          </Typography>
          <StarIcon width="12" height="12" />
        </Typography>
        <IconButton
          className="play-button"
          aria-label="play-button"
          sx={{
            position: "absolute",
            top: "41%",
            left: "48%",
            color: themeDarkMode.title,
            display: "none",
            transition: "all 0.3s",
            p: 2,
            borderRadius: "9999px",
          }}>
          <PlayArrowIcon includeBackgroundColor={true} />
        </IconButton>
        <ButtonNavPoster swiperRef={swiperRef} isLastSlide={isLastSlide} isFirstSlide={isFirstSlide} />
      </CardContent>
    </>
  );
};
export default PosterCardContent;
