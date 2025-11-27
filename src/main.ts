import { getAllCountries } from "./api/countriesApi.js";
import { initTheme } from "./ui/theme.js";
import { renderCountries, setCountries } from "./ui/render.js";
import { showError } from "./utils/errorHandler.js";

async function startApp() {
  initTheme();

  try {
    const countries = await getAllCountries();
    setCountries(countries);
    renderCountries(countries);
  } catch (error) {
    showError("Failed to load countries. Make sure data.json is in the folder.");
  }
}

startApp();