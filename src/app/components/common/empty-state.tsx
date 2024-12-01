import { Box, Typography } from "@mui/material";
import { FC, ReactNode } from "react";

interface EmptyStateProps {
  title: string;
  description: string;
  image: ReactNode;
}

export const EmptyState: FC<EmptyStateProps> = ({
  title,
  description,
  image,
}) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      px={2}
      gap={1.5}
    >
      <Box>{image}</Box>
      <Typography variant="subtitle1" fontWeight={600}>
        {title}
      </Typography>
      <Typography variant="subtitle2" fontWeight={500}>
        {description}
      </Typography>
    </Box>
  );
};
