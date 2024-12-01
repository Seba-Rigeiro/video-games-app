import { useFetchGameById, useFetchGames } from "@/app/api/use-fetch-games";
import { Search } from "@/app/components/common/search";
import { GameDetail } from "@/app/components/game-detail";
import { useDebounce } from "@/app/helpers/use-debounce";
import { Box, IconButton, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useState } from "react";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import { Spacer } from "@/app/components/common/spacer";
import { GradientContainer } from "@/app/components/common/gradient-container";
import { Loader } from "@/app/components/common/loader";

export default function GameDetailPage() {
  const [searchValue, setSearchValue] = useState("");

  const { query, push } = useRouter();
  const gameId = query.id as string;

  const debouncedSearchValue = useDebounce(searchValue, 300);
  const {
    games,
    isLoading: isSearchLoading,
    isError: isSearchError,
  } = useFetchGames(debouncedSearchValue);
  const {
    game,
    isLoading: isGameFetchLoading,
    isError: isGameFetchError,
  } = useFetchGameById(gameId);

  const handleOnChangeSearchValue = (value: string) => {
    setSearchValue(value);
  };

  const handleGoBack = () => {
    push("/inicio");
  };

  if (isGameFetchLoading) return <Loader />;

  if (isGameFetchError || isSearchError)
    return <div>Se produjo un error. Volve a intentar</div>;

  return (
    <GradientContainer>
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
      <Search
        onSearch={handleOnChangeSearchValue}
        options={games}
        isLoading={isSearchLoading}
      />
      <Spacer size="30px" />
      <GameDetail game={game} />;
    </GradientContainer>
  );
}
