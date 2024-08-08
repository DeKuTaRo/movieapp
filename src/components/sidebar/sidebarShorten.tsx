import { Box, Link, Avatar } from "@mui/material";
import { useLocation } from "react-router-dom";
import { themeDarkMode } from "../../themes/ThemeProvider";
import { HomeIcon, ExploreIcon, SearchIcon, BookmarkedIcon, HistoryIcon, ProfileIcon, LoginIcon } from "../icons";
import { GirlBackground, Logo } from "../../assets";
import { useAppSelector } from "../../hooks";
import toast from "react-hot-toast";

const customSizeIcon = {
  width: "25",
  height: "25",
};

const navLinks = [
  {
    name: "Home",
    icon: <HomeIcon width={customSizeIcon.width} height={customSizeIcon.height} />,
    activeIcon: (
      <HomeIcon
        color={themeDarkMode.textColorItemActiveSidebar}
        width={customSizeIcon.width}
        height={customSizeIcon.height}
      />
    ),
    link: "/",
  },
  {
    name: "Explore",
    icon: <ExploreIcon width={customSizeIcon.width} height={customSizeIcon.height} />,
    activeIcon: (
      <ExploreIcon
        color={themeDarkMode.textColorItemActiveSidebar}
        width={customSizeIcon.width}
        height={customSizeIcon.height}
      />
    ),
    link: "/explore",
  },
  {
    name: "Search",
    icon: <SearchIcon width={customSizeIcon.width} height={customSizeIcon.height} />,
    activeIcon: (
      <SearchIcon
        color={themeDarkMode.textColorItemActiveSidebar}
        width={customSizeIcon.width}
        height={customSizeIcon.height}
      />
    ),
    link: "/search",
  },
  {
    name: "Bookmarked",
    icon: <BookmarkedIcon width={customSizeIcon.width} height={customSizeIcon.height} />,
    activeIcon: (
      <BookmarkedIcon
        color={themeDarkMode.textColorItemActiveSidebar}
        width={customSizeIcon.width}
        height={customSizeIcon.height}
      />
    ),
    link: "/bookmarked",
  },
  {
    name: "History",
    icon: <HistoryIcon width={customSizeIcon.width} height={customSizeIcon.height} />,
    activeIcon: (
      <HistoryIcon
        color={themeDarkMode.textColorItemActiveSidebar}
        width={customSizeIcon.width}
        height={customSizeIcon.height}
      />
    ),
    link: "/history",
  },
  {
    name: "Profile",
    icon: <ProfileIcon width={customSizeIcon.width} height={customSizeIcon.height} />,
    activeIcon: (
      <ProfileIcon
        color={themeDarkMode.textColorItemActiveSidebar}
        width={customSizeIcon.width}
        height={customSizeIcon.height}
      />
    ),
    link: "/profile",
  },
  {
    name: "Login",
    icon: <LoginIcon width={customSizeIcon.width} height={customSizeIcon.height} />,
    activeIcon: (
      <LoginIcon
        color={themeDarkMode.textColorItemActiveSidebar}
        width={customSizeIcon.width}
        height={customSizeIcon.height}
      />
    ),
    link: "/login",
  },
];
const SidebarShorten = () => {
  const location = useLocation();
  const currentUser = useAppSelector((state) => state.auth.user);

  const showToastRequireLogin = (event: React.MouseEvent<HTMLAnchorElement>, link: string) => {
    if (!currentUser && ["/bookmarked", "/history", "/profile"].includes(link)) {
      event.preventDefault();
      toast.error("You must log in to use this feature.");
    } else if (currentUser && link === "/history") {
      event.preventDefault();
      toast("This feature is updating", {
        icon: "🚧",
        style: {
          background: themeDarkMode.textPrimary,
          color: themeDarkMode.title,
        },
      });
    } else if (currentUser && link === "/login") {
      event.preventDefault();
      toast("You have already logged in", {
        icon: "🔒",
        style: {
          background: themeDarkMode.starRatingColor,
          color: themeDarkMode.backgroundColor,
        },
      });
    }
  };
  return (
    <Box
      sx={{
        backgroundColor: themeDarkMode.backgroundSidebar,
        px: 2,
        py: 6,
        borderRadius: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        width: {
          sm: "100%",
          lg: 40,
        },
      }}>
      <Link href="/" underline="none">
        <Avatar alt="Logo" src={Logo} sx={{ width: 25, height: 25 }} />
      </Link>
      <Box sx={{ gap: 3, display: "flex", flexDirection: "column" }}>
        {navLinks.map((item) => (
          <Link
            key={item.name}
            href={item.link}
            onClick={(event) => showToastRequireLogin(event, item.link)}
            style={{ textDecoration: "none" }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                textDecoration: "none",
              }}>
              {location.pathname === item.link ? item.activeIcon : item.icon}
            </Box>
          </Link>
        ))}
      </Box>
      <Link href="/profile" underline="none">
        <Avatar alt="" src={GirlBackground} sx={{ width: 25, height: 25 }} />
      </Link>
    </Box>
  );
};

export default SidebarShorten;
