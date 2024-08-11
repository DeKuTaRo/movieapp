import React, { useState, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Grid, Typography, Button, Avatar, IconButton, Modal } from "@mui/material";
import Sidebar from "../../components/sidebar";
import { themeDarkMode } from "../../themes/ThemeProvider";
import { TextFieldCustom } from "../../components/TextField";
import { GirlBackground } from "../../assets";
import { useAppSelector } from "../../hooks";
import { auth, db } from "../../firebase";
import { doc, updateDoc } from "firebase/firestore";
import {
  EmailIcon,
  FirstNameIcon,
  LastNameIcon,
  EditIcon,
  SendIcon,
  PasswordIcon,
  CloudUploadIcon,
  ClearIcon,
  AcceptIcon,
} from "../../components/icons";
import {
  updateEmail,
  sendEmailVerification,
  reauthenticateWithCredential,
  EmailAuthProvider,
  signOut,
  updatePassword,
} from "firebase/auth";
import toast from "react-hot-toast";
import { convertErrorCodeToMessage } from "../../utils";
import CustomSkeleton from "../../components/Skeleton";
import { uploadBytes, getDownloadURL, ref } from "firebase/storage";
import { storage } from "../../firebase";
import { CredentialsUpdateProps } from "../../assets/data";
import { styled } from "@mui/material/styles";
import { updateProfile } from "firebase/auth";

const validateEmail = (email: string) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

const validatePassword = (password: string) => {
  return password.length < 8;
};

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const Profile = () => {
  const navigate = useNavigate();
  const [isUpdateEmail, setIsUpdateEmail] = useState<boolean>(false);
  const [isUpdateName, setIsUpdateName] = useState<boolean>(false);

  const checkAuthUser = auth.currentUser;
  const currentUser = useAppSelector((state) => state.auth.user);

  const [openModalAuthenticate, setOpenModalAuthenticate] = React.useState(false);
  const handleClose = () => setOpenModalAuthenticate(false);
  const [defaultUpdateUser, setDefaultUpdateUser] = useState<CredentialsUpdateProps>({
    email: "",
    firstName: "",
    lastName: "",
    newPassword: "",
    oldPassword: "",
  });
  const [emailError, setEmailError] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
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

    if (checkAuthUser && checkAuthUser.email) {
      try {
        const credential = EmailAuthProvider.credential(checkAuthUser.email, "123456");
        await reauthenticateWithCredential(checkAuthUser, credential);
        await updateEmail(checkAuthUser, defaultUpdateUser.email);
        toast.success("Update successfully");
      } catch (err: any) {
        toast.error(convertErrorCodeToMessage(err.code));
      }
    }
  };

  const handleCancelUpdateEmail = (event: React.KeyboardEvent) => {
    if (event.key === "Escape") {
      setIsUpdateEmail(false);
    }
  };

  const handleCancelUpdateName = (event: React.KeyboardEvent) => {
    if (event.key === "Escape") {
      setIsUpdateName(false);
    }
  };

  const handleVerifiedEmail = async () => {
    if (checkAuthUser) {
      try {
        await sendEmailVerification(checkAuthUser);
        toast.success("Check you email account to verify");
      } catch (err: any) {
        toast.error(convertErrorCodeToMessage(err.code));
      }
    }
  };

  const handleSignOut = async () => {
    await signOut(auth)
      .then(() => {
        toast.success("Hope to see you again!!!");
        navigate("/");
      })
      .catch((err: any) => {
        toast.error(convertErrorCodeToMessage(err.code));
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

  const handleUpdateName = async () => {
    if (defaultUpdateUser.firstName.length === 0) {
      setFirstNameError("This field is required");
    }
    if (defaultUpdateUser.lastName.length === 0) {
      setLastNameError("This field is required");
    }
    if (checkAuthUser) {
      try {
        await updateDoc(doc(db, "users", checkAuthUser.uid), {
          firstName: defaultUpdateUser.firstName,
          lastName: defaultUpdateUser.lastName,
        });
        setDefaultUpdateUser((prevState) => ({
          ...prevState,
          firstName: "",
          lastName: "",
        }));
        setIsUpdateName(false);
        toast.success("Update successfully");
      } catch (err: any) {
        toast.error(convertErrorCodeToMessage(err.code));
      }
    }
  };

  const handleChangePassword = async () => {
    if (checkAuthUser && checkAuthUser.email) {
      const credential = EmailAuthProvider.credential(checkAuthUser.email, defaultUpdateUser.oldPassword);
      await reauthenticateWithCredential(checkAuthUser, credential);
      await updatePassword(checkAuthUser, defaultUpdateUser.newPassword)
        .then(() => {
          setOpenModalAuthenticate(false);
          setDefaultUpdateUser((prevState) => ({
            ...prevState,
            newPassword: "",
          }));
          toast.success("Update successfully");
        })
        .catch((err: any) => {
          toast.error(convertErrorCodeToMessage(err.code));
        });
    }
  };

  const [avatar, setAvatar] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState<boolean>(false);
  const handleUploadAvatar = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files ? e.target.files[0] : null;
    setAvatar(selectedFile);

    if (selectedFile) {
      const previewUrl = URL.createObjectURL(selectedFile);
      setPreview(previewUrl);
      setIsUploadingAvatar(true);
    }
  };

  const handleCancelUploadAvatar = () => {
    setPreview(null);
    setIsUploadingAvatar(false);
  };

  const handleUpdateAvatar = async () => {
    try {
      if (checkAuthUser) {
        const avatarRef = ref(storage, `Avatar/${checkAuthUser.uid}/${avatar?.name}`);
        const snapshot = await uploadBytes(avatarRef, avatar as Blob);
        const downloadURL = await getDownloadURL(snapshot.ref);
        await updateProfile(checkAuthUser, { photoURL: downloadURL });
        setPreview(null);
        setIsUploadingAvatar(false);
        toast.success("Update successfully");
      }
    } catch (err: any) {
      toast.error(convertErrorCodeToMessage(err.code));
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
              <Typography variant="h5" component="h1" mt={3} sx={{ fontWeight: "bold" }}>
                Email
              </Typography>
              <Grid container spacing={1} sx={{ alignItems: "center" }}>
                <Grid item xs={10}>
                  <Typography variant="h6" component="h1" my={3} color={themeDarkMode.textColor}>
                    {currentUser ? currentUser.email : <CustomSkeleton variant="text" />}
                  </Typography>
                </Grid>
                <Grid item xs={2}>
                  {isUpdateEmail ? (
                    <IconButton aria-label="update-email" onClick={handleUpdateEmail}>
                      <SendIcon />
                    </IconButton>
                  ) : (
                    <IconButton
                      aria-label="edit-email"
                      sx={{ color: themeDarkMode.title }}
                      disabled={
                        currentUser?.signInType === "google" || currentUser?.signInType === "facebook" ? true : false
                      }
                      onClick={() => setIsUpdateEmail(true)}>
                      <EditIcon />
                    </IconButton>
                  )}
                </Grid>

                {isUpdateEmail && (
                  <Grid item xs={8}>
                    <Typography variant="subtitle1" component="h1" my={0.5} color={themeDarkMode.textColor}>
                      Press "Esc" to cancel
                    </Typography>
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
                      onKeyDown={handleCancelUpdateEmail}
                    />
                  </Grid>
                )}
              </Grid>

              <Typography variant="h5" component="h1" sx={{ fontWeight: "bold" }}>
                Name
              </Typography>
              <Grid container spacing={1} sx={{ alignItems: "center" }}>
                <Grid item xs={10}>
                  <Typography variant="h6" component="h1" my={3} color={themeDarkMode.textColor}>
                    {currentUser ? currentUser.displayName : <CustomSkeleton variant="text" />}
                  </Typography>
                </Grid>
                <Grid item xs={2}>
                  {isUpdateName ? (
                    <IconButton aria-label="update-name" onClick={handleUpdateName}>
                      <SendIcon />
                    </IconButton>
                  ) : (
                    <IconButton
                      aria-label="edit-name"
                      sx={{ color: themeDarkMode.title }}
                      onClick={() => setIsUpdateName(true)}>
                      <EditIcon />
                    </IconButton>
                  )}
                </Grid>
                {isUpdateName && (
                  <Grid item xs={10}>
                    <Typography variant="subtitle1" component="h1" my={0.5} color={themeDarkMode.textColor}>
                      Press "Esc" to cancel
                    </Typography>
                    <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
                      <TextFieldCustom
                        id="firstName"
                        name="firstName"
                        placeholder="Your first name here"
                        value={defaultUpdateUser.firstName}
                        padding={0}
                        onChange={handleUpdateUserDetail}
                        error={Boolean(firstNameError)}
                        helperText={firstNameError}
                        helperTextColor={themeDarkMode.textColorHelperForm}
                        iconEnd={<FirstNameIcon />}
                        marginRightIcon={1}
                        onKeyDown={handleCancelUpdateName}
                      />
                      <TextFieldCustom
                        id="lastName"
                        name="lastName"
                        placeholder="Your last name here"
                        value={defaultUpdateUser.lastName}
                        padding={0}
                        onChange={handleUpdateUserDetail}
                        error={Boolean(lastNameError)}
                        helperText={lastNameError}
                        helperTextColor={themeDarkMode.textColorHelperForm}
                        iconEnd={<LastNameIcon />}
                        marginRightIcon={1}
                        onKeyDown={handleCancelUpdateName}
                      />
                    </Box>
                  </Grid>
                )}
              </Grid>
              <Typography
                variant="h5"
                component="h1"
                mb={3}
                align="left"
                sx={{ fontWeight: "bold", display: "flex", justifyContent: "space-between" }}>
                Your email is {currentUser?.emailVerified ? "verified" : "not verified"}.
                {!currentUser?.emailVerified && (
                  <Button variant="outlined" onClick={handleVerifiedEmail}>
                    Verified email
                  </Button>
                )}
              </Typography>
              <Grid container rowSpacing={2} columnSpacing={1} sx={{ alignItems: "center" }}>
                {currentUser?.signInType === "google" || currentUser?.signInType === "facebook" ? undefined : (
                  <>
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
                  </>
                )}
                <Grid item xs={6} sx={{ textAlign: "center" }}>
                  <Button variant="contained" color="error">
                    Delete account
                  </Button>
                </Grid>
                <Grid item xs={6}>
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
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  {isUploadingAvatar && (
                    <IconButton
                      aria-label="cancel-avatar"
                      sx={{ color: themeDarkMode.title, height: "fit-content" }}
                      onClick={handleCancelUploadAvatar}>
                      <ClearIcon />
                    </IconButton>
                  )}
                  <Avatar
                    alt="Remy Sharp"
                    src={preview || (currentUser?.photoURL ? `${currentUser?.photoURL}` : GirlBackground)}
                    sx={{ width: 300, height: 300 }}
                  />
                  {isUploadingAvatar && (
                    <IconButton aria-label="update-avatar" sx={{ height: "fit-content" }} onClick={handleUpdateAvatar}>
                      <AcceptIcon />
                    </IconButton>
                  )}
                </Box>

                <Button
                  component="label"
                  role={undefined}
                  variant="contained"
                  tabIndex={-1}
                  startIcon={<CloudUploadIcon />}>
                  Upload avatar
                  <VisuallyHiddenInput type="file" accept="image/*" onChange={handleUploadAvatar} />
                </Button>
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
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: themeDarkMode.backgroundColor,
            color: themeDarkMode.title,
            boxShadow: 24,
            p: 4,
            textAlign: "center",
          }}>
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
