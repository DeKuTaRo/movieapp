import React, { Dispatch, SetStateAction } from "react";
import { Button, Grid, Box } from "@mui/material";
import { EmailIcon, PasswordIcon } from "../../components/icons";
import { themeDarkMode } from "../../themes/ThemeProvider";
import { TextFieldCustom } from "../../components/TextField";

interface SignInProps {
  setIsSignUp: Dispatch<SetStateAction<boolean>>;
}

const SignInForm = ({ setIsSignUp }: SignInProps) => {
  return (
    <Box component="form" noValidate sx={{ mt: 1, textAlign: "center" }}>
      <TextFieldCustom
        margin={"normal"}
        id="email"
        name="email"
        placeholder={"Enter your email"}
        iconEnd={<EmailIcon />}
      />
      <TextFieldCustom
        margin={"normal"}
        id="password"
        name="password"
        placeholder={"Enter your password"}
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
