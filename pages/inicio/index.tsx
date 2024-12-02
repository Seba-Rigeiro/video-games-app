import Image from "next/image";
import { useFetchGames } from "@/app/api/use-fetch-games";
import { Search } from "@/app/components/common/search";
import { GameProps, SavedGamesList } from "@/app/components/saved-games-list";
import { useDebounce } from "@/app/helpers/use-debounce";
import { Box } from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Spacer } from "@/app/components/common/spacer";
import { GradientContainer } from "@/app/components/common/gradient-container";

const Index = () => {
  const [searchValue, setSearchValue] = useState("");
  const [savedGames, setSavedGames] = useState<GameProps[]>([]);
  const debouncedSearchValue = useDebounce(searchValue, 500);
  const { games, isLoading, isError } = useFetchGames(debouncedSearchValue);
  const { push } = useRouter();

  useEffect(() => {
    const storedGames = localStorage.getItem("games");
    if (storedGames) {
      setSavedGames(JSON.parse(storedGames));
    }
  }, []);

  const handleOnChangeSearchValue = (value: string) => {
    setSearchValue(value);
  };

  const handleGoToGameDetail = (gameId: string) => {
    push(`/game/${gameId}`);
  };

  const handleOnDeleteGame = (gameId: string) => {
    const updatedGames = savedGames.filter((game) => game.id !== gameId);
    setSavedGames(updatedGames);
    localStorage.setItem("games", JSON.stringify(updatedGames));
  };

  if (isError) return <div>Se produjo un error. Volve a intentar</div>;

  return (
    <GradientContainer>
      <Box maxWidth="190px">
        <Image src="/logo.svg" alt="Logo" width={190} height={80} />
      </Box>
      <Search
        onSearch={handleOnChangeSearchValue}
        options={games}
        isLoading={isLoading}
      />
      <Spacer size="30px" />
      <SavedGamesList
        games={savedGames}
        onClick={handleGoToGameDetail}
        onDelete={handleOnDeleteGame}
      />
    </GradientContainer>
  );
};

export default Index;
