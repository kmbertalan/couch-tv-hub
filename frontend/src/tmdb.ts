import axios from "axios";

const TMDB_API_KEY = import.meta.env.VITE_TMDB_KEY;
const TMDB_BASE = "https://api.themoviedb.org/3";

type TmdbMovie = {
  readonly id: number;
  readonly title: string;
  readonly poster_path: string | null;
  readonly overview: string;
  readonly release_date: string | null;
};

type TmdbTV = {
  readonly id: number;
  readonly name: string;
  readonly poster_path: string | null;
  readonly overview: string;
  readonly first_air_date: string | null;
};

export type MediaRecord = {
  readonly tmdb_id: number;
  readonly title: string;
  readonly type: "movie" | "tv";
  readonly poster_url: string | null;
  readonly overview: string;
  readonly release_date: string | null;
};

const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p/w500";

export const mapMovieToRecord = (movie: TmdbMovie): MediaRecord => ({
  tmdb_id: movie.id,
  title: movie.title,
  type: "movie",
  poster_url: movie.poster_path
    ? `${TMDB_IMAGE_BASE}${movie.poster_path}`
    : null,
  overview: movie.overview,
  release_date: movie.release_date || null,
});

export const mapTVToRecord = (tv: TmdbTV): MediaRecord => ({
  tmdb_id: tv.id,
  title: tv.name,
  type: "tv",
  poster_url: tv.poster_path ? `${TMDB_IMAGE_BASE}${tv.poster_path}` : null,
  overview: tv.overview,
  release_date: tv.first_air_date || null,
});

export const searchMovie = async (title: string): Promise<MediaRecord[]> => {
  const response = await axios.get(`${TMDB_BASE}/search/movie`, {
    params: {
      api_key: TMDB_API_KEY,
      query: title,
    },
  });
  return response.data.results.map(mapMovieToRecord);
};

export const searchTV = async (title: string): Promise<MediaRecord[]> => {
  const response = await axios.get(`${TMDB_BASE}/search/tv`, {
    params: {
      api_key: TMDB_API_KEY,
      query: title,
    },
  });
  return response.data.results.map(mapTVToRecord);
};
