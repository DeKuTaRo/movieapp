import React from "react";
import { TextField, InputAdornment } from "@mui/material";
import { themeDarkMode } from "../../themes/ThemeProvider";
import IconButton from "@mui/material/IconButton";

interface TextFieldProps {
  margin?: "dense" | "none" | "normal";
  padding?: number;
  width?: string;
  name?: string;
  label?: string;
  id?: string;
  placeholder?: string;
  type?: string;
  defaultValue?: string | null;
  value?: string | number | null;
  required?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  error?: boolean;
  helperText?: React.ReactNode;
  helperTextColor?: string;
  iconStart?: React.ReactNode;
  iconEnd?: React.ReactNode;
  marginRightIcon?: number;
  onKeyDown?: (event: React.KeyboardEvent) => void;
}

export const TextFieldCustom = ({
  margin,
  padding = 1.5,
  width,
  name,
  label,
  id,
  placeholder,
  type,
  defaultValue,
  value,
  required,
  onChange,
  error,
  helperText,
  helperTextColor,
  iconStart,
  iconEnd,
  marginRightIcon,
  onKeyDown,
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
      defaultValue={defaultValue}
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
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
          padding: padding,
          width: width,
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
            <IconButton sx={{ mr: marginRightIcon }}>{iconEnd}</IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};
