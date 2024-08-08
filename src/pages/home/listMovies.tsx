import React, { useState, useCallback, useRef } from "react";
import { Paper, Typography, Card, Link } from "@mui/material";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { Swiper as SwiperClass } from "swiper";
import { Autoplay } from "swiper/modules";
// Import Swiper styles
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/mousewheel";
import { MovieDataType, GenresData } from "../../assets/data";
import IconButton from "@mui/material/IconButton";
import { themeDarkMode } from "../../themes/ThemeProvider";
import PosterCardContent from "./components/PosterCardContent";
import BackdropCardContent from "./components/BackdropCardContent";
import { ArrowPrevIcon, ArrowNextIcon } from "../../components/icons";

const ButtonNavBackdrop: React.FC = () => {
  const swiper = useSwiper();

  return (
    <>
      <IconButton
        onClick={() => swiper.slidePrev()}
        aria-label="previous slide"
        sx={{ position: "absolute", top: "40%", left: "2%", backgroundColor: themeDarkMode.textColor, zIndex: 10 }}>
        <ArrowPrevIcon />
      </IconButton>
      <IconButton
        onClick={() => swiper.slideNext()}
        color="secondary"
        aria-label="next slide"
        sx={{ position: "absolute", top: "40%", right: "27%", backgroundColor: themeDarkMode.textColor, zIndex: 10 }}>
        <ArrowNextIcon />
      </IconButton>
    </>
  );
};

const ListMovies = ({
  isLoading,
  title,
  listMovies,
  type = "lists",
  genresMovie,
  typeFilms,
}: {
  isLoading?: boolean;
  title: string;
  listMovies: MovieDataType[];
  type?: string;
  genresMovie: GenresData[];
  typeFilms: number;
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
      <Typography variant="h5" component="h1" my={3} align="left" sx={{ width: "100%", fontWeight: "bold" }}>
        {title}
      </Typography>
      <Swiper
        modules={type === "poster" ? [Autoplay] : []}
        spaceBetween={type === "poster" ? 50 : 20}
        slidesPerView={type === "poster" ? 1 : 6}
        loop={type === "poster" ? true : true}
        autoplay={
          type === "poster"
            ? {
                delay: 3000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }
            : undefined
        }
        onSlideChange={(swiper: SwiperClass) => handleSlideChange(swiper)}
        onSwiper={(swiper: SwiperClass) => {
          swiperRef.current = swiper;
        }}
        style={
          type !== "poster"
            ? {
                width: window.innerWidth >= 768 ? "calc(100vw - 290px)" : "100%",
                position: "relative",
              }
            : undefined
        }>
        {listMovies.map((movie, index) => {
          return (
            <SwiperSlide key={index} style={type !== "poster" ? { width: "175px" } : undefined}>
              <Link href={`${typeFilms === 0 ? "/movie/" : "/tv/"}${movie.id}`} underline="none">
                <Paper
                  elevation={0}
                  sx={
                    type === "poster"
                      ? { backgroundColor: "transparent" }
                      : { backgroundColor: "transparent", width: "160px" }
                  }>
                  <Card
                    variant="outlined"
                    sx={{
                      bgcolor: "transparent",
                      color: themeDarkMode.title,
                      border: "none",
                      transition: type !== "poster" ? "transform 0.3s ease-in-out" : undefined,
                      "&:hover": {
                        transform: type !== "poster" ? "scale(1.1)" : undefined,
                      },
                    }}>
                    {type === "poster" ? (
                      <PosterCardContent
                        swiperRef={swiperRef}
                        movie={movie}
                        isLastSlide={isLastSlide}
                        isFirstSlide={isFirstSlide}
                        genresMovie={genresMovie}
                      />
                    ) : (
                      <BackdropCardContent movie={movie} />
                    )}
                  </Card>
                </Paper>
              </Link>
            </SwiperSlide>
          );
        })}
        {type !== "poster" && <ButtonNavBackdrop />}
      </Swiper>
    </>
  );
};
export default ListMovies;
