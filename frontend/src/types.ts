import type { MediaRecord } from "./tmdb";

export type DBMediaRecord = MediaRecord & {
  readonly id: string;
};
