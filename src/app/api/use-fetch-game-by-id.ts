import useSWR from "swr";
import { Game } from "@/app/entities/game";
import { formatDate } from "@/app/helpers/format-date";
import { fetcher } from "./fetcher";

export function useFetchGameById(gameId: string) {
  const query = `
      fields cover.image_id, name, involved_companies.company.name, rating, first_release_date, genres.name, summary, platforms.name, similar_games.name, 
        similar_games.cover.image_id, 
        screenshots.image_id;
      where id = ${gameId};
    `;

  const { data, error, isLoading } = useSWR<Game[]>(query, fetcher);

  const defaultGame: Game = {
    id: gameId,
    cover: {
      id: "",
      image_id: "",
    },
    name: "",
    involved_companies: [],
    rating: 0,
    first_release_date: "",
    genres: [],
    summary: "",
    platforms: [],
    similar_games: [],
    screenshots: [],
  };

  const game = data?.[0]
    ? {
        ...defaultGame,
        ...data[0],
        first_release_date: formatDate(data[0].first_release_date),
      }
    : defaultGame;

  return {
    game,
    isLoading,
    isError: error,
  };
}
