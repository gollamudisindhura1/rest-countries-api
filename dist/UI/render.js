import { $ } from "../utils/dom.js";
let allCountries = [];
export function setCountries(countries) {
    allCountries = countries;
}
export function renderCountries(countries) {
    $.grid.innerHTML = "";
    countries.forEach(c => {
        // THIS IS THE FIX — get name safely
        const countryName = c.name?.common ||
            c.name?.official ||
            Object.values(c.name?.nativeName || {})[0]?.common ||
            "Unknown Country";
        const col = document.createElement("div");
        col.className = "col-12 col-sm-6 col-lg-4 col-xl-3";
        col.innerHTML = `
      <div class="card h-100 country-card shadow-sm cursor-pointer">
        <img src="${c.flags.svg}" class="card-img-top" style="height:160px;object-fit:cover;" alt="${countryName}">
        <div class="card-body">
          <h5 class="card-title fw-bold">${countryName}</h5>
          <p class="mb-1"><strong>Population:</strong> ${c.population.toLocaleString()}</p>
          <p class="mb-1"><strong>Region:</strong> ${c.region}</p>
          <p class="mb-0"><strong>Capital:</strong> ${Array.isArray(c.capital) ? c.capital[0] : c.capital || "N/A"}</p>
        </div>
      </div>
    `;
        col.onclick = () => showDetail(c);
        $.grid.appendChild(col);
    });
}
function showDetail(c) {
    const flagImg = document.querySelector(".flag-detail-img");
    flagImg.src = c.flags.svg;
    const setText = (selector, text) => {
        const el = document.querySelector(selector);
        if (el)
            el.textContent = text;
    };
    const displayName = c.name?.common ||
        c.name?.official ||
        Object.values(c.name?.nativeName || {})[0]?.common ||
        "Unknown Country";
    setText(".detail-name", displayName);
    setText(".detail-population", c.population.toLocaleString());
    setText(".detail-region", c.region);
    setText(".detail-subregion", c.subregion || "N/A");
    setText(".detail-capital", c.capital?.[0] || "N/A");
    setText(".detail-topLevelDomain", c.tld?.[0] || "N/A");
    setText(".detail-currencies", c.currencies
        ? Object.values(c.currencies).map((x) => x.name).join(", ")
        : "N/A");
    setText(".detail-languages", c.languages
        ? Object.values(c.languages).join(", ")
        : "N/A");
    const borders = document.getElementById("border-countries");
    borders.innerHTML = "";
    if (c.borders?.length) {
        c.borders.forEach(code => {
            const country = allCountries.find(x => x.cca3 === code);
            if (country) {
                const btn = document.createElement("button");
                btn.className = "border-btn btn btn-sm me-2 mb-2";
                btn.textContent = country.name.common || country.name.official || "N/A";
                btn.onclick = () => showDetail(country);
                borders.appendChild(btn);
            }
        });
    }
    else {
        borders.innerHTML = '<span class="text-muted ms-3">None</span>';
    }
    $.home.classList.add("d-none");
    $.detail.classList.remove("d-none");
}
// Back button
$.backBtn.onclick = () => {
    $.detail.classList.add("d-none");
    $.home.classList.remove("d-none");
};
// Search — FIXED!
$.search.oninput = () => {
    const term = $.search.value.toLowerCase().trim();
    const filtered = allCountries.filter(c => (c.name.common?.toLowerCase() || "").includes(term) ||
        (c.name.official?.toLowerCase() || "").includes(term));
    renderCountries(filtered);
};
// Region filter
document.querySelectorAll(".list-item").forEach(item => {
    item.addEventListener("click", e => {
        e.preventDefault();
        const region = item.dataset.region || "";
        const filtered = region
            ? allCountries.filter(c => c.region === region)
            : allCountries;
        renderCountries(filtered);
        // Update dropdown text
        const btn = item.closest(".dropdown")?.querySelector(".dropdown-toggle");
        if (btn)
            btn.textContent = region || "Filter by Region";
    });
});
