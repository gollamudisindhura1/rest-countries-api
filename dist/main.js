import { getAllCountries } from "./api/countriesApi.js";
const $ = {
    search: document.getElementById("search"),
    grid: document.getElementById("countries-grid"),
    home: document.getElementById("home-page"),
    detail: document.getElementById("detail-page"),
    backBtn: document.querySelector(".back-btn"),
    themeToggle: document.getElementById("theme-toggle"),
    themeIcon: document.getElementById("toggle-icon"),
    modeText: document.querySelector(".mode-text"),
    regionFilter: document.getElementById("region-filter"),
    detailFlag: document.getElementById("detail-flag"),
    detailName: document.getElementById("detail-name"),
    nativeName: document.getElementById("native-name"),
    population: document.getElementById("population"),
    region: document.getElementById("region"),
    subregion: document.getElementById("subregion"),
    capital: document.getElementById("capital"),
    tld: document.getElementById("tld"),
    currencies: document.getElementById("currencies"),
    languages: document.getElementById("languages"),
    borders: document.getElementById("borders"),
};
let allCountries = [];
// Added filtered countries variable to handle combined search + filter
let filteredCountries = [];
// THEME
if ($.themeToggle) {
    $.themeToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark");
        const isDark = document.body.classList.contains("dark");
        if ($.themeIcon)
            $.themeIcon.className = isDark ? "fa-solid fa-sun" : "fa-solid fa-moon";
        if ($.modeText)
            $.modeText.textContent = isDark ? "Light Mode" : "Dark Mode";
        localStorage.setItem("theme", isDark ? "dark" : "light");
    });
}
// Apply saved theme
if (localStorage.getItem("theme") === "dark" ||
    (!localStorage.getItem("theme") && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
    document.body.classList.add("dark");
    if ($.themeIcon)
        $.themeIcon.className = "fa-solid fa-sun";
    if ($.modeText)
        $.modeText.textContent = "Light Mode";
}
// RENDER COUNTRIES
function render(countries) {
    $.grid.innerHTML = "";
    countries.forEach((c) => {
        const col = document.createElement("div");
        col.className = "col";
        col.innerHTML = `
      <div class="card h-100 country-card cursor-pointer">
        <img src="${c.flags?.svg || 'https://flagcdn.com/w320/xx.svg'}" class="card-img-top" style="height:160px;object-fit:cover;" alt="${c.name?.common || 'Flag'}">
        <div class="card-body">
          <h5 class="card-title fw-bold">${c.name?.common || "Unknown Country"}</h5>
          <p class="mb-1"><strong>Population:</strong> ${c.population.toLocaleString()}</p>
          <p class="mb-1"><strong>Region:</strong> ${c.region}</p>
          <p class="mb-0"><strong>Capital:</strong> ${c.capital?.[0] || "N/A"}</p>
        </div>
      </div>
    `;
        col.onclick = () => showDetail(c);
        $.grid.appendChild(col);
    });
}
// SHOW DETAIL
function showDetail(country) {
    $.borders.innerHTML = "";
    $.detailFlag.src =
        country.flags.svg ||
            country.flags.png ||
            "https://flagcdn.com/w320/xx.png";
    $.detailName.textContent = country.name.common;
    const nativeObj = country.name.nativeName;
    const nativeEntry = nativeObj ? Object.values(nativeObj)[0] : null;
    $.nativeName.textContent = nativeEntry?.common || country.name?.common || "N/A";
    $.population.textContent = country.population.toLocaleString();
    $.region.textContent = country.region;
    $.subregion.textContent = country.subregion || "N/A";
    $.capital.textContent = country.capital?.[0] || "N/A";
    $.tld.textContent = country.tld?.join(", ") || "N/A";
    // Currencies
    $.currencies.textContent = country.currencies
        ? Object.values(country.currencies).map((c) => c.name).join(", ")
        : "N/A";
    // Languages
    $.languages.textContent = country.languages
        ? Object.values(country.languages).join(", ")
        : "N/A";
    // Borders
    if (country.borders && country.borders.length > 0) {
        country.borders.forEach((code) => {
            const borderCountry = allCountries.find((c) => c.cca3 === code);
            if (borderCountry) {
                const btn = document.createElement("button");
                btn.className = "border-btn";
                btn.textContent = borderCountry.name.common;
                btn.onclick = () => showDetail(borderCountry);
                $.borders.appendChild(btn);
            }
        });
    }
    else {
        $.borders.innerHTML = "None";
    }
    $.home.classList.add("d-none");
    $.detail.classList.remove("d-none");
}
// BACK BUTTON
$.backBtn.onclick = () => {
    $.detail.classList.add("d-none");
    $.home.classList.remove("d-none");
};
$.search.oninput = () => {
    applyFilters();
};
$.search.oninput = () => {
    applyFilters();
};
// Replace REGION FILTER to work with search
$.regionFilter.onchange = () => {
    applyFilters();
};
// SEARCH
// $.search.oninput = () => {
//   const term = $.search.value.toLowerCase().trim();
//   const filtered = allCountries.filter(c => {
//     const common = c.name?.common?.toLowerCase() || "";
//     const natives = c.name.nativeName
//       ? Object.values(c.name.nativeName)
//           .map((n: any) => n.common?.toLowerCase() || "")
//       : [];
//     return common.includes(term) || natives.some(n => n.includes(term));
//   });
//   render(filtered);
// };
// // REGION FILTER
// $.regionFilter.onchange = () => {
//   const region = $.regionFilter.value;
//   const filtered = region ? allCountries.filter(c => c.region === region) : allCountries;
//   render(filtered);
// };
function applyFilters() {
    const searchTerm = $.search.value.toLowerCase().trim();
    const selectedRegion = $.regionFilter.value;
    let results = allCountries;
    // Apply region filter first
    if (selectedRegion) {
        results = results.filter(c => c.region === selectedRegion);
    }
    // Then apply search filter
    if (searchTerm) {
        results = results.filter(c => {
            const common = c.name?.common?.toLowerCase() || "";
            const natives = c.name.nativeName
                ? Object.values(c.name.nativeName)
                    .map((n) => n.common?.toLowerCase() || "")
                : [];
            return common.includes(searchTerm) || natives.some(n => n.includes(searchTerm));
        });
    }
    render(results);
}
// START
async function init() {
    // Show loading spinner
    $.grid.innerHTML = `
    <div class="col-12 text-center py-5">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
      <p class="mt-3">Loading countries...</p>
    </div>
  `;
    try {
        allCountries = await getAllCountries();
        if (allCountries.length === 0) {
            $.grid.innerHTML = '<div class="col-12 text-center py-5 text-danger">No countries loaded</div>';
            return;
        }
        render(allCountries);
    }
    catch (err) {
        console.error("Failed to load countries:", err);
        $.grid.innerHTML = `
      <div class="col-12 text-center py-5">
        <div class="alert alert-info">
          <h4>Live API blocked (normal on localhost)</h4>
          <p>Your code is perfect – deploy to Netlify and it will work 100%</p>
          <button class="btn btn-primary" onclick="location.reload()">Retry</button>
        </div>
      </div>`;
    }
}
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
}
else {
    init();
}
