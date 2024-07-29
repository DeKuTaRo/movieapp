import { useLocation } from "react-router-dom";
import { Box, Hidden, Typography, Link } from "@mui/material";
import { themeDarkMode } from "../../themes/ThemeProvider";
import { HomeIcon, ExploreIcon, SearchIcon, BookmarkedIcon, HistoryIcon, ProfileIcon, LoginIcon } from "../icons";

const navLinks = [
  {
    title: "Menu",
    itemLink: [
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
    ],
  },
  {
    title: "Personal",
    itemLink: [
      {
        name: "Bookmarked",
        icon: <BookmarkedIcon />,
        activeIcon: <BookmarkedIcon color={themeDarkMode.textColorItemActiveSidebar} />,
        link: "/bookmarked",
      },
      {
        name: "History",
        icon: <HistoryIcon />,
        activeIcon: <HistoryIcon color={themeDarkMode.textColorItemActiveSidebar} />,
        link: "/history",
      },
    ],
  },
  {
    title: "General",
    itemLink: [
      {
        name: "Profile",
        icon: <ProfileIcon />,
        activeIcon: <ProfileIcon color={themeDarkMode.textColorItemActiveSidebar} />,
        link: "/profile",
      },
      {
        name: "Login",
        icon: <LoginIcon />,
        activeIcon: <LoginIcon color={themeDarkMode.textColorItemActiveSidebar} />,
        link: "/login",
      },
    ],
  },
];

interface SidebarProps {
  page?: string;
}

const Sidebar = ({ page }: SidebarProps) => {
  const { pathname } = useLocation();

  return (
    <Box
      sx={{
        backgroundColor: themeDarkMode.backgroundSidebar,
        padding: 2,
        width: {
          sm: "100%",
          lg: page === "homepage" ? 300 : 235,
        },
      }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: {
            xs: "row",
            lg: "column",
          },
          gap: 4,
          alignItems: {
            xs: "center",
            lg: "start",
          },
          justifyContent: "center",
          marginLeft: "1rem",
        }}>
        <Hidden smDown>
          <Typography variant="h5" component="h1" mt={2}>
            Choubeobeos
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
            }}>
            <Typography variant="h5" component="h1" mb={1}>
              {item.title}
            </Typography>
            <Box sx={{ display: "flex", gap: 3, flexDirection: "column" }}>
              {item.itemLink.map((linkSidebar) => (
                <Link
                  key={linkSidebar.link}
                  href={linkSidebar.link}
                  sx={{
                    textDecoration: "none",
                    "&:hover": {
                      opacity: pathname !== linkSidebar.link ? "0.7" : undefined,
                    },
                  }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 4,
                      paddingLeft: "1rem",
                    }}>
                    {pathname === linkSidebar.link ? linkSidebar.activeIcon : linkSidebar.icon}
                    <Hidden mdDown>
                      <Typography
                        sx={{
                          color: `${
                            pathname === linkSidebar.link
                              ? themeDarkMode.textColorItemActiveSidebar
                              : themeDarkMode.title
                          }`,
                        }}>
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
