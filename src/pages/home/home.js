import { initThemeToggle } from "../../../utils/themeUtils.js";

document.addEventListener("DOMContentLoaded", () => {
  initThemeToggle();
  animateSections();
  document.getElementById("year").textContent = new Date().getFullYear();
});

function animateSections() {
  const fadeEls = document.querySelectorAll(".fade-up");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  fadeEls.forEach((el) => observer.observe(el));
}
