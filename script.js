const searchInput = document.getElementById("search-input");
const countriesGrid = document.getElementById("countries-grid");
const regionFilter = document.getElementById("region-filter");
const modalBody = document.getElementById("modal-body");
const modal = document.getElementById("modal");
const themeToggle = document.getElementById("theme-toggle");

let allCountries =[];

// Toggle
themeToggle.addEventListener("click", ()=>{
    const current = document.body.getAttribute("data-theme");
    const newTheme = current === "dark"? "light": "dark";
    document.body.setAttribute("data-theme", newTheme);
    themeToggle.innerHTML=`"<span class="theme-icon">${newTheme === "dark" ? "Light Mode" : "Dark Mode"}</span>`;
    localStorage.setItem("theme", newTheme);
});

// Load Saved Theme

const savedTheme = localStorage.getItem("theme");
if(savedTheme === "dark" || (!savedTheme && window.matchMedia(`(prefers-color-scheme: dark)`).matches)){
    document.body.setAttribute("data-theme", "dark");
    themeToggle.innerHTML=`<span class = "theme-icon">Light Mode</span>`;
}




