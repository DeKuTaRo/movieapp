import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Typography, Grid, Box, List, ListItem, Card, CardContent, CardMedia, Link, ListItemIcon } from "@mui/material";

import {
  IMDBIcon,
  FacebookIcon,
  InstagramIcon,
  TiktokIcon,
  TwitterIcon,
  YoutubeIcon,
  WikiIcon,
} from "../../components/icons/index";
import SidebarShorten from "../../components/sidebar/sidebarShorten";
import CustomSkeleton from "../../components/Skeleton";
import { themeDarkMode } from "../../themes/ThemeProvider";
import { MovieDataType, Gender, ExtenalIDs } from "../../assets/data";
import { headers } from "../../utils";
import axios from "axios";

const PersonDetail = () => {
  const params = useParams();

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [detailsPerson, setDetailsPerson] = useState<MovieDataType>({
    id: "",
    biography: "",
    birthday: "",
    deathday: "",
    gender: 0,
    known_for_department: "",
    place_of_birth: "",
    media_type: "",
    popularity: 0,
  });
  const [externalIDs, setExternalIDs] = useState<ExtenalIDs>({
    id: "",
    imdb_id: "",
    wikidata_id: "",
    facebook_id: "",
    instagram_id: "",
    tiktok_id: "",
    twitter_id: "",
    youtube_id: "",
  });
  const [combinedCastCredits, setCombinedCastCredits] = useState<MovieDataType[]>([]);
  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const [response1, response2, response3] = await Promise.all([
          axios.get(`https://api.themoviedb.org/3/person/${params.id}?language=en-US`, {
            headers,
          }),
          axios.get(`https://api.themoviedb.org/3/person/${params.id}/external_ids`, {
            headers,
          }),
          axios.get(`https://api.themoviedb.org/3/person/${params.id}/combined_credits?language=en-US`, {
            headers,
          }),
        ]);

        console.log("res3 = ", response3);
        setDetailsPerson(response1.data);
        setExternalIDs(response2.data);
        setCombinedCastCredits(response3.data.cast);
      } catch (err) {
        console.log("error: ", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDetails();
  }, [params.id]);

  return (
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
      <SidebarShorten />
      <Box
        sx={{
          bgcolor: themeDarkMode.backgroundSidebar,
          p: 2,
          width: "100%",
          overflowY: "scroll",
        }}>
        <Grid container spacing={2}>
          <Grid item xs={12} lg={3}>
            <Card
              sx={{
                mb: 4,
                backgroundColor: themeDarkMode.backgroundColor,
                color: themeDarkMode.title,
                border: `1px solid ${themeDarkMode.title}`,
                borderRadius: "1rem",
              }}>
              <CardContent sx={{ textAlign: "center", position: "relative" }}>
                {isLoading ? (
                  <CustomSkeleton variant="circular" width={120} height={120} marginLeft="auto" marginRight="auto" />
                ) : (
                  <CardMedia
                    component="img"
                    image={`https://image.tmdb.org/t/p/original/${detailsPerson.profile_path}`}
                    alt={detailsPerson.name}
                    sx={{ width: 120, height: 120, borderRadius: "50%", margin: "auto", mb: 2 }}
                  />
                )}
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
                    position: "absolute",
                    top: "2%",
                    right: "2%",
                  }}>
                  <Typography
                    sx={{
                      fontWeight: "bold",
                      fontSize: "10px",
                    }}>
                    {isLoading ? <CustomSkeleton variant="text" width={35} /> : detailsPerson.popularity}
                  </Typography>
                </Typography>
                {isLoading ? (
                  <Box sx={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
                    <CustomSkeleton variant="text" width={80} />
                    <CustomSkeleton variant="text" width={200} />
                  </Box>
                ) : (
                  <>
                    <Typography variant="body2" gutterBottom>
                      {isLoading ? <CustomSkeleton variant="text" width={75} /> : detailsPerson.name}
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      {detailsPerson.place_of_birth}
                    </Typography>
                  </>
                )}
              </CardContent>
            </Card>

            <Card
              sx={{
                backgroundColor: themeDarkMode.backgroundColor,
                color: themeDarkMode.title,
                border: `1px solid ${themeDarkMode.title}`,
                borderRadius: "1rem",
              }}>
              <List sx={{ paddingRight: 1.5 }}>
                {isLoading ? (
                  <Box sx={{ paddingLeft: 1.5 }}>
                    {Array.from({ length: 7 }).map((_, index) => (
                      <CustomSkeleton variant="text" keyItem={index} />
                    ))}
                  </Box>
                ) : (
                  [
                    {
                      icon: <IMDBIcon />,
                      text: `https://www.imdb.com/name/${externalIDs.imdb_id}`,
                      isLink: externalIDs.imdb_id ? true : false,
                    },
                    {
                      icon: <FacebookIcon />,
                      text: `https://www.facebook.com/JohnnyDepp`,
                      isLink: externalIDs.facebook_id ? true : false,
                    },
                    {
                      icon: <InstagramIcon />,
                      text: `https://www.instagram.com/johnnydepp`,
                      isLink: externalIDs.instagram_id ? true : false,
                    },
                    {
                      icon: <TiktokIcon />,
                      text: `https://www.tiktok.com/@johnnydepp`,
                      isLink: externalIDs.tiktok_id ? true : false,
                    },
                    {
                      icon: <TwitterIcon />,
                      text: `https://twitter.com/johnnydepp`,
                      isLink: externalIDs.twitter_id ? true : false,
                    },
                    {
                      icon: <YoutubeIcon />,
                      text: `https://www.youtube.com/channel/johnnydepp`,
                      isLink: externalIDs.youtube_id ? true : false,
                    },
                    {
                      icon: <WikiIcon />,
                      text: `https://www.wikidata.org/wiki/johnnydepp`,
                      isLink: externalIDs.wikidata_id ? true : false,
                    },
                  ].map(
                    (item, index) =>
                      item.isLink && (
                        <ListItem key={index}>
                          <ListItemIcon>{item.icon}</ListItemIcon>
                          <Link
                            href={item.text}
                            target="_blank"
                            rel="noopener noreferrer"
                            underline="none"
                            sx={{ color: themeDarkMode.textPrimary, display: "inline-grid" }}>
                            <Typography noWrap>{item.text}</Typography>
                          </Link>
                        </ListItem>
                      )
                  )
                )}
              </List>
            </Card>
          </Grid>

          <Grid item xs={12} lg={9}>
            <Card
              sx={{
                backgroundColor: themeDarkMode.backgroundColor,
                color: themeDarkMode.title,
                border: `1px solid ${themeDarkMode.title}`,
                borderRadius: "1rem",
              }}>
              <CardContent>
                {isLoading
                  ? Array.from({ length: 7 }).map((_, index) => (
                      <Grid container spacing={2} sx={{ p: 2 }} key={index}>
                        <Grid item sm={3}>
                          <CustomSkeleton variant="text" />
                        </Grid>
                        <Grid item sm={9}>
                          {index === 6 ? (
                            <CustomSkeleton variant="rectangular" height={200} marginTop="0.25rem" />
                          ) : (
                            <CustomSkeleton variant="text" />
                          )}
                        </Grid>
                      </Grid>
                    ))
                  : [
                      { label: "Full Name", value: detailsPerson.name },
                      { label: "Know for department", value: detailsPerson.known_for_department },
                      { label: "Gender", value: detailsPerson.gender && Gender[detailsPerson.gender] },
                      { label: "Birthday", value: detailsPerson.birthday },
                      { label: "Deathday", value: detailsPerson.deathday ? detailsPerson.deathday : "..." },
                      { label: "Address", value: detailsPerson.place_of_birth },
                      {
                        label: "Biography",
                        value: detailsPerson.biography,
                      },
                    ].map((item, index) => (
                      <React.Fragment key={index}>
                        <Grid container spacing={2} sx={{ mb: 2 }}>
                          <Grid item xs={12} sm={3}>
                            <Typography variant="body2">{item.label}</Typography>
                          </Grid>
                          <Grid item xs={12} sm={9}>
                            <Typography variant="body2">{item.value}</Typography>
                          </Grid>
                        </Grid>
                        {index < 6 && <Box sx={{ my: 2, borderBottom: 1, borderColor: themeDarkMode.title }} />}
                      </React.Fragment>
                    ))}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      <Box
        sx={{
          backgroundColor: themeDarkMode.backgroundSidebar,
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
            lg: 420,
          },
        }}>
        <Typography variant="h5" component="h1" align="left" sx={{ width: "100%", fontWeight: "bold" }}>
          {isLoading ? <CustomSkeleton width={152} height={60} /> : "Some popular movies"}
        </Typography>

        {isLoading ? (
          Array.from({ length: 5 }).map((_, index) => (
            <CustomSkeleton keyItem={index} variant="rectangular" width={265} height={127} />
          ))
        ) : (
          <List sx={{ overflowY: "scroll", maxWidth: "100%", display: "flex", flexDirection: "column", gap: 1 }}>
            {combinedCastCredits.slice(0, 20).map((credit) => (
              <ListItem key={credit.id}>
                <Link href={`${credit.media_type === "movie" ? `/movie/` : "/tv/"}${credit.id}`} underline="none">
                  <Card
                    sx={{
                      display: "flex",
                      backgroundColor: themeDarkMode.backgroundSidebar,
                      color: "white",
                      width: "100%",
                      cursor: "pointer",
                      "&:hover": {
                        opacity: "0.8",
                      },
                    }}>
                    <CardMedia
                      component="img"
                      sx={{ width: "26%" }}
                      image={`https://image.tmdb.org/t/p/w342${credit.backdrop_path}`}
                      alt={credit.title}
                    />
                    <CardContent sx={{ display: "inline-grid", flexDirection: "column", gap: 1 }}>
                      <Typography variant="subtitle1" noWrap sx={{ display: "index-grid" }}>
                        {credit.title}
                      </Typography>
                      <Typography variant="subtitle2" sx={{ color: themeDarkMode.textColor }}>
                        {credit.release_date}
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
                          {credit.vote_average}
                        </Typography>
                      </Typography>
                    </CardContent>
                  </Card>
                </Link>
              </ListItem>
            ))}
          </List>
        )}
      </Box>
    </Box>
  );
};

export default PersonDetail;
