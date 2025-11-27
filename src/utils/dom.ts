// Easy access to all HTML elements
// src/utils/dom.ts
export const $ = {
  search: document.getElementById("search") as HTMLInputElement,
  grid: document.getElementById("countries-grid") as HTMLElement,
  home: document.getElementById("home-page") as HTMLElement,
  detail: document.getElementById("detail-page") as HTMLElement,
  backBtn: document.querySelector(".back-btn") as HTMLButtonElement,
  themeToggle: document.querySelector(".theme-toggle-area") as HTMLElement,
  themeIcon: document.getElementById("toggle-icon") as HTMLElement,
  modeText: document.querySelector(".mode-text") as HTMLElement,
};