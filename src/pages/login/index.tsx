import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CssBaseline, Container, Box, Typography } from "@mui/material";
import CardCover from "@mui/joy/CardCover";
import { themeDarkMode } from "../../themes/ThemeProvider";
import { GoogleIcon, FacebookIcon } from "../../components/icons";
import IconButton from "@mui/material/IconButton";
import SignUpForm from "./SignUpForm";
import SignInForm from "./SignInForm";
import { auth, googleProvider, fbProvider } from "../../firebase";
import { signInWithPopup } from "firebase/auth";
import toast from "react-hot-toast";
import { convertErrorCodeToMessage } from "../../utils";
const LoginVideo = require("../../assets/videos/endgame.mp4");

const Login = () => {
  const [isSignUp, setIsSignUp] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleLoginByGoogleAccount = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      toast.success("Welcome to my app! Enjoy and have fun!");
      navigate("/");
    } catch (err: any) {
      toast.error(convertErrorCodeToMessage(err.code));
    }
  };

  const handleLoginByFBAccount = async () => {
    try {
      await signInWithPopup(auth, fbProvider);
      toast.success("Welcome to my app! Enjoy and have fun!");
      navigate("/");
    } catch (err: any) {
      toast.error(convertErrorCodeToMessage(err.code));
    }
  };

  return (
    <Container component="main" maxWidth="md" sx={{ overflowY: "scroll" }}>
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
          {isSignUp && "Sign up to Moonlight"}
          {!isSignUp && "Sign in to Moonlight"}
        </Typography>
        {!isSignUp && (
          <Box sx={{ display: "flex", gap: 3 }}>
            <IconButton
              aria-label="delete"
              sx={{ backgroundColor: themeDarkMode.title, padding: 1, borderRadius: 10 }}
              onClick={handleLoginByGoogleAccount}>
              <GoogleIcon width={"40"} height={"40"} />
            </IconButton>
            <IconButton
              aria-label="delete"
              sx={{ backgroundColor: themeDarkMode.title, padding: 1, borderRadius: 10 }}
              onClick={handleLoginByFBAccount}>
              <FacebookIcon width={"40"} height={"40"} />
            </IconButton>
          </Box>
        )}
        {isSignUp && <SignUpForm setIsSignUp={setIsSignUp} />}
        {!isSignUp && <SignInForm setIsSignUp={setIsSignUp} />}
      </Box>
    </Container>
  );
};
export default Login;
