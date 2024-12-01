import { Box, Chip } from "@mui/material";
import React, { FC } from "react";
import StarIcon from "@mui/icons-material/StarOutline"; // Icono para rating
import EventIcon from "@mui/icons-material/EventOutlined"; // Icono para released
import ExtensionOutlinedIcon from "@mui/icons-material/ExtensionOutlined";
import { Genre } from "@/app/entities/game";
import styled from "@emotion/styled";
import { Spacer } from "../common/spacer";

interface ChipsSectionProps {
  rating: number;
  first_release_date: number | string;
  genres: Genre[];
}

const StyledChip = styled(Chip)({
  variant: "outlined",
  backgroundColor: "white",
  border: "1px solid #E2DCE7",
  color: "#6727A6",
  "& .MuiChip-icon": {
    color: "#6727A6",
  },
});

export const ChipsSection: FC<ChipsSectionProps> = ({
  rating,
  first_release_date,
  genres,
}) => {
  return (
    <Box>
      <Box display="flex" gap={2}>
        <StyledChip icon={<StarIcon />} label={`Rating: ${rating.toFixed()}`} />
        <StyledChip
          icon={<EventIcon />}
          label={`Released: ${first_release_date}`}
        />
      </Box>
      <Spacer size="8px" />
      <StyledChip
        icon={<ExtensionOutlinedIcon />}
        label={`Genre: ${genres.map((genre) => genre.name).join(", ")}`}
      />
    </Box>
  );
};
