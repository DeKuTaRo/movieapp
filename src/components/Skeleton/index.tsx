import { Skeleton } from "@mui/material";
import { themeDarkMode } from "../../themes/ThemeProvider";

interface SkeletonProps {
  keyItem?: number;
  variant?: "text" | "rectangular" | "rounded" | "circular";
  width?: number;
  widthBreakPoint?: string[];
  height?: number;
  heightBreakpoint?: string;
  marginTop?: string;
  marginBottom?: string;
  fontSize?: string;
}

const CustomSkeleton: React.FC<SkeletonProps> = ({
  keyItem,
  variant,
  width,
  widthBreakPoint,
  height,
  heightBreakpoint,
  marginTop,
  marginBottom,
  fontSize,
}) => {
  return (
    <Skeleton
      key={keyItem}
      variant={variant}
      width={width}
      height={height}
      sx={{
        bgcolor: themeDarkMode.textColor,
        width: widthBreakPoint && { sm: widthBreakPoint[0], md: widthBreakPoint[1], lg: widthBreakPoint[2] },
        height: heightBreakpoint && { sm: heightBreakpoint[0], md: heightBreakpoint[1], lg: heightBreakpoint[2] },
        marginTop: marginTop,
        marginBottom: marginBottom,
        fontSize: fontSize,
      }}
    />
  );
};

export default CustomSkeleton;
