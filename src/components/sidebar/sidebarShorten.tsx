import { Box, Link } from "@mui/material";
import { useLocation } from "react-router-dom";
import { themeDarkMode } from "../../themes/ThemeProvider";
import { homeIcon, exploreIcon, tvSeriesIcon, bookmarkIcon } from "../../assets";

const navLinks = [
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
    name: "TV Series",
    icon: tvSeriesIcon,
    link: "/tv-series",
  },
  {
    name: "Bookmarks",
    icon: bookmarkIcon,
    link: "/bookmarks",
  },
];
const SidebarShorten = () => {
  const location = useLocation();
  return (
    <Box
      sx={{
        backgroundColor: themeDarkMode.backgroundSidebar,
        padding: 2,
        borderRadius: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: {
          sm: "100%",
          lg: 40,
        },
      }}>
      <Box
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
          gap: 4,
        }}>
        {navLinks.map((item) => (
          <Link key={item.name} href={item.link} style={{ textDecoration: "none" }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                color: "white",
                textDecoration: "none",
              }}>
              <img
                src={item.icon}
                alt={item.name}
                style={{
                  width: "18px",
                  filter: `${
                    location.pathname === item.link
                      ? "invert(58%) sepia(14%) saturate(3166%) hue-rotate(215deg) brightness(91%) contrast(87%)"
                      : "invert(84%)"
                  }`,
                }}
              />
            </Box>
          </Link>
        ))}
      </Box>
    </Box>
  );
};

export default SidebarShorten;
