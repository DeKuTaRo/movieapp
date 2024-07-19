import React, { useState, useCallback, useRef, RefObject } from "react";
import { Box, Paper, Typography, Card, CardContent, Link } from "@mui/material";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { Swiper as SwiperClass } from "swiper";
import { Autoplay } from "swiper/modules";
import EmptyBackdrop from "../../assets/images/emptyBackdrop.jpg";
// Import Swiper styles
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/mousewheel";
import { MovieDataType, GenresData } from "../../../assets/data";
import IconButton from "@mui/material/IconButton";
import { Star, PlayCircleFilledWhiteOutlined, KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import { themeDarkMode } from "../../../themes/ThemeProvider";

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
        <KeyboardArrowLeft sx={{ color: isFirstSlide ? themeDarkMode.textColor : themeDarkMode.title }} />
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
        <KeyboardArrowRight sx={{ color: isLastSlide ? themeDarkMode.textColor : themeDarkMode.title }} />
      </IconButton>
    </>
  );
};

const CustomSwiper = ({
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
  const swiperRef = useRef<SwiperClass>(null);
  const [isLastSlide, setIsLastSlide] = useState(false);
  const [isFirstSlide, setIsFirstSlide] = useState(true);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const handleSlideChange = useCallback((swiper: SwiperClass) => {
    setIsFirstSlide(swiper.isBeginning);
    if (swiper.isEnd) {
      setIsLastSlide(true);

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        swiper.slideTo(0);
        setIsLastSlide(false);
        setIsFirstSlide(true);
      }, 2000);
    } else {
      setIsLastSlide(false);
    }
  }, []);

  return (
    <>
      <Typography variant="h5" component="h1" mb={3} align="left" sx={{ width: "100%", fontWeight: "bold" }}>
        {title}
      </Typography>
      <Swiper
        modules={[Autoplay]}
        spaceBetween={50}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        onSlideChange={(swiper: SwiperClass) => handleSlideChange(swiper)}
        onSwiper={(swiper: SwiperClass) => {
          swiperRef.current = swiper;
        }}>
        {listMovies.map((movie, index) => {
          return (
            <SwiperSlide key={index}>
              <Link href={`/movie/${movie.id}`} underline="none">
                <Paper elevation={0} sx={{ backgroundColor: "transparent" }}>
                  <Card variant="outlined" sx={{ bgcolor: "transparent", color: themeDarkMode.title, border: "none" }}>
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
                          {movie.release_date
                            ? `Release date : ${movie.release_date}`
                            : `First air date: ${movie.first_air_date}`}
                        </Typography>
                        <Box
                          sx={{
                            display: "flex",
                            flexWrap: "wrap",
                            gap: 2,
                          }}>
                          {movie.genre_ids.map((id: number) =>
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
                        <Typography sx={{ fontWeight: "bold", fontSize: "1rem", marginRight: 1 }}>
                          {parseFloat(movie.vote_average).toFixed(1)}
                        </Typography>
                        <Star sx={{ width: "1rem", height: "1rem" }} />
                      </Typography>
                      <IconButton
                        className="play-button"
                        aria-label="delete"
                        sx={{
                          position: "absolute",
                          top: "41%",
                          left: "48%",
                          color: "white",
                          display: "none",
                          transitionDuration: "1s",
                          transitionTimingFunction: "cubic-bezier(.4,0,.2,1)",
                        }}>
                        <PlayCircleFilledWhiteOutlined
                          sx={{
                            backgroundImage: "linear-gradient(to bottom right,#5179ff,#c353b4)",
                            padding: 2,
                            borderRadius: "inherit",
                          }}
                        />
                      </IconButton>

                      <ButtonNavPoster swiperRef={swiperRef} isLastSlide={isLastSlide} isFirstSlide={isFirstSlide} />
                    </CardContent>
                  </Card>
                </Paper>
              </Link>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
};
export default CustomSwiper;
