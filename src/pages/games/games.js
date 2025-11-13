import { initThemeToggle } from "../../../utils/themeUtils.js";
import { gamesDB } from "../../../database/gamesDB.js";

document.addEventListener("DOMContentLoaded", () => {
  initThemeToggle();
  renderGames(gamesDB);
  document.getElementById("year").textContent = new Date().getFullYear();

  const addBtn = document.getElementById("addGameBtn");
  const modal = document.getElementById("gameModal");
  const form = document.getElementById("gameForm");
  const cancelBtn = document.getElementById("cancelBtn");
  const searchInput = document.getElementById("searchInput");

  let editingId = null;

  // Show modal for new game
  addBtn.addEventListener("click", () => {
    editingId = null;
    form.reset();
    document.getElementById("modalTitle").textContent = "Add Game";
    modal.classList.remove("hidden");
  });

  cancelBtn.addEventListener("click", () => modal.classList.add("hidden"));

  // Save (Add/Edit)
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const title = document.getElementById("titleInput").value.trim();
    const genre = document.getElementById("genreInput").value.trim();
    const rating = parseInt(document.getElementById("ratingInput").value);

    if (editingId) {
      const game = gamesDB.find((g) => g.id === editingId);
      game.title = title;
      game.genre = genre;
      game.rating = rating;
    } else {
      const newGame = { id: Date.now(), title, genre, rating };
      gamesDB.push(newGame);
    }

    modal.classList.add("hidden");
    renderGames(gamesDB);
  });

  // Search
  searchInput.addEventListener("input", (e) => {
    const term = e.target.value.toLowerCase();
    const filtered = gamesDB.filter(
      (g) =>
        g.title.toLowerCase().includes(term) ||
        g.genre.toLowerCase().includes(term)
    );
    renderGames(filtered);
  });

  // Render function
  function renderGames(list) {
    const container = document.getElementById("gameList");
    container.innerHTML = "";
    list.forEach((game) => {
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
        <h3 class="text-xl font-bold mb-1">${game.title}</h3>
        <p class="text-sm text-gray-300">Genre: ${game.genre}</p>
        <p class="text-sm text-gray-300 mb-3">Rating: ⭐ ${game.rating}/10</p>
        <div class="flex gap-3">
          <button class="bg-cyan-500 px-3 py-1 rounded edit-btn">Edit</button>
          <button class="bg-red-500 px-3 py-1 rounded delete-btn">Delete</button>
        </div>
      `;
      container.appendChild(card);

      card.querySelector(".edit-btn").addEventListener("click", () => {
        editingId = game.id;
        document.getElementById("modalTitle").textContent = "Edit Game";
        document.getElementById("titleInput").value = game.title;
        document.getElementById("genreInput").value = game.genre;
        document.getElementById("ratingInput").value = game.rating;
        modal.classList.remove("hidden");
      });

      card.querySelector(".delete-btn").addEventListener("click", () => {
        const index = gamesDB.findIndex((g) => g.id === game.id);
        if (index !== -1) gamesDB.splice(index, 1);
        renderGames(gamesDB);
      });
    });
  }
});
