import { Cover, InvolvedCompany } from "@/app/entities/game";
import { getCoverUrl, Sizes } from "@/app/helpers/get-cover-url";
import styled from "@emotion/styled";
import { Box, Button, Typography } from "@mui/material";
import Image from "next/image";
import { FC } from "react";
import { Spacer } from "../common/spacer";

interface GameHeaderProps {
  name: string;
  cover: Cover;
  involved_companies: InvolvedCompany[];
  onClick: () => void;
  isCollected: boolean;
  isMobile: boolean;
}

const StyledButton = styled(Button)(({ variant }) => ({
  borderRadius: "30px",
  color: variant === "contained" ? "#ffffff" : "#3C1661",
  backgroundColor: variant === "contained" ? "#3C1661" : "transparent",
  border: "1px solid #3C1661",
  textTransform: "none",
  "&:hover": {
    border: "1px solid #3C1661",
    backgroundColor: variant === "contained" ? "#3C1661" : "transparent",
  },
  "&:active": {
    backgroundColor: variant === "contained" ? "#320E6A" : "#E9D4FF",
  },
}));

export const GameHeader: FC<GameHeaderProps> = ({
  name,
  cover,
  involved_companies,
  isCollected,
  onClick,
  isMobile,
}) => {
  return (
    <>
      <Box display="flex" gap={2}>
        <Box>
          <Image
            src={getCoverUrl(cover?.image_id ?? "", Sizes.BIG)}
            alt={name}
            width={isMobile ? 82 : 170}
            height={isMobile ? 110 : 226}
          />
        </Box>
        <Box
          flex="1"
          display="flex"
          flexDirection="column"
          justifyContent="start"
        >
          <Typography variant="h6" fontWeight={600}>
            {name}
          </Typography>
          <Typography
            variant="subtitle2"
            fontWeight={500}
            color="text.secondary"
          >
            {involved_companies
              .map((company) => company.company.name)
              .join(", ")}
          </Typography>
          {!isMobile && (
            <>
              <Spacer size="24px" />

              <StyledButton
                variant={isCollected ? "outlined" : "contained"}
                onClick={onClick}
                style={{ width: isMobile ? "100%" : "fit-content" }}
              >
                {isCollected ? "Game collected" : "Collect Game"}
              </StyledButton>
            </>
          )}
        </Box>
      </Box>
      {isMobile && (
        <>
          <Spacer size="16px" />
          <StyledButton
            variant={isCollected ? "outlined" : "contained"}
            onClick={onClick}
            fullWidth
          >
            {isCollected ? "Game collected" : "Collect Game"}
          </StyledButton>
        </>
      )}
    </>
  );
};
