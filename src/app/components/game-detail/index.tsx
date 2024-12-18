import React, { FC, useState, useEffect } from "react";
import { Box, Typography, Snackbar, Alert } from "@mui/material";
import { Game } from "@/app/entities/game";
import { ChipsSection } from "./chips-section";
import { Carousel } from "../common/carousel";
import { GamesList } from "../common/games-list";
import { Description } from "./description";
import { GameHeader } from "./game-header";
import { Spacer } from "../common/spacer";

interface GameDetailProps {
  game: Game;
  isMobile: boolean;
}

export const GameDetail: FC<GameDetailProps> = ({ game, isMobile }) => {
  const [isCollected, setIsCollected] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarType, setSnackbarType] = useState<"success" | "error">();

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
      setSnackbarType("success");
      setSnackbarOpen(true);
    } else {
      const updatedGames = games.filter(
        (savedGame) => savedGame.id !== game.id
      );
      localStorage.setItem("games", JSON.stringify(updatedGames));
      setIsCollected(false);
      setSnackbarType("error");
      setSnackbarOpen(true);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box>
      <GameHeader
        name={name}
        cover={cover}
        involved_companies={involved_companies}
        onClick={handleSaveGameToLocalStorage}
        isCollected={isCollected}
        isMobile={isMobile}
      />
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
      <GamesList games={similar_games} isMobile={isMobile} />
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={1000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarType === "success" ? "success" : "error"}
          style={{
            border: `2px solid ${snackbarType === "success" ? "green" : "red"}`,
            borderRadius: "8px",
          }}
        >
          <Typography variant="subtitle1" fontWeight={600}>
            {snackbarType === "success" ? "Game Collected" : "Game Removed"}
          </Typography>
          <Typography variant="body2">
            {snackbarType === "success"
              ? `${name} has been added to your collection.`
              : `${name} has been removed from your collection.`}
          </Typography>
        </Alert>
      </Snackbar>
    </Box>
  );
};
