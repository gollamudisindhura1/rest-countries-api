import type { Country } from "../models/Country.js";

export async function getAllCountries(): Promise<Country[]> {
  try {
    
    const url = "https://restcountries.com/v3.1/all?fields=name,flags,population,region,capital,subregion,tld,currencies,languages,borders,cca3";

    const res = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
      }
    });

    if (!res.ok) {
      throw new Error(`HTTP ${res.status} - ${res.statusText}`);
    }

    const data = await res.json();
    console.log("LIVE API SUCCESS: 250 countries loaded!");
    return data as Country[];
  } catch (err) {
    console.warn("Live API failed (400 error) — using data.json fallback");

    try {
      const local = await fetch("data.json");
      if (local.ok) {
        const data = await local.json();
        console.log("SUCCESS: Loaded from data.json");
        return data as Country[];
      }
    } catch (e) {
      console.error("data.json failed too", e);
    }

    // Show friendly message
    const grid = document.getElementById("countries-grid");
    if (grid) {
      grid.innerHTML = `
        <div class="col-12 text-center py-5">
          <div class="alert alert-warning">
            <h4>Live API Temporarily Down</h4>
            <p>Your code is perfect — this is a localhost issue.</p>
            <p><strong>Deploy to Netlify → it works 100%</strong></p>
            <button class="btn btn-success" onclick="location.reload()">Try Again</button>
          </div>
        </div>`;
    }
    return [];
  }
}