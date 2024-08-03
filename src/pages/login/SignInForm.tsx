import React, { useState, Dispatch, SetStateAction } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Grid, Box } from "@mui/material";
import { EmailIcon, PasswordIcon } from "../../components/icons";
import { themeDarkMode } from "../../themes/ThemeProvider";
import { TextFieldCustom } from "../../components/TextField";
import { auth } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useFormik } from "formik";
import * as Yup from "yup";
import { CredentialsProps } from "../../assets/data";

interface SignInProps {
  setIsSignUp: Dispatch<SetStateAction<boolean>>;
}

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email address").required("Required"),
  password: Yup.string().required("Required"),
});

const SignInForm = ({ setIsSignUp }: SignInProps) => {
  const navigate = useNavigate();

  const formik = useFormik<CredentialsProps>({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log("values = ", values);
      handleSignIn(values);
    },
  });

  const handleSignIn = async (values: typeof formik.values) => {
    await signInWithEmailAndPassword(auth, values.email, values.password)
      .then((user) => {
        if (user) {
          navigate("/");
        }
        console.log("user login = ", user);
      })
      .catch((error: any) => {
        console.log("err = ", error);
      });
  };

  return (
    <Box component="form" onSubmit={formik.handleSubmit} noValidate sx={{ mt: 1, textAlign: "center" }}>
      <TextFieldCustom
        margin="normal"
        id="email"
        name="email"
        label="Email"
        placeholder="Enter your email here"
        value={formik.values.email}
        onChange={formik.handleChange}
        error={formik.touched.email && Boolean(formik.errors.email)}
        helperText={formik.touched.email && formik.errors.email}
        helperTextColor={themeDarkMode.textColorHelperForm}
        iconEnd={<EmailIcon />}
      />
      <TextFieldCustom
        margin="normal"
        id="password"
        name="password"
        label="Password"
        type="password"
        placeholder="Enter your password here"
        value={formik.values.password}
        onChange={formik.handleChange}
        error={formik.touched.password && Boolean(formik.errors.password)}
        helperText={formik.touched.password && formik.errors.password}
        helperTextColor={themeDarkMode.textColorHelperForm}
        iconEnd={<PasswordIcon />}
      />
      <Button
        type="submit"
        variant="contained"
        sx={{ mt: 3, mb: 2, p: 2, width: "30%", borderRadius: 10, backgroundColor: themeDarkMode.textPrimary }}>
        Sign In
      </Button>
      <Grid container justifyContent="flex-end">
        <Grid item xs={6}>
          <Button
            sx={{
              "&:hover": {
                color: themeDarkMode.textPrimary,
                opacity: 0.7,
              },
            }}
            onClick={() => setIsSignUp(true)}>
            Don't have an account? Sign Up
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};
export default SignInForm;
