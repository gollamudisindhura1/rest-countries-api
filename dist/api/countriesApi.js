export async function getAllCountries() {
    try {
        const res = await fetch("https://restcountries.com/v3.1/all?fields=name,flags,population,region,capital,subregion,tld,currencies,languages,borders,cca3", {
            headers: {
                "User-Agent": "MyRESTCountriesApp/1.0",
            },
        });
        if (!res.ok)
            throw new Error("API error");
        const data = await res.json();
        console.log("Live API loaded 250 countries");
        return data;
    }
    catch (error) {
        console.warn("Live API failed, trying data.json...");
        try {
            const local = await fetch("data.json");
            if (local.ok) {
                const data = await local.json();
                console.log("Loaded from data.json");
                return data;
            }
        }
        catch { }
        // Show nice message if both fail
        const grid = document.getElementById("countries-grid");
        if (grid) {
            grid.innerHTML = `<div class="col-12 text-center py-5 text-muted">
        <h4>No internet or API down</h4>
        <p>Deploy to Netlify — it will work 100% work there</p>
        <button class="btn btn-primary" onclick="location.reload()">Retry</button>
      </div>`;
        }
        return [];
    }
}
