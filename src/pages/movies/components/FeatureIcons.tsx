import React, { useEffect, useState } from "react";
import { Box, IconButton } from "@mui/material";
import { HeartIcon, ShareIcon, ThreeDotIcon } from "../../../components/icons";
import { themeDarkMode } from "../../../themes/ThemeProvider";
import { doc, getDoc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { useAppSelector } from "../../../hooks";
import { MovieDataType, BookmarkProps } from "../../../assets/data";
import { db } from "../../../firebase";

interface FeatureIconsProps {
  detailsMovie: MovieDataType;
  id: string;
  title?: string;
  poster_path?: string;
  vote_average?: string;
  isMoviePath: boolean;
}

const FeatureIcons = ({ detailsMovie, id, title, poster_path, vote_average, isMoviePath }: FeatureIconsProps) => {
  const currentUser = useAppSelector((state) => state.auth.user);

  const [isBookmarked, setIsBookmarked] = useState(false);

  const isFilmBookmarked = (bookmarks: BookmarkProps[], currentFilm: MovieDataType): boolean => {
    return bookmarks.some(
      (bookmark) => bookmark.id === currentFilm.id && bookmark.type === (isMoviePath ? "movie" : "tv")
    );
  };

  useEffect(() => {
    // Fetch user's bookmarks when component mounts
    const fetchBookmarks = async () => {
      if (currentUser) {
        const userDocRef = doc(db, "users", currentUser.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          const bookmarks = userDoc.data().bookmarks || [];
          setIsBookmarked(isFilmBookmarked(bookmarks, detailsMovie));
        } else {
          console.log("No such document!");
          setIsBookmarked(false);
        }
      }
    };

    fetchBookmarks();
  }, [db, currentUser, detailsMovie, isMoviePath]);

  const handleAddMoviesToBookmark = async () => {
    if (!currentUser) {
      alert("Please login to use this feature");
    } else {
      try {
        const userRef = doc(db, "users", currentUser.uid);
        const bookmarkData = {
          type: isMoviePath ? "movie" : "tv",
          id: id,
          title: title,
          poster_path: poster_path,
          vote_average: vote_average
        };

        if (isBookmarked) {
          await updateDoc(userRef, {
            bookmarks: arrayRemove(bookmarkData),
          });
        } else {
          await updateDoc(userRef, {
            bookmarks: arrayUnion(bookmarkData),
          });
        }

        setIsBookmarked(!isBookmarked);
        console.log("update successfully ");
      } catch (err) {
        console.log("err update name = ", err);
      }
    }
  };

  return (
    <Box
      sx={{
        position: "absolute",
        top: "6%",
        right: "2%",
        display: "flex",
        gap: 2,
      }}>
      <IconButton
        aria-label="heartIcon"
        sx={{
          border: `3px solid ${themeDarkMode.title}`,
          p: 1.75,
          transition: "all 0.3s",
          color: isBookmarked ? themeDarkMode.textPrimary : themeDarkMode.title,
          borderColor: isBookmarked ? themeDarkMode.textPrimary : themeDarkMode.title,
          "&:hover": {
            borderColor: themeDarkMode.textPrimary,
            color: themeDarkMode.textPrimary,
          },
        }}
        onClick={handleAddMoviesToBookmark}>
        <HeartIcon />
      </IconButton>
      <IconButton
        aria-label="shareIcon"
        sx={{
          border: `3px solid ${themeDarkMode.title}`,
          p: 1.75,
          transition: "all 0.3s",
          color: themeDarkMode.title,
          "&:hover": {
            borderColor: themeDarkMode.textPrimary,
            color: themeDarkMode.textPrimary,
          },
        }}>
        <ShareIcon />
      </IconButton>
      <IconButton
        aria-label="threedotIcon"
        sx={{
          border: `3px solid ${themeDarkMode.title}`,
          p: 1.75,
          transition: "all 0.3s",
          color: themeDarkMode.title,
          "&:hover": {
            borderColor: themeDarkMode.textPrimary,
            color: themeDarkMode.textPrimary,
          },
        }}>
        <ThreeDotIcon />
      </IconButton>
    </Box>
  );
};

export default FeatureIcons;
