import { Box } from "@mui/material";
import { FC, ReactNode } from "react";

interface GradientContainerProps {
  children: ReactNode;
}

export const GradientContainer: FC<GradientContainerProps> = ({ children }) => {
  return (
    <Box
      px="16px"
      style={{
        background: `linear-gradient(166.04deg, rgba(255, 0, 174, 0.16) 0%, rgba(255, 255, 255, 0) 20%)`,
      }}
    >
      {children}
    </Box>
  );
};
