import { useFetchGameById, useFetchGames } from "@/app/api/use-fetch-games";
import { Search } from "@/app/components/common/search";
import { GameDetail } from "@/app/components/game-detail";
import { useDebounce } from "@/app/helpers/use-debounce";
import { Box, IconButton, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useState } from "react";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import { Spacer } from "@/app/components/common/spacer";

export default function GameDetailPage() {
  const { query, push } = useRouter();
  const gameId = query.id as string;

  const [searchValue, setSearchValue] = useState("");

  const debouncedSearchValue = useDebounce(searchValue, 300);
  const { games, isError: isSearchError } = useFetchGames(debouncedSearchValue);
  const { game, isLoading, isError } = useFetchGameById(gameId);

  const handleOnChangeSearchValue = (value: string) => {
    setSearchValue(value);
  };

  const handleGoBack = () => {
    push("/inicio");
  };

  if (isLoading) return <div>Loading...</div>;
  console.log("GAME", game);

  return (
    <Box p="8px">
      <Box
        style={{
          background: `linear-gradient(166.04deg, rgba(255, 0, 174, 0.16) 17.78%, rgba(255, 255, 255, 0) 92.83%)`,
        }}
      >
        <Box display="flex" alignItems="center" gap={1.5}>
          <IconButton style={{ color: "#3C1661" }} onClick={handleGoBack}>
            <ArrowBackOutlinedIcon />
          </IconButton>
          <Typography
            variant="subtitle1"
            fontWeight={600}
            style={{ color: "#3C1661" }}
          >
            Back
          </Typography>
        </Box>
        <Search onSearch={handleOnChangeSearchValue} options={games} />
        <Spacer size="30px" />
      </Box>
      <GameDetail game={game} />;
    </Box>
  );
}
