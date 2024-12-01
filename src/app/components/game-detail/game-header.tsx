import { Cover, InvolvedCompany } from "@/app/entities/game";
import { getCoverUrl, Sizes } from "@/app/helpers/get-cover-url";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import { FC } from "react";

interface GameHeaderProps {
  name: string;
  cover: Cover;
  involved_companies: InvolvedCompany[];
}

export const GameHeader: FC<GameHeaderProps> = ({
  name,
  cover,
  involved_companies,
}) => {
  return (
    <Box display="flex" gap={2}>
      <Box minWidth={150} maxWidth={300}>
        <Image
          src={getCoverUrl(cover?.image_id ?? "", Sizes.BIG)}
          alt={name}
          width={300}
          height={400}
          style={{
            width: "100%",
            height: "auto",
          }}
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
        <Typography variant="subtitle2" fontWeight={500} color="text.secondary">
          {involved_companies.map((company) => company.company.name).join(", ")}
        </Typography>
      </Box>
    </Box>
  );
};
