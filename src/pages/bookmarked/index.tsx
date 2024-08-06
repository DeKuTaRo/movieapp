import React, { useEffect, useState, useMemo } from "react";
import { Box, Tabs, Tab, Grid, Typography, Link, Paper, Card, CardContent, Button, Checkbox } from "@mui/material";
import Sidebar from "../../components/sidebar";
import { themeDarkMode } from "../../themes/ThemeProvider";
import { db } from "../../firebase";
import { doc, getDoc, updateDoc, arrayRemove } from "firebase/firestore";
import { useAppSelector } from "../../hooks";
import CustomSkeleton from "../../components/Skeleton";
import { EditIcon, SelectAllIcon, ClearIcon, CancelIcon, BookmarkedIcon, StarIcon } from "../../components/icons";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}>
      {value === index && <Box sx={{ p: 3, mb: 3 }}> {children} </Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

interface Bookmark {
  type: "movie" | "tv";
  id: string;
  title: string;
  poster_path: string;
  vote_average: string;
}

const MovieItem: React.FC<{ movie: Bookmark; isChecked: boolean; onCheckboxChange: () => void }> = ({
  movie,
  isChecked,
  onCheckboxChange,
}) => {
  return (
    <Box
      sx={{
        p: 1,
        m: 1,
        borderRadius: 2,
        fontSize: "0.875rem",
        fontWeight: "700",
      }}>
      <Link href={`${movie.type === "movie" ? "/movie/" : "/tv/"}${movie.id}`} underline="none">
        <Paper elevation={0} sx={{ backgroundColor: "transparent", margin: 0 }}>
          <Card
            variant="outlined"
            sx={{
              bgcolor: "transparent",
              color: themeDarkMode.title,
              border: "none",
              transition: "transform 0.3s ease-in-out",
              "&:hover": {
                transform: "scale(1.05)",
              },
            }}>
            <CardContent sx={{ p: 0, position: "relative", textAlign: "center" }}>
              <img
                src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`}
                alt={movie.title}
                style={{ width: "100%", height: "100%", borderRadius: "8px" }}
              />
              <Typography textAlign={"center"} noWrap>
                {movie.title}
              </Typography>
              <Checkbox
                checked={isChecked}
                onChange={onCheckboxChange}
                inputProps={{
                  "aria-label": `Checkbox bookmarked ${movie.type === "movie" ? "/movie/" : "/tv/"} ${movie.id}`,
                }}
                icon={<BookmarkedIcon />}
                checkedIcon={<BookmarkedIcon color={themeDarkMode.textPrimary} />}
              />
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
                <StarIcon width="12" height="12" />
              </Typography>
            </CardContent>
          </Card>
        </Paper>
      </Link>
    </Box>
  );
};

const BookMarkedList = ({
  bookmarks,
  checkedAllFilms,
  onCheckboxChange,
}: {
  bookmarks: Bookmark[];
  checkedAllFilms: { [key: string]: boolean };
  onCheckboxChange: (id: string) => void;
}) => {
  if (bookmarks.length === 0) {
    return (
      <Typography variant="h4" align="center">
        There is no films available.
      </Typography>
    );
  }
  return (
    <Grid container spacing={1}>
      {bookmarks.map((bookmark) => (
        <Grid item xs={2} key={bookmark.id}>
          <MovieItem
            movie={bookmark}
            isChecked={!!checkedAllFilms[bookmark.id]}
            onCheckboxChange={() => onCheckboxChange(bookmark.id)}
          />
        </Grid>
      ))}
    </Grid>
  );
};

const Bookmarked = () => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [typeFilms, setTypeFilms] = React.useState(0);
  const handleChangeFilmTab = async (event: React.SyntheticEvent, filmTab: number) => {
    setTypeFilms(filmTab);
  };
  const [checkedAllFilms, setCheckedAllFilms] = useState<{ [key: string]: boolean }>({});
  const [isCheckingAllFilms, setIsCheckingAllFilms] = useState<boolean>(false);
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const currentUser = useAppSelector((state) => state.auth.user);

  useEffect(() => {
    const fetchBookmarks = async () => {
      setIsLoading(true);
      try {
        if (currentUser) {
          const userDocRef = doc(db, "users", currentUser.uid);
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists()) {
            const userData = userDoc.data();
            setBookmarks(userData.bookmarks || []);
          } else {
            setBookmarks([]);
          }
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchBookmarks();
  }, [currentUser]);

  const filteredBookmarks = useMemo(() => {
    switch (typeFilms) {
      case 1:
        return bookmarks.filter((bookmark) => bookmark.type === "movie");
      case 2:
        return bookmarks.filter((bookmark) => bookmark.type === "tv");
      default:
        return bookmarks;
    }
  }, [bookmarks, typeFilms]);

  const handleSelectAll = () => {
    const allChecked = filteredBookmarks.every((bookmark) => checkedAllFilms[bookmark.id]);

    if (allChecked) {
      setCheckedAllFilms({});
      setIsCheckingAllFilms(false);
    } else {
      const newCheckedItems = filteredBookmarks.reduce((acc, bookmark) => {
        acc[bookmark.id] = true;
        return acc;
      }, {} as { [key: string]: boolean });
      setCheckedAllFilms(newCheckedItems);
      setIsCheckingAllFilms(true);
    }
  };

  const handleCheckboxChange = (id: string) => {
    setCheckedAllFilms((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleRemoveFilms = async () => {
    if (currentUser) {
      const userRef = doc(db, "users", currentUser.uid);
      const listFilmsRemove = filteredBookmarks.filter((bookmark) => checkedAllFilms[bookmark.id]);
      try {
        setIsLoading(true);
        await updateDoc(userRef, {
          bookmarks: arrayRemove(...listFilmsRemove),
        });
        setCheckedAllFilms({});
      } catch (error) {
        console.error("Error removing checked items: ", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: themeDarkMode.backgroundColor,
        display: "flex",
        flexDirection: {
          xs: "column",
          lg: "row",
        },
        color: themeDarkMode.title,
        overflowY: "hidden",
        height: "100vh",
      }}>
      <Sidebar />
      <Box sx={{ width: "100%", overflowY: "scroll", marginTop: 3, px: 3 }}>
        <Typography variant="h3" gutterBottom>
          My favorite films
        </Typography>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={typeFilms}
            onChange={handleChangeFilmTab}
            aria-label="tab type movies"
            sx={{
              "& .MuiTab-root": { color: themeDarkMode.title },
              "& .Mui-selected": { color: `${themeDarkMode.textPrimary} !important` },
              "& .MuiTabs-indicator": { backgroundColor: themeDarkMode.textPrimary },
            }}>
            <Tab label="All" {...a11yProps(1)} />
            <Tab label="Movie" {...a11yProps(0)} />
            <Tab label="TV Series" {...a11yProps(2)} />
          </Tabs>
        </Box>
        <Box sx={{ position: "absolute", right: "2%", top: "16%" }}>
          {!isEditing && (
            <Button
              variant="text"
              startIcon={<EditIcon />}
              sx={{
                color: themeDarkMode.title,
                transition: "all 0.3s",
                "&:hover": {
                  borderColor: themeDarkMode.textPrimary,
                  color: themeDarkMode.textPrimary,
                },
              }}
              onClick={() => setIsEditing(true)}>
              Edit
            </Button>
          )}
          {isEditing && (
            <Box>
              <Button
                variant="text"
                startIcon={<SelectAllIcon />}
                sx={{
                  color: isCheckingAllFilms ? themeDarkMode.textPrimary : themeDarkMode.title,
                  transition: "all 0.3s",
                  "&:hover": {
                    borderColor: themeDarkMode.textPrimary,
                    color: themeDarkMode.textPrimary,
                  },
                }}
                onClick={handleSelectAll}>
                Select All
              </Button>
              <Button
                variant="text"
                startIcon={<ClearIcon />}
                sx={{
                  color: themeDarkMode.title,
                  transition: "all 0.3s",
                  "&:hover": {
                    borderColor: themeDarkMode.textPrimary,
                    color: themeDarkMode.textPrimary,
                  },
                }}
                onClick={handleRemoveFilms}>
                Clear
              </Button>
              <Button
                variant="text"
                startIcon={<CancelIcon />}
                sx={{
                  color: themeDarkMode.title,
                  transition: "all 0.3s",
                  "&:hover": {
                    borderColor: themeDarkMode.textPrimary,
                    color: themeDarkMode.textPrimary,
                  },
                }}
                onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
            </Box>
          )}
        </Box>
        <CustomTabPanel value={typeFilms} index={0}>
          {isLoading ? (
            <Grid container spacing={1} sx={{ marginLeft: "0.5rem" }}>
              {Array.from({ length: 12 }).map((_, index) => (
                <Grid item xs={2} key={index} sx={{ marginTop: "2rem", marginBottom: "2rem" }}>
                  <CustomSkeleton variant="rounded" width={160} height={240} />
                </Grid>
              ))}
            </Grid>
          ) : (
            <BookMarkedList
              bookmarks={filteredBookmarks}
              checkedAllFilms={checkedAllFilms}
              onCheckboxChange={handleCheckboxChange}
            />
          )}
        </CustomTabPanel>
        <CustomTabPanel value={typeFilms} index={1}>
          <BookMarkedList
            bookmarks={filteredBookmarks}
            checkedAllFilms={checkedAllFilms}
            onCheckboxChange={handleCheckboxChange}
          />
        </CustomTabPanel>
        <CustomTabPanel value={typeFilms} index={2}>
          <BookMarkedList
            bookmarks={filteredBookmarks}
            checkedAllFilms={checkedAllFilms}
            onCheckboxChange={handleCheckboxChange}
          />
        </CustomTabPanel>
      </Box>
    </Box>
  );
};

export default Bookmarked;
