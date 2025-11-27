// 
// src/api/countriesApi.ts  ← TEMPORARY TEST VERSION
import type { Country } from "../models/Country.js";

export async function getAllCountries(): Promise<Country[]> {
  console.log("FORCING data.json — ignoring live API completely");

  try {
    const res = await fetch("data.json"); // ← This will NEVER be blocked
    if (!res.ok) throw new Error("data.json not found");
    const data = await res.json();
    console.log("SUCCESS: Loaded", data.length, "countries from data.json");
    return data;
  } catch (err) {
    console.error("FAILED to load data.json → check file location!");
    throw err;
  }
}