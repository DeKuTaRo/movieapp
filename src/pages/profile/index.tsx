import React, { useState, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Grid, Typography, Button, Avatar, IconButton, Modal } from "@mui/material";
import Sidebar from "../../components/sidebar";
import { themeDarkMode } from "../../themes/ThemeProvider";
import { TextFieldCustom } from "../../components/TextField";
import GirlBackground from "../../assets/images/girl.png";
import { useAppSelector } from "../../hooks";
import { auth } from "../../firebase";
import { useFormik } from "formik";
import * as Yup from "yup";
import { CredentialsProps } from "../../assets/data";
import { EmailIcon, FirstNameIcon, LastNameIcon, EditIcon, SendIcon, PasswordIcon } from "../../components/icons";
import {
  updateEmail,
  sendEmailVerification,
  reauthenticateWithCredential,
  EmailAuthProvider,
  signOut,
  updatePassword,
} from "firebase/auth";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: themeDarkMode.backgroundColor,
  color: themeDarkMode.title,
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  textAlign: "center",
};
const validateEmail = (email: string) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

const validatePassword = (password: string) => {
  return password.length < 8;
};

export interface CredentialsUpdateProps {
  firstName: string;
  lastName: string;
  email: string;
  newPassword: string;
  oldPassword: string;
}

const Profile = () => {
  const navigate = useNavigate();
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [isUpdateEmail, setIsUpdateEmail] = useState<boolean>(false);
  const [isUpdateName, setIsUpdateName] = useState<boolean>(false);

  const checkAuthUser = auth.currentUser;
  console.log("checkAuthUser = ", checkAuthUser);
  const currentUser = useAppSelector((state) => state.auth.user);

  const [openModalAuthenticate, setOpenModalAuthenticate] = React.useState(false);
  const handleOpenAuthenticateModal = () => setOpenModalAuthenticate(true);
  const handleClose = () => setOpenModalAuthenticate(false);
  const [defaultUpdateUser, setDefaultUpdateUser] = useState<CredentialsUpdateProps>({
    email: "",
    firstName: "",
    lastName: "",
    newPassword: "",
    oldPassword: "",
  });
  const [emailError, setEmailError] = useState("");
  const [newPasswordError, setNewPasswordError] = useState("");
  const handleUpdateUserDetail = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setDefaultUpdateUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleUpdateEmail = async () => {
    if (!validateEmail(defaultUpdateUser.email)) {
      setEmailError("Please enter a valid email address");
      return;
    }

    console.log("email = ", defaultUpdateUser.email);

    if (checkAuthUser && checkAuthUser.email) {
      try {
        const credential = EmailAuthProvider.credential(checkAuthUser.email, "123456");
        await reauthenticateWithCredential(checkAuthUser, credential);
        await updateEmail(checkAuthUser, defaultUpdateUser.email);
        console.log("update email successfully");
      } catch (err: any) {
        console.log("Error: ", err);
        if (err.code === "auth/requires-recent-login") {
          setEmailError("Please log in again to update your email.");
        } else {
          setEmailError(err.message);
        }
      }
    } else {
      console.log("No user is currently signed in.");
    }
  };

  const handleToggleEmail = () => {
    setIsUpdateEmail((prev) => !prev);
  };
  const handleToggleName = () => {
    setIsUpdateName((prev) => !prev);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Escape") {
      setIsUpdateEmail(false);
    }
  };

  const handleVerifiedEmail = async () => {
    if (checkAuthUser) {
      try {
        await sendEmailVerification(checkAuthUser);
        console.log("Email sent successfully");
      } catch (err) {
        console.log("err = ", err);
      }
    }
  };

  const handleSignOut = async () => {
    signOut(auth)
      .then(() => {
        navigate("/");
        // Sign-out successful.
      })
      .catch((error: any) => {
        console.log("err = ", error);
      });
  };

  const handleCheckValidNewPassword = () => {
    if (validatePassword(defaultUpdateUser.newPassword)) {
      setNewPasswordError("Must be at least 8 characters");
    } else {
      setOpenModalAuthenticate(true);
      setNewPasswordError("");
    }
  };

  const handleChangePassword = async () => {
    if (checkAuthUser && checkAuthUser.email) {
      const credential = EmailAuthProvider.credential(checkAuthUser.email, defaultUpdateUser.oldPassword);
      await reauthenticateWithCredential(checkAuthUser, credential);
      await updatePassword(checkAuthUser, defaultUpdateUser.newPassword)
        .then(() => {
          // Update successful.
          console.log("Update password successfully");
          setOpenModalAuthenticate(false);
          setDefaultUpdateUser((prevState) => ({
            ...prevState,
            newPassword: "",
          }));
        })
        .catch((error: any) => {
          console.log("err = ", error);
          // An error ocurred
          // ...
        });
    }
  };

  return (
    <>
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
              <Typography variant="h5" component="h1" my={3} sx={{ fontWeight: "bold" }}>
                User Information
              </Typography>
              <Typography>
                Here you can edit public information about yourself. <br />
                If you signed in with Google or Facebook, you can't change your email and password.
              </Typography>
              <Typography variant="h5" component="h1" my={3} sx={{ fontWeight: "bold" }}>
                Email
              </Typography>
              <Grid container spacing={1} sx={{ alignItems: "center" }}>
                <Grid item xs={10}>
                  <Typography variant="h6" component="h1" my={3} color={themeDarkMode.textColor}>
                    {currentUser?.email}
                  </Typography>
                </Grid>
                <Grid item xs={2}>
                  {isUpdateEmail ? (
                    <IconButton aria-label="edit-email" onClick={handleUpdateEmail}>
                      <SendIcon />
                    </IconButton>
                  ) : (
                    <IconButton aria-label="edit-email" onClick={handleToggleEmail}>
                      <EditIcon />
                    </IconButton>
                  )}
                </Grid>

                {isUpdateEmail && (
                  <Grid item xs={8}>
                    <TextFieldCustom
                      id="email"
                      name="email"
                      type={"email"}
                      placeholder="Enter new email here"
                      value={defaultUpdateUser.email}
                      padding={0}
                      onChange={handleUpdateUserDetail}
                      error={Boolean(emailError)}
                      helperText={emailError}
                      helperTextColor={themeDarkMode.textColorHelperForm}
                      iconEnd={<EmailIcon />}
                      marginRightIcon={1}
                      onKeyDown={handleKeyDown}
                    />
                  </Grid>
                )}
              </Grid>

              <Typography variant="h5" component="h1" my={3} sx={{ fontWeight: "bold" }}>
                Name
              </Typography>
              <Grid container spacing={1} sx={{ alignItems: "center" }}>
                <Grid item xs={10}>
                  <Typography variant="h6" component="h1" my={3} color={themeDarkMode.textColor}>
                    {currentUser?.displayName}
                  </Typography>
                </Grid>
                <Grid item xs={2}>
                  <IconButton aria-label="edit-name" onClick={handleToggleName}>
                    <EditIcon />
                  </IconButton>
                </Grid>
                {/* {isUpdateName && (
                  <Grid item xs={10}>
                    <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
                      <TextFieldCustom
                        id="firstName"
                        name="firstName"
                        placeholder="Your name here"
                        value={formik.values.firstName}
                        padding={0}
                        onChange={formik.handleChange}
                        error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                        helperText={formik.touched.firstName && formik.errors.firstName}
                        helperTextColor={themeDarkMode.textColorHelperForm}
                        iconEnd={<FirstNameIcon />}
                        marginRightIcon={1}
                      />
                      <TextFieldCustom
                        id="lastName"
                        name="lastName"
                        placeholder="Your name here"
                        value={formik.values.lastName}
                        padding={0}
                        onChange={formik.handleChange}
                        error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                        helperText={formik.touched.lastName && formik.errors.lastName}
                        helperTextColor={themeDarkMode.textColorHelperForm}
                        iconEnd={<LastNameIcon />}
                        marginRightIcon={1}
                      />
                    </Box>
                  </Grid>
                )} */}
              </Grid>
              <Typography
                variant="h5"
                component="h1"
                my={3}
                align="left"
                sx={{ fontWeight: "bold", display: "flex", justifyContent: "space-between" }}>
                Your email is {currentUser?.emailVerified ? "verified" : "not verified"}.
                {!currentUser?.emailVerified && (
                  <Button variant="outlined" onClick={handleVerifiedEmail}>
                    Verified email
                  </Button>
                )}
              </Typography>
              <Grid container spacing={1} sx={{ alignItems: "center" }}>
                <Grid item xs={10}>
                  <TextFieldCustom
                    id="newPassword"
                    name="newPassword"
                    type="password"
                    value={defaultUpdateUser.newPassword}
                    onChange={handleUpdateUserDetail}
                    error={Boolean(newPasswordError)}
                    helperText={newPasswordError}
                    helperTextColor={themeDarkMode.textColorHelperForm}
                    iconEnd={<PasswordIcon />}
                    placeholder="Enter new password here"
                  />
                </Grid>
                <Grid item xs={2}>
                  <IconButton aria-label="edit-email" onClick={handleCheckValidNewPassword}>
                    <SendIcon />
                  </IconButton>
                </Grid>
                <Grid item xs={6} sx={{ textAlign: "center" }}>
                  <Button variant="contained" color="error">
                    Delete account
                  </Button>
                </Grid>
                <Grid item xs={6} sx={{ textAlign: "center" }}>
                  <Button variant="contained" color="error" onClick={handleSignOut}>
                    Sign out
                  </Button>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h5" component="h1" my={3} sx={{ fontWeight: "bold" }}>
                Profie photo
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                  gap: 5,
                }}>
                <Avatar alt="Remy Sharp" src={GirlBackground} sx={{ width: 300, height: 300 }} />
                <Button variant="contained">Upload avatar here</Button>
              </Box>
              <Typography variant="h5" component="h1" my={3} align="center" sx={{ fontWeight: "bold" }}>
                {currentUser?.displayName}
              </Typography>
              <Typography variant="h5" component="h1" my={3} align="center">
                Work for something because it is good, not just because it stands a chance to succeed.
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Modal
        open={openModalAuthenticate}
        onClose={handleClose}
        aria-labelledby="modal-reAuthenticated"
        aria-describedby="modal-typeOldPassword">
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2" gutterBottom>
            Enter your old password here
          </Typography>
          <TextFieldCustom
            id="oldPassword"
            name="oldPassword"
            type="password"
            value={defaultUpdateUser.oldPassword}
            onChange={handleUpdateUserDetail}
            placeholder="Enter old passwrod here"
          />
          <Button sx={{ mt: 2 }} variant="contained" onClick={handleChangePassword}>
            Submit
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default Profile;
