import { FC } from "react";
import {
  TextField,
  Autocomplete,
  InputAdornment,
  Box,
  Avatar,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import styled from "@emotion/styled";
import { GameProps } from "../saved-games-list";
import { useRouter } from "next/router";

interface SearchProps {
  options: GameProps[];
  onSearch: (query: string) => void;
  isLoading?: boolean;
}

const StyledTextField = styled(TextField)`
  max-width: 358px;
  width: 100%;
  & .MuiOutlinedInput-root {
    border-radius: 20px;
    padding: 0 8px;
    &.Mui-focused {
      border: 2px solid #ff00ae33;
    }
  }
  & .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline {
    border: none;
  }
  & .MuiOutlinedInput-root.Mui-expanded {
    border-radius: 50px 50px 0 0;
  }
`;

export const Search: FC<SearchProps> = ({
  onSearch,
  options = [],
  isLoading,
}) => {
  const { push } = useRouter();

  return (
    <Autocomplete<GameProps>
      //@ts-expect-error @typescript-eslint/ban-ts-comment
      freeSolo
      loading={isLoading}
      options={options}
      getOptionLabel={(option) => option.name}
      onInputChange={(_, newInputValue: string) => {
        onSearch(newInputValue);
      }}
      onChange={(_, selectedOption) => {
        if (selectedOption && typeof selectedOption === "object") {
          push(`/game/${selectedOption.id}`);
        }
      }}
      style={{ display: "contents" }}
      renderOption={(props, option) => (
        <Box
          display="flex"
          alignItems="center"
          gap={1}
          component="li"
          {...props}
        >
          <Avatar
            src={
              option.cover?.image_id
                ? `https://images.igdb.com/igdb/image/upload/t_thumb/${option.cover.image_id}.jpg`
                : undefined
            }
            alt={option.name}
            style={{ width: 30, height: 30, borderRadius: "4px" }}
          />
          {option.name}
        </Box>
      )}
      renderInput={(params) => (
        <StyledTextField
          {...params}
          placeholder="Search games..."
          variant="outlined"
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      )}
    />
  );
};
