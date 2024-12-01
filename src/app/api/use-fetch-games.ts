import useSWR from "swr";
import { Game } from "../entities/game";
import { formatDate } from "../helpers/format-date";

const fetcher = async (query: string) => {
  const response = await fetch("/api/fetch", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query }),
  });

  if (!response.ok) {
    throw new Error("Error fetching games");
  }

  return response.json();
};

export function useFetchGames(value: string) {
  const query = `search "${value}"; fields name, cover.image_id ; limit 10;`;

  const { data, error, isLoading } = useSWR(query, fetcher);

  return {
    games: data,
    isLoading,
    isError: error,
  };
}

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
