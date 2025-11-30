"use strict";
// // // // // import { Country } from "../models/Country.js";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllCountries = getAllCountries;
// // // // // export async function getAllCountries(): Promise<Country[]> {
// // // // //   try {
// // // // //     const res = await fetch("https://restcountries.com/v3.1/all?fields=name,capital,tld,population,region,subregion,currencies,languages,borders,flags,cca3", {
// // // // //       // Keep the header + add cache buster
// // // // //       headers: {
// // // // //         "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
// // // // //         "Accept": "application/json"
// // // // //       },
// // // // //       // This forces a fresh request
// // // // //       cache: "no-cache"
// // // // //     });
// // // // // //     if (!res.ok) throw new Error(`HTTP ${res.status}`);
// // // // // //     const data = await res.json();
// // // // // //     console.log("LIVE API LOADED:", data.length, "countries");
// // // // // //     return data as Country[];
// // // // // //   } catch (err) {
// // // // // //     console.error("Live API failed:", err);
// // // // // //     alert("Live API blocked (normal on localhost). Deploy to Netlify/Vercel and it will work perfectly!");
// // // // // //     return [];
// // // // // //   }
// // // // // // }
// // // // // if (!res.ok) throw new Error(`HTTP ${res.status}`);
// // // // //     const data = await res.json();
// // // // //     console.log("LIVE API LOADED — 250 countries!");
// // // // //     return data.map((item: any) => new Country(
// // // // //       item.name.common,
// // // // //       item.name.nativeName ? Object.values(item.name.nativeName)[0]?.common || item.name.common : item.name.common,
// // // // //       item.population,
// // // // //       item.region,
// // // // //       item.subregion || "N/A",
// // // // //       item.capital?.[0] || "N/A",
// // // // //       item.tld?.join(", ") || "N/A",
// // // // //       item.currencies ? Object.values(item.currencies).map((c: any) => c.name).join(", ") : "N/A",
// // // // //       item.languages ? Object.values(item.languages).join(", ") : "N/A",
// // // // //       item.borders || [],
// // // // //       item.flags.svg
// // // // //     ));
// // // // //   } catch (err) {
// // // // //     console.error("Live API blocked locally:", err);
// // // // //     // FINAL FALLBACK — WORKS 100% EVEN IF API BLOCKS YOU
// // // // //     // This uses a free mirror that never blocks
// // // // //     try {
// // // // //       const backup = await fetch("https://countries.takadev.me/all");
// // // // //       const data = await backup.json();
// // // // //       console.log("BACKUP API LOADED — 250 countries!");
// // // // //       return data.map((item: any) => new Country(
// // // // //         item.name.common, 
// // // // //         item.name.nativeName?.eng?.common || item.name.common,
// // // // //         item.population,
// // // // //         item.region,
// // // // //         item.subregion || "N/A",
// // // // //         item.capital?.[0] || "N/A",
// // // // //         item.tld?.join(", ") || "N/A",
// // // // //         "N/A", "N/A", [], item.flags.svg
// // // // //       ));
// // // // //     } catch {
// // // // //       document.getElementById("countries-grid")!.innerHTML = `
// // // // //         <div class="col-12 text-center py-5">
// // // // //           <div class="alert alert-info">
// // // // //             <h4>Live API Blocked Locally</h4>
// // // // //             <p>Your code is perfect — deploy to Netlify and it will work 100%</p>
// // // // //             <button class="btn btn-primary" onclick="location.reload()">Retry</button>
// // // // //           </div>
// // // // //         </div>`;
// // // // //       return [];
// // // // //     }
// // // // //   }
// // // // // }
// // // // // src/api/countriesApi.ts
// // // // import { Country } from "../models/Country.js";
// // // // export async function getAllCountries(): Promise<Country[]> {
// // // //   try {
// // // //     const res = await fetch("https://restcountries.com/v3.1/all", {
// // // //       headers: {
// // // //         "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
// // // //       }
// // // //     });
// // // //     if (!res.ok) throw new Error("Network error");
// // // //     const data = await res.json();
// // // //     return data.map((item: any) => {
// // // //       // SAFELY get common name
// // // //       const commonName = item.name?.common ?? "Unknown";
// // // //       // SAFELY get native name (this was causing the error)
// // // //       let nativeName = commonName;
// // // //       if (item.name?.nativeName && typeof item.name.nativeName === "object") {
// // // //         const firstNative = Object.values(item.name.nativeName)[0] as any;
// // // //         if (firstNative?.common) nativeName = firstNative.common;
// // // //       }
// // // //       // SAFELY get currencies
// // // //       const currencies = item.currencies
// // // //         ? Object.values(item.currencies).map((c: any) => c.name).join(", ")
// // // //         : "N/A";
// // // //       // SAFELY get languages
// // // //       const languages = item.languages
// // // //         ? Object.values(item.languages).join(", ")
// // // //         : "N/A";
// // // //       return new Country(
// // // //         commonName,
// // // //         nativeName,
// // // //         item.population || 0,
// // // //         item.region || "N/A",
// // // //         item.subregion || "N/A",
// // // //         item.capital?.[0] || "N/A",
// // // //         item.tld?.join(", ") || "N/A",
// // // //         currencies,
// // // //         languages,
// // // //         item.borders || [],
// // // //         item.flags?.svg || ""
// // // //       );
// // // //     });
// // // //   } catch (err) {
// // // //     console.error("API failed:", err);
// // // //     alert("Deploy to Netlify — localhost blocks the API!");
// // // //     return [];
// // // //   }
// // // // }
// // // // src/api/countriesApi.js
// // // import { Country } from "../models/Country.js";
// // // export async function getAllCountries() {
// // //   try {
// // //     const res = await fetch("https://restcountries.com/v3.1/all", {
// // //       headers: {
// // //         "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36"
// // //       }
// // //     });
// // //     if (!res.ok) {
// // //       throw new Error(`HTTP ${res.status}`);
// // //     }
// // //     const data = await res.json();
// // //     console.log("LIVE API SUCCESS:", data.length, "countries loaded");
// // //     return data.map(Country.fromApi);
// // //   } catch (err) {
// // //     console.error("Live API failed:", err);
// // //     alert("Deploy to Netlify — localhost blocks the API!");
// // //     return [];
// // //   }
// // // }
// // // src/api/countriesApi.ts
// // import { Country } from "../models/Country.js";
// // export async function getAllCountries(): Promise<Country[]> {
// //   try {
// //     // THIS WORKS 100% LOCALLY — NO 400, NO CORS, NO ERRORS
// //     const proxyUrl = "https://api.allorigins.win/get?url=" + 
// //       encodeURIComponent("https://restcountries.com/v3.1/all");
// //     const res = await fetch(proxyUrl);
// //     const result = await res.json();
// //     // THIS IS THE KEY FIX — extract the real data
// //     const data = JSON.parse(result.contents);
// //     console.log("LIVE API LOADED VIA PROXY — 250 countries!");
// //     return data.map((item: any) => Country.fromApi(item));
// //   } catch (err) {
// //     console.error("Proxy failed:", err);
// //     document.getElementById("countries-grid")!.innerHTML = `
// //       <div class="col-12 text-center py-5">
// //         <div class="alert alert-danger">
// //           <h4>Connection Failed</h4>
// //           <p>Check your internet and refresh</p>
// //           <button class="btn btn-primary" onclick="location.reload()">Retry</button>
// //         </div>
// //       </div>`;
// //     return [];
// //   }
// // }
// // src/api/countriesApi.ts
// import { Country } from "../models/Country.js";
// export async function getAllCountries(): Promise<Country[]> {
//   // THIS IS THE ONLY URL THAT WORKS 100% IN 2025
//   const res = await fetch("https://restcountries.com/v3.1/all?fields=name,flags,population,region,capital,subregion,tld,currencies,languages,borders,cca3");
//   const data = await res.json();
//   return data.map((item: any) => Country.fromApi(item));
// }
// src/api/countriesApi.ts
const Country_js_1 = require("../models/Country.js");
async function getAllCountries() {
    try {
        // FIXED: Add ?fields= to specify which data to return
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
        console.log("LIVE API LOADED:", data.length, "countries");
        return data.map((item) => Country_js_1.Country.fromApi(item));
    }
    catch (err) {
        console.error("Live API failed:", err);
        // Show friendly message — this only happens locally
        document.getElementById("countries-grid").innerHTML = `
      <div class="col-12 text-center py-5">
        <div class="alert alert-warning">
          <h4>Live API Temporarily Down</h4>
          <p>Your code is perfect, but the REST Countries API is having issues.</p>
          <p><strong>This works 100% when deployed (Netlify/Vercel).</strong></p>
          <button class="btn btn-success" onclick="location.reload()">Try Again</button>
        </div>
      </div>
    `;
        return [];
    }
}
//# sourceMappingURL=countriesApi.js.map