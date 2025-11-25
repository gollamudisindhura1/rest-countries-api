const searchInput = document.getElementById("search-input");
const countriesGrid = document.getElementById("countries-grid");
const regionFilter = document.getElementById("region-filter");
const modalBody = document.getElementById("modal-body");
const themeToggle = document.getElementById("theme-toggle");
const themeText = themeToggle.querySelector(".theme-text");

let allCountries =[];

// Toggle
themeToggle.addEventListener("click", ()=>{
    const isDark = document.body.getAttribute("data-theme") === "dark";
    const newTheme = isDark ? "light" : "dark";
    document.body.setAttribute("data-theme", newTheme)

    // Update text and icon
  themeText.textContent = isDark ? "Dark Mode" : "Light Mode";
  themeToggle.querySelector('i').className = isDark 
    ? 'bi bi-moon-stars-fill me-2' 
    : 'bi bi-sun-fill me-2';

    localStorage.setItem("theme", newTheme);
});

// Load Saved Theme

const savedTheme = localStorage.getItem("theme");
if(savedTheme === "dark" || (!savedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches)){
    document.body.setAttribute("data-theme", "dark");
    themeText.textContent = "Light Mode";
    themeToggle.querySelector("i").className = "bi bi-sun-fill me-2";
}


// Fetch the countries

async function loadCountries(){
    try{
        const res = await fetch("https://restcountries.com/v3.1/all");
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        allCountries = await res.json();
        renderCountries(allCountries);
    }catch(err){
        console.error("Fetch error:", err);
        countriesGrid.innerHTML = `
      <div class="col-12 text-center py-5">
        <p class="text-danger h5 mb-3">Failed to load countries</p>
        <button onclick="location.reload()" class="btn btn-primary">
          Try Again
        </button>
      </div>`;
    }
}

function renderCountries(countries){
    countriesGrid.innerHTML= "";
    countries.forEach(country => {
        const col = document.createElement("div");
        col.className = "col";
        col.innerHTML =`
        <article class="country-card card h-100 bg-white">
        <img src="${country.flags.svg}" class="card-img-top" alt="${country.name.common} flag">
        <div class ="card-body">
        <h2 class ="h5 fw-bold mb-3">${country.name.common}</h2>
        <p class ="small mb-1"><strong>Population: </strong>${country.population.toLocaleString()}</p>
        <p class="small mb-1"><strong>Region:</strong> ${country.region}</p>
        <p class="small"><strong>Capital:</strong> ${country.capital?.[0] || 'N/A'}</p>
        </div>
        </article>`;
        col.addEventListener("click", ()=> showDetail(country));
        countriesGrid.appendChild(col)
        
    });
}

    function showDetail(country){
        const native = country.name.nativeName ? Object.values(country.name.nativeName)[0].common : country.name.common;
        const currencies = country.currencies ? Object.values(country.currencies ).map(c =>c.name).join(",") : "N/A";
        const languages = country.languages ? Object.values(country.languages).join(', ') : 'N/A';

        modalBody.innerHTML=`
        <div class ="col-12 col-lg-6"
        <img src ="${country.flags.svg}" alt ="${country.name.common}" class = "img-fluid rounded shadow">
        </div>
        <div class ="col-12 col-lg-6 d-flex flex-column justify-content-center">
        <h2 class="h3 fw-bold mb-4">${country.name.common}<h2>
        <div class ="row">
        <div class ="col-md-6">
        <p><strong>Native Name: </strong>${native}</p>
        <p><strong>Population: </strong>${country.population.toLocaleString()}</p>
        <p><strong>Region: </strong>${country.region}</p>
        <p><strong>Sub Region: </strong>${country.subregion || "N/A"}</p>
        <p><strong>Capital: </strong>${country.capital?.[0] || "N/A"}</p>
        </div>
        <div class ="col-md-6">
        <p><strong>Top Level Domian:</strong>${country.tld?.[0] || "N/A"}</p>
        <p><strong>Currencies: </strong>${currencies}</p>
        <p><strong> Languages:</strong>${languages}</p>
        </div>
        </div>
        <div class ="mt-4">
        <strong>Border Countries: </strong><br>
        ${country.borders ? country.borders.map(code =>{
            const border = allCountries.find(c => c.cca3 === code);
            return border ? `<button class ="border-btn btn btn-sm mt-2">${border.name.common}</button>`: "";
        }).join ("") : '<span class="text-muted">None</span>'}
        </div>
        </div>`;
        modal.show();
    }

    // Search and filter
    function filterCountries(){
        let filtered = allCountries;
        const query = searchInput.value.trim().toLowerCase();
        if (query) filtered = filtered.filter(c=> c.name.common.toLowerCase().includes(query));
        if (regionFilter.value) filtered = filtered.filter(c => c.region === regionFilter.value);
  renderCountries(filtered);
}
searchInput.addEventListener('input', filterCountries);
regionFilter.addEventListener('change', filterCountries);
// Back button closes modal
document.getElementById('back-btn').addEventListener('click', () => modal.hide());

// Start
loadCountries();

  
    




