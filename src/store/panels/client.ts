import axios from "axios";
import type { ApiKey } from "../apiSwitcher/types";

const cityToCoords: Record<string, { latitude: number; longitude: number }> = {
  berlin: { latitude: 52.52, longitude: 13.41 },
  munich: { latitude: 48.14, longitude: 11.58 },
  paris: { latitude: 48.85, longitude: 2.35 },
};

export async function fetchApiResponse(api: ApiKey, input: string) {
  switch (api) {
    case "cat":
      return (await axios.get(`https://catfact.ninja/fact`)).data;

    case "chuck":
      if (input.toLowerCase().startsWith("search")) {
        const query = input.replace(/^search\s+/i, "");
        return (
          await axios.get(
            `https://api.chucknorris.io/jokes/search?query=${query}`
          )
        ).data;
      } else {
        return (await axios.get(`https://api.chucknorris.io/jokes/random`))
          .data;
      }

    case "github":
      return (await axios.get(`https://api.github.com/search/users?q=${input}`))
        .data;

    case "weather":
      const coords = cityToCoords[input];
      if (!coords) {
        throw new Error(`Coordinates for city "${input}" not found`);
      }
      return (
        await axios.get(
          `https://api.open-meteo.com/v1/forecast?latitude=${coords.latitude}&longitude=${coords.longitude}&current_weather=true`
        )
      ).data;

    default:
      throw new Error("Unsupported API");
  }
}
