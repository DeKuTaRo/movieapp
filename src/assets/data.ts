export interface MovieDataType {
  id: string;
  title: string;
  backdrop_path: string;
  poster_path: string;
  overview: string;
  release_date: string;
  vote_average: string;
  genre_ids: number[];
}

export interface TVDataType {
  id: string;
  original_name: string;
  backdrop_path: string;
  poster_path: string;
  overview: string;
  first_air_date: string;
  vote_average: string;
  genre_ids: number[];
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

export interface DetailsMovie {
  id: string;
  title?: string;
  original_name?: string;
  backdrop_path: string;
  runtime: string;
  status: string;
  spoken_languages: Language[];
  poster_path: string;
  overview: string;
  release_date?: string;
  last_air_date?: string;
  vote_average: string;
  genres: GenresData[];
  tagline: string;
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

export interface DetailSimilarMovie {
  id: string;
  poster_path: string;
  title: string;
  release_date: string;
}

export interface ListMoviesSearch {
  id: string;
  title: string;
  vote_average: number;
  poster_path: string;
}
