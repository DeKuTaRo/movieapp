import { Box, Hidden, Typography, Paper, InputBase, InputAdornment } from "@mui/material";
import SearchIcon from "../../assets/icons/icon-search.svg";
import { GenresData } from "../../assets/data";
const SidebarRight = ({ genres }: { genres: GenresData[] }) => {
  return (
    <Box
      sx={{
        backgroundColor: "#161d2f",
        padding: 2,
        borderRadius: 2,
        display: "flex",
        flexDirection: {
          xs: "row",
          lg: "column",
        },
        gap: 2,
        alignItems: "center",
        width: {
          sm: "100%",
          lg: 450,
        },
      }}>
      <Paper
        component={"form"}
        sx={{
          display: "flex",
          alignItems: "center",
          borderRadius: "default",
          p: 1,
          backgroundColor: "#10141f",
          border: "none",
        }}>
        <InputBase
          placeholder="Search here ..."
          sx={{
            mx: 1,
            flex: 1,
            color: "white",
            border: "none",
          }}
          // value={search}
          // onChange={handleSearch}
          startAdornment={
            <InputAdornment position="start">
              <img src={SearchIcon} alt="Search icon" width={20} height={20} />
            </InputAdornment>
          }
        />
      </Paper>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 2,
        }}>
        {genres.map((item, index) => {
          return (
            <Typography key={index} sx={{ backgroundColor: "gray", padding: "0.5rem", borderRadius: "1rem" }}>
              {item.name}
            </Typography>
          );
        })}
      </Box>
    </Box>
  );
};

export default SidebarRight;
