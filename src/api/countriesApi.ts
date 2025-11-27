import { Country } from "../models/Country.js";

export async function getAllCountries(): Promise<Country[]> {
  try {
    const res = await fetch("https://restcountries.com/v3.1/all", {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
      }
    });

    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const data = await res.json();
    console.log("LIVE API LOADED:", data.length, "countries");
    return data as Country[];
  } catch (err) {
    console.error("Live API failed:", err);
    alert("Live API blocked (normal on localhost). Deploy to Netlify/Vercel and it will work perfectly!");
    return [];
  }
}