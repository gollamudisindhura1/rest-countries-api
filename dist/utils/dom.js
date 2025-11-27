// Easy access to all HTML elements
// src/utils/dom.ts
export const $ = {
    search: document.getElementById("search"),
    grid: document.getElementById("countries-grid"),
    home: document.getElementById("home-page"),
    detail: document.getElementById("detail-page"),
    backBtn: document.querySelector(".back-btn"),
    themeToggle: document.querySelector(".theme-toggle-area"),
    themeIcon: document.getElementById("toggle-icon"),
    modeText: document.querySelector(".mode-text"),
};
