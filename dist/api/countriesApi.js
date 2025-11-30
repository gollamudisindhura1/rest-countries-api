export async function getAllCountries() {
    try {
        // Try optimized API (fast + small)
        const res = await fetch("[https://restcountries.com/v3.1/all?fields=name,flags,population,region,capital,subregion,tld,currencies,languages,borders,cca3](https://restcountries.com/v3.1/all?fields=name,flags,population,region,capital,subregion,tld,currencies,languages,borders,cca3)");
        if (!res.ok)
            throw new Error("API failed");
        const data = await res.json();
        return normalize(data);
    }
    catch (error) {
        console.warn("Live API blocked → using fallback");
        // Fallback to full dataset
        const res = await fetch("./data.json");
        const full = await res.json();
        return normalize(full);
    }
}
function normalize(raw) {
    return raw.map(c => ({
        name: {
            common: typeof c.name === "string" ? c.name : c.name?.common ?? "Unknown",
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
                ? Object.fromEntries(c.currencies.map((cur) => [cur.code, { name: cur.name, symbol: cur.symbol }]))
                : c.currencies
            : {},
        languages: c.languages
            ? Array.isArray(c.languages)
                ? Object.fromEntries(c.languages.map((lang) => [lang.iso639_1, lang.name]))
                : c.languages
            : {},
        borders: c.borders ?? [],
        cca3: c.cca3 ?? c.alpha3Code ?? ""
    }));
}
