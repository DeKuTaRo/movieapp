import React from "react";
import { TextField, InputAdornment } from "@mui/material";
import { themeDarkMode } from "../../themes/ThemeProvider";
import IconButton from "@mui/material/IconButton";

interface TextFieldProps {
  margin?: "dense" | "none" | "normal";
  name?: string;
  label?: string;
  id?: string;
  placeholder?: string;
  type?: string;
  value?: string | number | null;
  required?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  error?: boolean;
  helperText?: React.ReactNode;
  helperTextColor?: string;
  iconStart?: React.ReactNode;
  iconEnd?: React.ReactNode;
}

export const TextFieldCustom = ({
  margin,
  name,
  label,
  id,
  placeholder,
  type,
  value,
  required,
  onChange,
  error,
  helperText,
  helperTextColor,
  iconStart,
  iconEnd,
}: TextFieldProps) => {
  return (
    <TextField
      margin={margin}
      autoComplete={name}
      name={name}
      label={label}
      required={required}
      helperText={helperText}
      fullWidth
      id={id}
      placeholder={placeholder}
      autoFocus
      type={type}
      value={value}
      onChange={onChange}
      FormHelperTextProps={{
        sx: { color: helperTextColor },
      }}
      InputLabelProps={{
        sx: { color: themeDarkMode.textPrimary, fontSize: "1.25rem", fontWeight: "700" },
      }}
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
          opacity: 0.5,
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
