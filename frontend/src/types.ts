import type { MediaRecord } from "./tmdb";

export type DBMediaRecord = MediaRecord & {
  readonly id: string;
  readonly providers?: Provider[];
};

export type Provider = {
  readonly name: string;
  readonly logo_url: string | null;
  readonly type: "flatrate" | "rent" | "buy";
};
