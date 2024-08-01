import React, { useState, Dispatch, SetStateAction } from "react";
import { Button, Grid, Box } from "@mui/material";
import { themeDarkMode } from "../../themes/ThemeProvider";
import { EmailIcon, PasswordIcon, FirstNameIcon, LastNameIcon } from "../../components/icons";
import { TextFieldCustom } from "../../components/TextField";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebase";
import { doc, setDoc } from "firebase/firestore";
import { useFormik } from "formik";
import * as Yup from "yup";
import { CredentialsProps } from "../../assets/data";

interface SignUpProps {
  setIsSignUp: Dispatch<SetStateAction<boolean>>;
}


const validationSchema = Yup.object({
  firstName: Yup.string().max(15, "Must be 15 characters or less").required("Required"),
  lastName: Yup.string().max(20, "Must be 20 characters or less").required("Required"),
  email: Yup.string().email("Invalid email address").required("Required"),
  password: Yup.string().min(8, "Must be at least 8 characters").required("Required"),
});

export default function SignUpForm({ setIsSignUp }: SignUpProps) {
  const formik = useFormik<CredentialsProps>({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log("values = ", values);
      handleSignUp(values);
    },
  });

  const handleSignUp = async (values: typeof formik.values) => {
    try {
      const user = await createUserWithEmailAndPassword(auth, values.email, values.password);
      setDoc(doc(db, "users", user.user.uid), {
        firstName: values.firstName,
        lastName: values.lastName,
        bookmarks: [],
        recentlyWatch: [],
      });
      setIsSignUp(false);
    } catch (err) {
      console.log("err = ", err);
    }
  };

  return (
    <Box component="form" noValidate onSubmit={formik.handleSubmit} sx={{ mt: 3, textAlign: "center" }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextFieldCustom
            id="firstName"
            name="firstName"
            label="First Name"
            placeholder="Enter your first name here"
            value={formik.values.firstName}
            onChange={formik.handleChange}
            error={formik.touched.firstName && Boolean(formik.errors.firstName)}
            helperText={formik.touched.firstName && formik.errors.firstName}
            helperTextColor={themeDarkMode.textColorHelperForm}
            iconEnd={<FirstNameIcon />}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextFieldCustom
            id="lastName"
            name="lastName"
            label="Last Name"
            placeholder="Enter your last name here"
            value={formik.values.lastName}
            onChange={formik.handleChange}
            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
            helperText={formik.touched.lastName && formik.errors.lastName}
            helperTextColor={themeDarkMode.textColorHelperForm}
            iconEnd={<LastNameIcon />}
          />
        </Grid>
        <Grid item xs={12}>
          <TextFieldCustom
            id="email"
            name="email"
            label="Email"
            placeholder={"Enter your email here"}
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            helperTextColor={themeDarkMode.textColorHelperForm}
            iconEnd={<EmailIcon />}
          />
        </Grid>
        <Grid item xs={12}>
          <TextFieldCustom
            id="password"
            name="password"
            label="Password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            placeholder={"Enter your password here"}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            helperTextColor={themeDarkMode.textColorHelperForm}
            iconEnd={<PasswordIcon />}
          />
        </Grid>
      </Grid>
      <Button
        type="submit"
        variant="contained"
        sx={{ mt: 3, mb: 2, p: 2, width: "30%", borderRadius: 10, backgroundColor: themeDarkMode.textPrimary }}>
        Sign Up
      </Button>
      <Grid container justifyContent="flex-end">
        <Grid item>
          <Button
            sx={{
              "&:hover": {
                color: themeDarkMode.textPrimary,
                opacity: 0.7,
              },
            }}
            onClick={() => setIsSignUp(false)}>
            Already have an account? Sign in
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
