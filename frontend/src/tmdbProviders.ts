import axios from "axios";
import { supabase } from "./supabaseClient";
import type { DBMediaRecord, Provider } from "./types";

const TMDB_API_KEY = import.meta.env.VITE_TMDB_KEY;
const TMDB_BASE = "https://api.themoviedb.org/3";

const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p/w92";

export const fetchProviders = async (
  tmdb_id: number,
  type: "movie" | "tv",
  region: string = "US"
): Promise<Provider[]> => {
  try {
    const response = await axios.get(
      `${TMDB_BASE}/${type}/${tmdb_id}/watch/providers`,
      {
        params: {
          api_key: TMDB_API_KEY,
        },
      }
    );

    const data = response.data.results[region];
    if (!data) return [];

    const providerTypes: Array<"flatrate" | "rent" | "buy"> = [
      "flatrate",
      //   "rent",
      //   "buy",
    ];

    const providers: Provider[] = [];

    providerTypes.forEach((key) => {
      if (data[key]) {
        data[key].forEach((p: any) => {
          providers.push({
            name: p.provider_name,
            logo_url: p.logo_path ? `${TMDB_IMAGE_BASE}${p.logo_path}` : null,
            type: key,
          });
        });
      }
    });

    return providers;
  } catch (err) {
    console.error("Failed to fetch providers:", err);
    return [];
  }
};

export const getProvidersForRecord = async (
  record: DBMediaRecord,
  region: string = "US"
): Promise<Provider[]> => {
  if (record.providers && record.providers.length) return record.providers;

  const providers = await fetchProviders(record.tmdb_id, record.type, region);

  if (providers.length > 0) {
    const { error } = await supabase
      .from("titles")
      .update({ providers })
      .eq("id", record.id);

    if (error) console.error("Failed to update providers:", error);
  }

  return providers;
};
