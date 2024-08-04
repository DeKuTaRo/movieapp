export interface MovieDataType {
  id: string;
  title?: string;
  name?: string;
  original_title?: string;
  original_name?: string;
  backdrop_path?: string;
  poster_path?: string;
  overview?: string;
  release_date?: string;
  first_air_date?: string;
  vote_average?: string;
  genre_ids?: number[];
  runtime?: string;
  status?: string;
  spoken_languages?: Language[];
  last_air_date?: string;
  tagline?: string;
  genres?: GenresData[];
  profile_path?: string;
  mediaType?: string;
  number_of_seasons?: number;
  number_of_episodes?: number;
  seasons?: [
    {
      air_date: string;
      episode_count: number;
      id: number;
      name: string;
      overview: string;
      poster_path: string;
      season_number: number;
      vote_average: number;
    }
  ];
  popularity?: number;

  // person detail
  biography?: string;
  birthday?: string;
  deathday?: string;
  gender?: number;
  known_for_department?: string;
  place_of_birth?: string;
  media_type?: string;
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

export interface ExtenalIDs {
  id: string;
  imdb_id: string;
  wikidata_id: string;
  facebook_id: string;
  instagram_id: string;
  tiktok_id: string;
  twitter_id: string;
  youtube_id: string;
}

export enum Gender {
  "Not set / not specified",
  "Female",
  "Male",
  "Non-binary",
}

export interface User {
  displayName: string | null;
  email: string | null;
  emailVerified: boolean;
  photoURL: string | null;
  uid: string;
}

export interface CredentialsProps {
  firstName?: string;
  lastName?: string;
  displayName?: string | null;
  email: string;
  password: string;
}

export interface BookmarkProps {
  type: 'movie' | 'tv';
  id: string;
  title: string;
  url: string;
}