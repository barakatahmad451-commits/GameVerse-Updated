// utils/themeUtils.js
import { THEMES } from "../constants/themeConstants.js";

const STORAGE_KEY = "gameverse_theme";

export function loadTheme() {
  try {
    return localStorage.getItem(STORAGE_KEY) || THEMES.DARK.name;
  } catch {
    return THEMES.DARK.name;
  }
}

export function saveTheme(mode) {
  try {
    localStorage.setItem(STORAGE_KEY, mode);
  } catch (e) {
    console.warn("Failed to save theme", e);
  }
}

export function applyTheme(mode) {
  const theme = mode === THEMES.LIGHT.name ? THEMES.LIGHT : THEMES.DARK;
  // remove both then add
  document.body.classList.remove(THEMES.LIGHT.bodyClass, THEMES.DARK.bodyClass);
  document.body.classList.add(theme.bodyClass);

  // update toggle UI if present
  const icon = document.getElementById("themeIcon");
  const label = document.querySelector("#themeToggle .label");
  if (icon) icon.textContent = theme.icon;
  if (label) label.textContent = theme.label;
}

export function toggleTheme() {
  const cur = loadTheme();
  const next = cur === THEMES.DARK.name ? THEMES.LIGHT.name : THEMES.DARK.name;
  applyTheme(next);
  saveTheme(next);
  return next;
}

export function initThemeToggle() {
  const saved = loadTheme();
  applyTheme(saved);

  const btn = document.getElementById("themeToggle");
  if (!btn) return; // no toggle on page
  // guard double-binding
  if (btn.dataset._themeBound) return;
  btn.addEventListener("click", () => {
    toggleTheme();
  });
  btn.dataset._themeBound = "1";
}
