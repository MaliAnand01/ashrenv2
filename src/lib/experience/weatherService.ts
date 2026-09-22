import { WeatherCondition, WeatherData, TimeOfDay } from "./types";

export function resolveTimeOfDay(date = new Date()): TimeOfDay {
  const hour = date.getHours();
  if (hour >= 5 && hour < 11) return "morning";
  if (hour >= 11 && hour < 17) return "day";
  if (hour >= 17 && hour < 21) return "evening";
  return "night";
}

/** Zomato/Blinkit-style contextual greeting driven by time of day. */
export function getGreeting(timeOfDay: TimeOfDay): string {
  switch (timeOfDay) {
    case "morning":
      return "Good morning";
    case "day":
      return "Good afternoon";
    case "evening":
      return "Good evening";
    case "night":
    default:
      return "Good night";
  }
}

/** Short, human, non-clinical label for a weather condition (no "weather app" jargon). */
export function getWeatherLabel(condition: WeatherCondition | string): string {
  const cond = condition.toLowerCase();
  if (cond.includes("storm")) return "Stormy";
  if (cond.includes("heavy-rain")) return "Heavy rain";
  if (cond.includes("rain") || cond.includes("shower")) return "Rainy";
  if (cond.includes("snow")) return "Snowy";
  if (cond.includes("fog")) return "Foggy";
  if (cond.includes("wind")) return "Windy";
  if (cond.includes("sunrise")) return "Sunrise";
  if (cond.includes("sunset")) return "Sunset";
  if (cond.includes("cloudy-night")) return "Cloudy night";
  if (cond.includes("night")) return "Clear night";
  if (cond.includes("partly-cloudy")) return "Partly cloudy";
  if (cond.includes("cloudy")) return "Cloudy";
  return "Clear sky";
}

/**
 * Rotating, Zomato/Blinkit-style contextual one-liners for the hero's location strip.
 * Blends weather + time-of-day + always-on commerce trust lines so the strip never
 * repeats the same message twice in a row and never reads like a weather app.
 */
export function getContextualMessages(
  condition: WeatherCondition | string,
  timeOfDay: TimeOfDay,
  city: string
): string[] {
  const cond = condition.toLowerCase();
  const messages: string[] = [];

  if (cond.includes("storm")) {
    messages.push(`Stormy over ${city} tonight — we still dispatch on time`);
  } else if (cond.includes("heavy-rain") || cond.includes("rain") || cond.includes("shower")) {
    messages.push(`Rain over ${city} — cozy indoor picks, delivered dry & safe`);
  } else if (cond.includes("snow")) {
    messages.push(`Snowy out there — warm studio audio picks inside`);
  } else if (cond.includes("fog")) {
    messages.push(`Foggy morning over ${city} — clear picks, sharp visuals`);
  } else if (cond.includes("wind")) {
    messages.push(`Windy skies today — our drones are rated for it`);
  } else if (timeOfDay === "night") {
    messages.push(`Late night browsing — our WhatsApp desk never sleeps`);
  } else if (timeOfDay === "morning") {
    messages.push(`Fresh ${city} morning — new arrivals just inspected`);
  } else if (cond.includes("sunset")) {
    messages.push(`Golden hour over ${city} — the light gold deserves`);
  } else {
    messages.push(`Clear skies over ${city} — crisp shots, sharp shipping`);
  }

  messages.push("Safe Delivery All Over India");
  messages.push("Direct Jaipur Karigars • Zero Middlemen");
  messages.push("Order in 60 Seconds on WhatsApp");

  return messages;
}

/**
 * A single accent hue per condition, used to tint the live weather chip
 * (glow, icon ring) so the header feels alive without reading as a weather widget.
 */
export function getWeatherAccent(condition: WeatherCondition | string): string {
  const cond = condition.toLowerCase();
  if (cond.includes("storm")) return "#7c8cff";
  if (cond.includes("heavy-rain") || cond.includes("rain") || cond.includes("shower")) return "#4bc8e7";
  if (cond.includes("snow") || cond.includes("fog")) return "#c7d2e0";
  if (cond.includes("wind")) return "#8fd6de";
  if (cond.includes("sunrise")) return "#f2a65a";
  if (cond.includes("sunset")) return "#e8825a";
  if (cond.includes("night")) return "#8b9dfc";
  return "#d4af37";
}

export async function fetchNormalizedWeather(
  lat: number,
  lon: number
): Promise<WeatherData> {
  const timeOfDay = resolveTimeOfDay();
  const isNight = timeOfDay === "night";

  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m&timezone=auto`;
    const res = await fetch(url, { signal: AbortSignal.timeout(3500) });
    if (!res.ok) throw new Error("Weather fetch failed");
    const json = await res.json();
    const curr = json.current;

    const weatherCode: number = curr.weather_code ?? 0;
    let condition: WeatherCondition = isNight ? "clear-night" : "clear-day";

    if (weatherCode >= 95) {
      condition = "storm";
    } else if (weatherCode >= 80 || weatherCode >= 61) {
      condition = weatherCode >= 65 ? "heavy-rain" : "rain";
    } else if (weatherCode >= 51 && weatherCode <= 57) {
      condition = "rain";
    } else if (weatherCode >= 45 && weatherCode <= 48) {
      condition = "fog";
    } else if (weatherCode >= 71 && weatherCode <= 77) {
      condition = "snow";
    } else if (weatherCode === 1 || weatherCode === 2) {
      condition = isNight ? "cloudy-night" : "partly-cloudy";
    } else if (weatherCode === 3) {
      condition = isNight ? "cloudy-night" : "cloudy";
    } else if (curr.wind_speed_10m > 35) {
      condition = "wind";
    }

    return {
      condition,
      temperature: Math.round(curr.temperature_2m ?? 28),
      feelsLike: Math.round(curr.apparent_temperature ?? 29),
      humidity: Math.round(curr.relative_humidity_2m ?? 55),
      windSpeed: Math.round(curr.wind_speed_10m ?? 12),
      precipitation: curr.precipitation ?? 0,
      sunrise: "05:58 AM",
      sunset: "06:42 PM",
    };
  } catch {
    // Realistic Indian climate default fallback
    return {
      condition: isNight ? "clear-night" : "clear-day",
      temperature: 28,
      feelsLike: 29,
      humidity: 50,
      windSpeed: 10,
      precipitation: 0,
      sunrise: "06:00 AM",
      sunset: "06:45 PM",
    };
  }
}
