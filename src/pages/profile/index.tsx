import React from "react";
import { Box, Grid, Typography, Button, Avatar } from "@mui/material";

import Sidebar from "../../components/sidebar";
import { themeDarkMode } from "../../themes/ThemeProvider";
import { TextFieldCustom } from "../../components/TextField";
import GirlBackground from "../../assets/images/girl.png";

const Profile = () => {
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
      <Box sx={{ width: "100%", overflowX: "hidden", overflowY: "scroll", padding: 2, marginTop: 1, px: 3, pb: 6 }}>
        <Typography gutterBottom variant="h3" sx={{ pb: 0.75, borderBottom: `1px solid ${themeDarkMode.title}` }}>
          Account settings
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography variant="h5" component="h1" my={3} align="left" sx={{ fontWeight: "bold" }}>
              User Information
            </Typography>
            <Typography>
              Here you can edit public information about yourself. <br />
              If you signed in with Google or Facebook, you can't change your email and password.
            </Typography>
            <Typography variant="h5" component="h1" my={3} align="left" sx={{ fontWeight: "bold" }}>
              Email
            </Typography>
            <TextFieldCustom id="email" name="email" placeholder="Your email here" />
            <Typography variant="h5" component="h1" my={3} align="left" sx={{ fontWeight: "bold" }}>
              Name
            </Typography>
            <TextFieldCustom id="name" name="name" placeholder="Your name here" />
            <Typography variant="h5" component="h1" my={3} align="left" sx={{ fontWeight: "bold" }}>
              Your email is verified.
            </Typography>
            <Typography variant="h5" component="h1" my={3} align="left" sx={{ fontWeight: "bold" }}>
              Change password
            </Typography>
            <Grid container spacing={2} sx={{ alignItems: "center" }}>
              <Grid item xs={9}>
                <TextFieldCustom id="name" name="name" placeholder="Your name here" type="password" />
              </Grid>
              <Grid item xs={3} sx={{ textAlign: "center" }}>
                <Button variant="outlined">Update</Button>
              </Grid>
              <Grid item xs={12} sx={{ textAlign: "center", mt: 3 }}>
                <Button variant="contained" color="error">
                  Delete account
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h5" component="h1" my={3} align="left" sx={{ fontWeight: "bold" }}>
              Profie photo
            </Typography>
            <Box
              sx={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", gap: 5 }}>
              <Avatar alt="Remy Sharp" src={GirlBackground} sx={{ width: 300, height: 300 }} />
              <Button variant="contained">Upload avatar here</Button>
            </Box>
            <Typography variant="h5" component="h1" my={3} align="center" sx={{ fontWeight: "bold" }}>
              Thanh tuan pham
            </Typography>
            <Typography variant="h5" component="h1" my={3} align="center">
              Work for something because it is good, not just because it stands a chance to succeed.
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Profile;
