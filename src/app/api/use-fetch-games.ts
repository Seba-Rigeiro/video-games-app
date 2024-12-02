import useSWR from "swr";
import { fetcher } from "./fetcher";

export function useFetchGames(value: string) {
  const query = `search "${value}"; fields name, cover.image_id ; limit 10;`;

  const { data, error, isLoading } = useSWR(query, fetcher);

  return {
    games: data,
    isLoading,
    isError: error,
  };
}
