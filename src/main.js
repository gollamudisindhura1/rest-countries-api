"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/main.ts
const countriesApi_js_1 = require("./api/countriesApi.js");
const $ = {
    search: document.getElementById("search"),
    grid: document.getElementById("countries-grid"),
    home: document.getElementById("home-page"),
    detail: document.getElementById("detail-page"),
    backBtn: document.querySelector(".back-btn"),
    themeToggle: document.querySelector(".theme-toggle-area"),
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
// THEME
$.themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    const isDark = document.body.classList.contains("dark");
    $.themeIcon.className = isDark ? "fa-solid fa-sun" : "fa-solid fa-moon";
    $.modeText.textContent = isDark ? "Light Mode" : "Dark Mode";
    localStorage.setItem("theme", isDark ? "dark" : "light");
});
if (localStorage.getItem("theme") === "dark" ||
    (!localStorage.getItem("theme") && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
    document.body.classList.add("dark");
    $.themeIcon.className = "fa-solid fa-sun";
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
        <img src="${c.flag}" class="card-img-top" style="height:160px;object-fit:cover;" alt="${c.name}">
        <div class="card-body">
          <h5 class="card-title fw-bold">${c.name}</h5>
          <p class="mb-1"><strong>Population:</strong> ${c.population.toLocaleString()}</p>
          <p class="mb-1"><strong>Region:</strong> ${c.region}</p>
          <p class="mb-0"><strong>Capital:</strong> ${c.capital}</p>
        </div>
      </div>
    `;
        col.onclick = () => showDetail(c);
        $.grid.appendChild(col);
    });
}
// SHOW DETAIL
function showDetail(c) {
    $.detailFlag.src = c.flag;
    $.detailName.textContent = c.name;
    $.nativeName.textContent = c.nativeName;
    $.population.textContent = c.population.toLocaleString();
    $.region.textContent = c.region;
    $.subregion.textContent = c.subRegion;
    $.capital.textContent = c.capital;
    $.tld.textContent = c.topLevelDomain;
    $.currencies.textContent = c.currencies;
    $.languages.textContent = c.languages;
    // Borders
    $.borders.innerHTML = "";
    if (c.borders.length > 0) {
        c.borders.forEach(borderName => {
            const btn = document.createElement("button");
            btn.className = "border-btn me-2 mb-2";
            btn.textContent = borderName;
            btn.onclick = () => {
                const found = allCountries.find(x => x.name === borderName);
                if (found)
                    showDetail(found);
            };
            $.borders.appendChild(btn);
        });
    }
    else {
        $.borders.innerHTML = '<span class="text-muted">None</span>';
    }
    $.home.classList.add("d-none");
    $.detail.classList.remove("d-none");
}
$.backBtn.onclick = () => {
    $.detail.classList.add("d-none");
    $.home.classList.remove("d-none");
};
// SEARCH
$.search.oninput = () => {
    const term = $.search.value.toLowerCase().trim();
    const filtered = allCountries.filter(c => c.name.toLowerCase().includes(term) ||
        c.nativeName.toLowerCase().includes(term));
    render(filtered);
};
// REGION FILTER
$.regionFilter.onchange = () => {
    const region = $.regionFilter.value;
    const filtered = region ? allCountries.filter(c => c.region === region) : allCountries;
    render(filtered);
};
// START
async function init() {
    try {
        allCountries = await (0, countriesApi_js_1.getAllCountries)();
        if (allCountries.length === 0) {
            $.grid.innerHTML = '<div class="col-12 text-center py-5 text-danger">No countries loaded</div>';
            return;
        }
        render(allCountries);
    }
    catch {
        $.grid.innerHTML = '<div class="col-12 text-center py-5 text-danger">Failed to load countries</div>';
    }
}
init();
//# sourceMappingURL=main.js.map