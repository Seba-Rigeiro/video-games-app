import { FC, useState } from "react";
import { Box, Typography } from "@mui/material";
import { Cover } from "@/app/entities/game";
import { Filters } from "./filters";
import { GamesList } from "../common/games-list";
import { Spacer } from "../common/spacer";
import { EmptyState } from "../common/empty-state";
import Image from "next/image";

export interface GameProps {
  id: string;
  name: string;
  cover: Cover;
  first_release_date: string;
}

interface GamesListProps {
  games: GameProps[];
  onClick: (gameId: string) => void;
  onDelete: (gameId: string) => void;
}

export const SavedGamesList: FC<GamesListProps> = ({
  games,
  onClick,
  onDelete,
}) => {
  const [selectedFilter, setSelectedFilter] = useState<
    "last_added" | "newest" | "oldest"
  >("last_added");

  const handleFilterChange = (filter: "last_added" | "newest" | "oldest") => {
    setSelectedFilter(filter);
  };

  const sortedGames = [...games];

  if (selectedFilter === "newest") {
    sortedGames.sort(
      (a, b) =>
        new Date(b.first_release_date).getTime() -
        new Date(a.first_release_date).getTime()
    );
  }
  if (selectedFilter === "oldest") {
    sortedGames.sort(
      (a, b) =>
        new Date(a.first_release_date).getTime() -
        new Date(b.first_release_date).getTime()
    );
  }
  if (selectedFilter === "last_added") {
    sortedGames.reverse();
  }

  return (
    <Box>
      <Typography
        variant="h6"
        style={{
          color: "#3C1661",
        }}
      >
        Saved Games
      </Typography>
      <Spacer size="12px" />
      <Box>
        {games.length === 0 ? (
          <>
            <Spacer size="30px" />
            <EmptyState
              title="Nothing collected yet"
              description="Here you will see your collected games"
              image={
                <Image
                  src="/illustration.svg"
                  width={358}
                  height={168}
                  alt="empty-state"
                />
              }
            />
          </>
        ) : (
          <>
            <Filters
              onChange={handleFilterChange}
              selectedFilter={selectedFilter}
            />
            <Spacer size="24px" />
            <GamesList
              games={sortedGames}
              onClick={onClick}
              onDelete={onDelete}
            />
          </>
        )}
      </Box>
    </Box>
  );
};
