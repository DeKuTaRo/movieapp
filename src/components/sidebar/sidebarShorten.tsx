import { Box, Link } from "@mui/material";
import { useLocation } from "react-router-dom";
import { themeDarkMode } from "../../themes/ThemeProvider";
import { HomeIcon, ExploreIcon, SearchIcon, BookmarkedIcon, HistoryIcon, ProfileIcon, LoginIcon } from "../icons";

const navLinks = [
  {
    name: "Home",
    icon: <HomeIcon />,
    activeIcon: <HomeIcon color={themeDarkMode.textColorItemActiveSidebar} />,
    link: "/",
  },
  {
    name: "Explore",
    icon: <ExploreIcon />,
    activeIcon: <ExploreIcon color={themeDarkMode.textColorItemActiveSidebar} />,
    link: "/explore",
  },
  {
    name: "Search",
    icon: <SearchIcon />,
    activeIcon: <SearchIcon color={themeDarkMode.textColorItemActiveSidebar} />,
    link: "/search",
  },
  {
    name: "Bookmarked",
    icon: <BookmarkedIcon />,
    activeIcon: <BookmarkedIcon color={themeDarkMode.textColorItemActiveSidebar} />,
    link: "/movies",
  },
  {
    name: "History",
    icon: <HistoryIcon />,
    activeIcon: <HistoryIcon color={themeDarkMode.textColorItemActiveSidebar} />,
    link: "/tv-series",
  },
  {
    name: "Profile",
    icon: <ProfileIcon />,
    activeIcon: <ProfileIcon color={themeDarkMode.textColorItemActiveSidebar} />,
    link: "/bookmarks",
  },
  {
    name: "Login",
    icon: <LoginIcon />,
    activeIcon: <LoginIcon color={themeDarkMode.textColorItemActiveSidebar} />,
    link: "/login",
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
              {location.pathname === item.link ? item.activeIcon : item.icon}
            </Box>
          </Link>
        ))}
      </Box>
    </Box>
  );
};

export default SidebarShorten;
