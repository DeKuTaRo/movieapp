import React from "react";
import { TextField, InputAdornment } from "@mui/material";
import { themeDarkMode } from "../../themes/ThemeProvider";
import IconButton from "@mui/material/IconButton";

interface TextFieldProps {
  margin?: "dense" | "none" | "normal";
  name?: string;
  id?: string;
  placeholder?: string;
  type?: string;
  iconStart?: React.ReactNode;
  iconEnd?: React.ReactNode;
}

export const TextFieldCustom = ({ margin, name, id, placeholder, type, iconStart, iconEnd }: TextFieldProps) => {
  return (
    <TextField
      margin={margin}
      autoComplete={name}
      name={name}
      required
      fullWidth
      id={id}
      placeholder={placeholder}
      autoFocus
      type={type}
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
        startAdornment: (
          <InputAdornment position="end">
            <IconButton>{iconStart}</IconButton>
          </InputAdornment>
        ),
        endAdornment: (
          <InputAdornment position="end">
            <IconButton>{iconEnd}</IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};
