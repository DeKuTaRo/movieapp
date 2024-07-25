import React, { Dispatch, SetStateAction } from "react";
import { Button, Grid, Box } from "@mui/material";
import { themeDarkMode } from "../../themes/ThemeProvider";
import { EmailIcon, PasswordIcon, FirstNameIcon, LastNameIcon } from "../../components/icons";
import { TextFieldCustom } from "../../components/TextField";

interface SignUpProps {
  setIsSignUp: Dispatch<SetStateAction<boolean>>;
}

// TODO remove, this demo shouldn't need to reset the theme.

export default function SignUpForm({ setIsSignUp }: SignUpProps) {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  return (
    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3, textAlign: "center" }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextFieldCustom id="firstName" name="firstName" placeholder={"First name"} iconEnd={<FirstNameIcon />} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextFieldCustom id="lastName" name="lastName" placeholder={"Last name"} iconEnd={<LastNameIcon />} />
        </Grid>
        <Grid item xs={12}>
          <TextFieldCustom id="email" name="email" placeholder={"Enter your email"} iconEnd={<EmailIcon />} />
        </Grid>
        <Grid item xs={12}>
          <TextFieldCustom
            id="password"
            name="password"
            type="password"
            placeholder={"Enter your password"}
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
