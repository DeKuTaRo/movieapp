export interface MovieDataType {
  id: string;
  title?: string;
  name?: string;
  original_title?: string;
  original_name?: string;
  backdrop_path: string;
  poster_path: string;
  overview: string;
  release_date?: string;
  first_air_date?: string;
  vote_average: string;
  genre_ids: number[];
  runtime?: string;
  status?: string;
  spoken_languages?: Language[];
  last_air_date?: string;
  tagline: string;
  genres: GenresData[];
  profile_path?: string;
  mediaType?: string;
}

export interface GenresData {
  id: number;
  name: string;
}

interface Language {
  english_name: string;
  iso_639_1: string;
  name: string;
}

export interface DetailCastMovie {
  id: string;
  name: string;
  original_name: string;
  profile_path: string;
}

interface ListsDetailReview {
  author: string;
  author_details: {
    name: string;
    username: string;
    avatar_path: string;
    rating: number;
  };
  content: string;
  id: string;
  created_at: string;
  updated_at: string;
  url: string;
}

export interface DetailReviewMovie {
  id: number;
  page: number;
  results: ListsDetailReview[];
  total_pages: number;
  total_results: number;
}

export interface DetailMediaMovie {
  id: string;
  results: {
    id: string;
    name: string;
    key: string;
    type: string;
  }[];
}
