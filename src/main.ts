import { getAllCountries } from "./api/countriesApi.js";
import type { Country } from "./models/Country.js";

const $ = {
  search: document.getElementById("search") as HTMLInputElement,
  grid: document.getElementById("countries-grid") as HTMLElement,
  home: document.getElementById("home-page") as HTMLElement,
  detail: document.getElementById("detail-page") as HTMLElement,
  backBtn: document.querySelector(".back-btn") as HTMLButtonElement,
  themeToggle: document.querySelector(".theme-toggle-area") as HTMLElement,
  themeIcon: document.getElementById("toggle-icon") as HTMLElement,
  modeText: document.querySelector(".mode-text") as HTMLElement,
  regionFilter: document.getElementById("region-filter") as HTMLSelectElement,
  detailFlag: document.getElementById("detail-flag") as HTMLImageElement,
  detailName: document.getElementById("detail-name") as HTMLElement,
  nativeName: document.getElementById("native-name") as HTMLElement,
  population: document.getElementById("population") as HTMLElement,
  region: document.getElementById("region") as HTMLElement,
  subregion: document.getElementById("subregion") as HTMLElement,
  capital: document.getElementById("capital") as HTMLElement,
  tld: document.getElementById("tld") as HTMLElement,
  currencies: document.getElementById("currencies") as HTMLElement,
  languages: document.getElementById("languages") as HTMLElement,
  borders: document.getElementById("borders") as HTMLElement,
};

let allCountries: Country[] = [];

// THEME
$.themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  const isDark = document.body.classList.contains("dark");
  $.themeIcon.className = isDark ? "fa-solid fa-sun" : "fa-solid fa-moon";
  $.modeText.textContent = isDark ? "Light Mode" : "Dark Mode";
  localStorage.setItem("theme", isDark ? "dark" : "light");
});

if (
  localStorage.getItem("theme") === "dark" ||
  (!localStorage.getItem("theme") && window.matchMedia("(prefers-color-scheme: dark)").matches)
) {
  document.body.classList.add("dark");
  $.themeIcon.className = "fa-solid fa-sun";
  $.modeText.textContent = "Light Mode";
}

// RENDER CARDS
function render(countries: Country[]) {
  $.grid.innerHTML = "";
  countries.forEach((c) => {
    const col = document.createElement("div");
    col.className = "col";

    //  c.name.common is defined in real API
    const name = c.name?.common ?? "Unknown";

    col.innerHTML = `
      <div class="card h-100 country-card cursor-pointer">
        <img src="${c.flags.svg}" class="card-img-top" style="height:160px;object-fit:cover;" alt="${name}">
        <div class="card-body">
          <h5 class="card-title fw-bold">${name}</h5>
          <p class="mb-1"><strong>Population:</strong> ${c.population.toLocaleString()}</p>
          <p class="mb-1"><strong>Region:</strong> ${c.region}</p>
          <p class="mb-0"><strong>Capital:</strong> ${c.capital?.[0] ?? "N/A"}</p>
        </div>
      </div>
    `;
    col.onclick = () => showDetail(c);
    $.grid.appendChild(col);
  });
}

// DETAIL PAGE
function showDetail(c: Country) {
  $.detailFlag.src = c.flags.svg;

  const name = c.name?.common ?? "Unknown";
  const native = c.name?.nativeName
    ? Object.values(c.name.nativeName)[0]?.common ?? name
    : name;

  $.detailName.textContent = name;
  $.nativeName.textContent = native;
  $.population.textContent = c.population.toLocaleString();
  $.region.textContent = c.region;
  $.subregion.textContent = c.subregion ?? "N/A";
  $.capital.textContent = c.capital?.[0] ?? "N/A";
  $.tld.textContent = c.tld?.join(", ") ?? "N/A";

  $.currencies.textContent = c.currencies
    ? Object.values(c.currencies)
        .map((cur: any) => cur.name)
        .join(", ")
    : "N/A";

  $.languages.textContent = c.languages
    ? Object.values(c.languages).join(", ")
    : "N/A";

  $.borders.innerHTML = "";
  if (c.borders?.length) {
    c.borders.forEach((code) => {
      const borderCountry = allCountries.find((x) => x.cca3 === code);
      if (borderCountry) {
        const btn = document.createElement("button");
        btn.className = "border-btn me-2 mb-2";
        btn.textContent = borderCountry.name?.common ?? "Unknown";
        btn.onclick = () => showDetail(borderCountry);
        $.borders.appendChild(btn);
      }
    });
  } else {
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
  const filtered = allCountries.filter((c) =>
    (c.name?.common ?? "").toLowerCase().includes(term)
  );
  render(filtered);
};

// REGION FILTER
$.regionFilter.onchange = () => {
  const region = $.regionFilter.value;
  const filtered = region
    ? allCountries.filter((c) => c.region === region)
    : allCountries;
  render(filtered);
};

// START APP
async function init() {
  try {
    allCountries = await getAllCountries();
    if (allCountries.length === 0) {
      $.grid.innerHTML = '<div class="col-12 text-center py-5 text-danger">No countries loaded</div>';
      return;
    }
    render(allCountries);
  } catch (err) {
    $.grid.innerHTML = '<div class="col-12 text-center py-5 text-danger">Failed to load countries</div>';
  }
}

init();