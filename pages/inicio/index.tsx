import { useFetchGames } from "@/app/api/use-fetch-games";
import { Search } from "@/app/components/common/search";
import { GameProps, SavedGamesList } from "@/app/components/saved-games-list";
import { useDebounce } from "@/app/helpers/use-debounce";
import { Box } from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Spacer } from "@/app/components/common/spacer";

const Index = () => {
  const [searchValue, setSearchValue] = useState("");
  const [localGames, setLocalGames] = useState<GameProps[]>([]);
  const debouncedSearchValue = useDebounce(searchValue, 300);
  const { games, isLoading, isError } = useFetchGames(debouncedSearchValue);
  const { push } = useRouter();

  useEffect(() => {
    const storedGames = localStorage.getItem("games");
    if (storedGames) {
      setLocalGames(JSON.parse(storedGames));
    }
  }, []);

  const handleOnChangeSearchValue = (value: string) => {
    setSearchValue(value);
  };

  const handleGoToGameDetail = (gameId: string) => {
    push(`/game/${gameId}`);
  };

  if (isError) return <div>Error al cargar los juegos</div>;

  return (
    <Box
      px="16px"
      style={{
        background: `linear-gradient(166.04deg, rgba(255, 0, 174, 0.16) 17.78%, rgba(255, 255, 255, 0) 92.83%)`,
      }}
    >
      <Box maxWidth="190px">
        <img src="/logo.svg" alt="Logo" />
      </Box>
      <Search onSearch={handleOnChangeSearchValue} options={games} />
      <Spacer size="30px" />
      <SavedGamesList games={localGames} onClick={handleGoToGameDetail} />
    </Box>
  );
};

export default Index;
