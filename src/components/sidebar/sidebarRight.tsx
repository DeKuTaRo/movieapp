import { Box, Hidden, Typography, Paper, InputBase, InputAdornment } from "@mui/material";
import SearchIcon from "../../assets/icons/icon-search.svg";
import { GenresData } from "../../assets/data";
const SidebarRight = ({ genres }: { genres: GenresData[] }) => {
  return (
    <>
      <Paper
        component={"form"}
        sx={{
          display: "flex",
          alignItems: "center",
          p: 1,
          mt: 2,
          backgroundColor: "#10141f",
          width: "85%",
          borderRadius: "0.5rem",
        }}>
        <InputBase
          placeholder="Search here ..."
          sx={{
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
        }}
        px={2}>
        {genres.map((item) => {
          return (
            <Typography
              key={item.id}
              variant="body2"
              component="h1"
              sx={{ backgroundColor: "gray", padding: "0.5rem", borderRadius: "1rem" }}>
              {item.name}
            </Typography>
          );
        })}
      </Box>
    </>
  );
};

export default SidebarRight;
