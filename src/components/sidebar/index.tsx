import { Link, useLocation } from "react-router-dom";
import { Box, Hidden, Typography } from "@mui/material";
import { homeIcon, movieIcon, tvSeriesIcon, bookmarkIcon, exploreIcon } from "../../assets";

const navLinks = [
  {
    title: "Menu",
    itemLink: [
      {
        name: "Home",
        icon: homeIcon,
        link: "/",
      },
      {
        name: "Explore",
        icon: exploreIcon,
        link: "/explore",
      },
      {
        name: "Search",
        icon: exploreIcon,
        link: "/search",
      },
    ],
  },
  {
    title: "General",
    itemLink: [
      {
        name: "Movies",
        icon: movieIcon,
        link: "/movies",
      },
      {
        name: "TV Series",
        icon: tvSeriesIcon,
        link: "/tv-series",
      },
    ],
  },
  {
    title: "Personal",
    itemLink: [
      {
        name: "Bookmarks",
        icon: bookmarkIcon,
        link: "/bookmarks",
      },
      {
        name: "Login",
        icon: bookmarkIcon,
        link: "/login",
      },
    ],
  },
];

const Sidebar = () => {
  const { pathname } = useLocation();

  return (
    <Box
      sx={{
        backgroundColor: "#161d2f",
        padding: 2,
        width: {
          sm: "100%",
          lg: 300,
        },
      }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: {
            xs: "row",
            lg: "column",
          },
          gap: 2,
          alignItems: {
            xs: "center",
            lg: "start",
          },
          justifyContent: "center",
        }}>
        <Hidden smDown>
          <Typography variant="h5" component="h1" mt={2} align="center" sx={{ width: "100%" }}>
            PikaShowApp
          </Typography>
        </Hidden>

        {navLinks.map((item) => (
          <Box
            key={item.title}
            sx={{
              py: {
                xs: "0px",
                lg: "16px",
              },
              display: "flex",
              flexDirection: {
                xs: "row",
                lg: "column",
              },
              gap: 1,
              width: "100%",
              marginLeft: "19px",
            }}>
            <Typography variant="h5" component="h1" mb={1}>
              {item.title}
            </Typography>
            <Box sx={{ display: "flex", gap: 3, flexDirection: "column" }}>
              {item.itemLink.map((linkSidebar) => (
                <Link key={linkSidebar.link} to={linkSidebar.link} style={{ textDecoration: "none" }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 4,
                      color: "white",
                      paddingLeft: "1rem",
                      // backgroundColor: `${pathname === linkSidebar.link ? "#8e71cd" : "#ccc"}`,
                    }}>
                    <img
                      src={linkSidebar.icon}
                      alt={linkSidebar.name}
                      style={{
                        width: "18px",
                        filter: `${
                          pathname === linkSidebar.link
                            ? "invert(58%) sepia(14%) saturate(3166%) hue-rotate(215deg) brightness(91%) contrast(87%)"
                            : "invert(84%)"
                        }`,
                      }}
                    />
                    <Hidden mdDown>
                      <Typography sx={{ color: `${pathname === linkSidebar.link ? "#8e71cd" : "#ccc"}` }}>
                        {linkSidebar.name}
                      </Typography>
                    </Hidden>
                  </Box>
                </Link>
              ))}
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Sidebar;
