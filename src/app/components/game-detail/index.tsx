import React, { FC, useState, useEffect } from "react";
import { Box, Button, Typography } from "@mui/material";
import { Game } from "@/app/entities/game";
import { ChipsSection } from "./chips-section";
import { Carousel } from "../common/carousel";
import { GamesList } from "../common/games-list";
import styled from "@emotion/styled";
import { Description } from "./description";
import { GameHeader } from "./game-header";
import { Spacer } from "../common/spacer";

interface GameDetailProps {
  game: Game;
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

export const GameDetail: FC<GameDetailProps> = ({ game }) => {
  const [isCollected, setIsCollected] = useState(false);

  const {
    cover,
    name,
    involved_companies,
    rating,
    first_release_date,
    genres,
    summary,
    platforms,
    similar_games,
    screenshots,
  } = game;

  useEffect(() => {
    const storedGames = localStorage.getItem("games");
    const games: Game[] = storedGames ? JSON.parse(storedGames) : [];
    setIsCollected(games.some((savedGame) => savedGame.id === game.id));
  }, [game.id]);

  const handleSaveGameToLocalStorage = () => {
    const storedGames = localStorage.getItem("games");
    const games: Game[] = storedGames ? JSON.parse(storedGames) : [];

    if (!isCollected) {
      games.push(game);
      localStorage.setItem("games", JSON.stringify(games));
      setIsCollected(true);
    } else {
      const updatedGames = games.filter(
        (savedGame) => savedGame.id !== game.id
      );
      localStorage.setItem("games", JSON.stringify(updatedGames));
      setIsCollected(false);
    }
  };

  return (
    <Box>
      <GameHeader
        name={name}
        cover={cover}
        involved_companies={involved_companies}
      />
      <Spacer size="16px" />
      <StyledButton
        variant={isCollected ? "outlined" : "contained"}
        fullWidth
        onClick={handleSaveGameToLocalStorage}
      >
        {isCollected ? "Game collected" : "Collect Game"}
      </StyledButton>
      <Spacer size="16px" />
      <ChipsSection
        rating={rating}
        first_release_date={first_release_date}
        genres={genres}
      />
      <Spacer size="16px" />
      <Description summary={summary} platforms={platforms} />
      <Spacer size="16px" />
      <Typography variant="h6" component="h2">
        Media
      </Typography>
      <Carousel images={screenshots} />
      <Spacer size="16px" />
      <Typography variant="h6" component="h2">
        Similar Games
      </Typography>
      <GamesList games={similar_games} />
    </Box>
  );
};
