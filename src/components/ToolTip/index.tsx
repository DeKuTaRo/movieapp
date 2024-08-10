import { Tooltip, TooltipProps, tooltipClasses } from "@mui/material";
import { themeDarkMode } from "../../themes/ThemeProvider";
import { styled } from "@mui/material/styles";

export const TooltipCustom = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} placement="right" classes={{ popper: className }} />
))(() => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: themeDarkMode.title,
    color: themeDarkMode.backgroundColor,
    boxShadow: 1,
    fontWeight: "bold",
    fontSize: 12,
  },
}));
