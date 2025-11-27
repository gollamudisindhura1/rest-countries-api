import { $ } from "../utils/dom.js";  // Import $

export function initTheme() {
  $.themeToggle.addEventListener("click", () => {  // Use $.themeToggle
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
}