import * as React from "react";
import { Button, CssBaseline, TextField, Link, Grid, Box, Typography, Container, InputAdornment } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CardCover from "@mui/joy/CardCover";
import { GoogleIcon, FacebookIcon, EmailIcon, PasswordIcon } from "../../components/icons";
import { themeDarkMode } from "../../themes/ThemeProvider";
import IconButton from "@mui/material/IconButton";

const defaultTheme = createTheme();
const LoginVideo = require("../../assets/videos/endgame.mp4");

const Login = () => {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="md">
        <CssBaseline />
        <CardCover>
          <video autoPlay loop muted>
            <source src={LoginVideo} type="video/mp4" />
          </video>
        </CardCover>
        <Box
          sx={{
            marginTop: 14,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 5,
            position: "relative",
          }}>
          <Typography
            variant="h3"
            sx={{ color: themeDarkMode.textPrimary, fontWeight: "bold", textShadow: "2px 2px 4px rgba(0,0,0,0.5)" }}>
            Sign in to Moonlight
          </Typography>
          <Box sx={{ display: "flex", gap: 3 }}>
            <IconButton aria-label="delete" sx={{ backgroundColor: themeDarkMode.title, padding: 1, borderRadius: 10 }}>
              <GoogleIcon width={"40"} height={"40"} />
            </IconButton>
            <IconButton aria-label="delete" sx={{ backgroundColor: themeDarkMode.title, padding: 1, borderRadius: 10 }}>
              <FacebookIcon width={"40"} height={"40"} />
            </IconButton>
          </Box>
          <Box component="form" noValidate sx={{ mt: 1, textAlign: "center" }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              name="email"
              placeholder="Email"
              autoComplete="email"
              autoFocus
              sx={{
                "& .MuiOutlinedInput-root": {
                  backgroundColor: themeDarkMode.backgroundSidebar,
                  borderRadius: 10,
                  padding: 1.5,
                  "& fieldset": {
                    borderColor: "transparent",
                  },
                  "&:hover fieldset": {
                    borderColor: "transparent",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "transparent",
                  },
                },
                "& .MuiInputBase-input": {
                  color: themeDarkMode.title,
                },
                "& .MuiInputBase-input::placeholder": {
                  color: themeDarkMode.title,
                  opacity: 1,
                },
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton>
                      <EmailIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              type="password"
              placeholder="Password"
              id="password"
              autoComplete="current-password"
              sx={{
                "& .MuiOutlinedInput-root": {
                  backgroundColor: themeDarkMode.backgroundSidebar,
                  borderRadius: 10,
                  padding: 1.5,
                  "& fieldset": {
                    borderColor: "transparent",
                  },
                  "&:hover fieldset": {
                    borderColor: "transparent",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "transparent",
                  },
                },
                "& .MuiInputBase-input": {
                  color: themeDarkMode.title,
                },
                "& .MuiInputBase-input::placeholder": {
                  color: themeDarkMode.title,
                  opacity: 1,
                },
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton>
                      <PasswordIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button
              type="submit"
              variant="contained"
              sx={{ mt: 3, mb: 2, p: 2, width: "30%", borderRadius: 10, backgroundColor: themeDarkMode.textPrimary }}>
              Sign In
            </Button>
            <Grid container>
              <Grid item xs={6}>
                <Link
                  href="#"
                  variant="h6"
                  color={themeDarkMode.title}
                  underline="hover"
                  sx={{
                    "&:hover": {
                      color: themeDarkMode.textPrimary,
                      opacity: 0.7,
                    },
                  }}>
                  Forgot password?
                </Link>
              </Grid>
              <Grid item xs={6}>
                <Link
                  href="#"
                  variant="h6"
                  color={themeDarkMode.title}
                  underline="hover"
                  sx={{
                    "&:hover": {
                      color: themeDarkMode.textPrimary,
                      opacity: 0.7,
                    },
                  }}>
                  Don't have an account? Sign Up
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};
export default Login;
