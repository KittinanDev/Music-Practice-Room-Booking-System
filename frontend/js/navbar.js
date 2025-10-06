function setupNavbar() {
  const toggle = document.querySelector(".menu-toggle");
  const menu = document.querySelector(".navbar ul");
  const themeToggle = document.getElementById("theme-toggle");

  // 🧭 Toggle Navbar
  toggle?.addEventListener("click", () => {
    menu.classList.toggle("active");
  });

  // 🧑‍💻 Hide Admin link for non-admin
  const userRole = localStorage.getItem("userRole");
  const adminLink = document.getElementById("admin-link");
  if (userRole !== "admin" && adminLink) adminLink.style.display = "none";

  // 👤 Show username
  const name = localStorage.getItem("userName");
  const userLabel = document.getElementById("user-name");
  if (userLabel && name) userLabel.textContent = `👤 ${name}`;

  // 🌗 Apply saved theme
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") document.body.classList.add("dark");

  // 🌙 Theme toggle click
  themeToggle?.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    const currentTheme = document.body.classList.contains("dark") ? "dark" : "light";
    localStorage.setItem("theme", currentTheme);
    themeToggle.textContent = currentTheme === "dark" ? "☀️" : "🌙";
  });

  // 🌞 Show correct icon
  if (document.body.classList.contains("dark")) {
    themeToggle.textContent = "☀️";
  } else {
    themeToggle.textContent = "🌙";
  }
}

function logout() {
  localStorage.clear();
  window.location.href = "login.html";
}

document.addEventListener("DOMContentLoaded", setupNavbar);
