import { Platform } from "@/app/entities/game";
import { Typography } from "@mui/material";
import React, { FC } from "react";
import { Spacer } from "../common/spacer";

interface DescriptionProps {
  summary: string;
  platforms: Platform[];
}

export const Description: FC<DescriptionProps> = ({ summary, platforms }) => {
  return (
    <>
      <Typography variant="h6" component="h2">
        Summary
      </Typography>
      <Typography variant="body1" color="text.secondary">
        {summary}
      </Typography>
      <Spacer size="24px" />
      <Typography variant="h6" component="h2" gutterBottom>
        Platforms
      </Typography>
      <Typography variant="body1" color="text.secondary">
        {platforms.map((platform) => platform.name).join(", ")}
      </Typography>
    </>
  );
};
