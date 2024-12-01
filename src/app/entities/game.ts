export interface Game {
  id: string;
  cover: Cover;
  genres: Genre[];
  involved_companies: InvolvedCompany[];
  name: string;
  platforms: Platform[];
  rating: number;
  first_release_date: number | string;
  screenshots: Cover[];
  similar_games: SimilarGame[];
  summary: string;
}

export interface Cover {
  id: string | number;
  image_id: string;
}

export interface Genre {
  id: number;
  name: string;
}

interface Company {
  id: number;
  name: string;
}

export interface InvolvedCompany {
  id: number;
  company: Company;
}

export interface Platform {
  id: number;
  name: string;
}

interface SimilarGame {
  id: string;
  cover: Cover;
  name: string;
}
