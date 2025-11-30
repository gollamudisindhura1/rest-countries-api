import type { Country } from "../models/Country.js";

export async function getAllCountries(): Promise<Country[]> {
// API (fast + small)
const apiURL = "https://api.allorigins.win/raw?url=" + encodeURIComponent(
  "https://restcountries.com/v3.1/all?fields=name,flags,population,region,capital,subregion,tld,currencies,languages,borders,cca3"
);
 try {
    // Fetch the URL directly
    const res = await fetch(apiURL, { mode: "cors" });

    if (!res.ok) {
      console.error("API status:", res.status, res.statusText);
      throw new Error("API failed");
    }

    const data = await res.json();
    return normalize(data);
  } catch (error) {
     console.warn("Live API blocked → using fallback /data.json");

    // Fallback 
    const res = await fetch("/data.json");
    const full = await res.json();

    return normalize(full);
  }
}


function normalize(raw: any[]): Country[] {
return raw.map(c => ({
name: {
  common: c.name?.common || c.name || "Unknown",

official: typeof c.name === "string" ? c.name : c.name?.official ?? "",
nativeName: c.name?.nativeName ?? {}
},
flags: {
svg: c.flags?.svg ?? c.flag ?? "",
png: c.flags?.png ?? "",
alt: ""
},
population: c.population ?? 0,
region: c.region ?? "Unknown",
capital: Array.isArray(c.capital) ? c.capital : c.capital ? [c.capital] : [],
subregion: c.subregion ?? "",
tld: c.tld ?? c.topLevelDomain ?? [],
currencies: c.currencies
? Array.isArray(c.currencies)
? Object.fromEntries(c.currencies.map((cur: any) => [cur.code, { name: cur.name, symbol: cur.symbol }]))
: c.currencies
: {},
languages: c.languages
? Array.isArray(c.languages)
? Object.fromEntries(c.languages.map((lang: any) => [lang.iso639_1, lang.name]))
: c.languages
: {},
borders: c.borders ?? [],
cca3: c.cca3 ?? c.alpha3Code ?? ""
}));
}
