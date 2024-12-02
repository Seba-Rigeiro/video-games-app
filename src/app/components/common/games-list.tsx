import { FC } from "react";
import {
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
} from "@mui/material";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { getCoverUrl, Sizes } from "@/app/helpers/get-cover-url";
import { Cover } from "@/app/entities/game";

export interface GameProps {
  id: string;
  name: string;
  cover: Cover;
  first_release_date?: string;
}

interface GamesListProps {
  games: GameProps[];
  onClick?: (gameId: string) => void;
  onDelete?: (gameId: string) => void;
}
export const GamesList: FC<GamesListProps> = ({ games, onClick, onDelete }) => {
  return (
    <ImageList
      style={{ minWidth: "114px", minHeight: "152px" }}
      cols={3}
      gap={16}
    >
      {games.map((game) => (
        <ImageListItem key={game.id}>
          <img
            src={getCoverUrl(game.cover?.image_id ?? "", Sizes.BIG)}
            alt={game.name}
            style={{ borderRadius: "8px" }}
            onClick={() => onClick?.(game.id)}
          />
          {onDelete && (
            <ImageListItemBar
              style={{ backgroundColor: "transparent" }}
              actionIcon={
                <IconButton
                  style={{ backgroundColor: "#FFFFFFD9" }}
                  onClick={() => {
                    onDelete(game.id);
                  }}
                >
                  <DeleteOutlineOutlinedIcon />
                </IconButton>
              }
            />
          )}
        </ImageListItem>
      ))}
    </ImageList>
  );
};
