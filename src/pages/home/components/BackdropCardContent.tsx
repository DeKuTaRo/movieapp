import React from "react";
import { Typography, CardContent } from "@mui/material";
import EmptyBackdrop from "../../../assets/images/emptyBackdrop.jpg";
// Import Swiper styles
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/mousewheel";
import { MovieDataType } from "../../../assets/data";
import { Star } from "@mui/icons-material";
import { themeDarkMode } from "../../../themes/ThemeProvider";

const BackdropCardContent = ({ movie }: { movie: MovieDataType }) => {
  return (
    <>
      <CardContent
        sx={{
          padding: "0px !important",
          position: "relative",
        }}>
        <img
          src={movie.poster_path ? `https://image.tmdb.org/t/p/w200/${movie.poster_path}` : EmptyBackdrop}
          alt={movie.title || movie.name}
          style={{ width: "100%", height: "100%", borderRadius: "0.5rem" }}
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
            {parseFloat(movie.vote_average).toFixed(1)}
          </Typography>
          <Star sx={{ width: "1rem", height: "1rem" }} />
        </Typography>
      </CardContent>
    </>
  );
};
export default BackdropCardContent;
