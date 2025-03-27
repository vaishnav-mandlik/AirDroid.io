document.addEventListener("DOMContentLoaded", () => {
  const themeToggle = document.getElementById("theme-toggle");
  let currentTheme = localStorage.getItem("theme") || "system";

  if (currentTheme === "system") {
    const systemPrefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    currentTheme = systemPrefersDark ? "dark" : "light";
  }
  setTheme(currentTheme, false);

  themeToggle.addEventListener("click", (e) => {
    e.preventDefault();
    toggleTheme();
  });

  // Watch for system theme changes
  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", () => {
      if (localStorage.getItem("theme") === "system") {
        setTheme("system");
      }
    });

  function toggleTheme() {
    const isCurrentlyDark = document.body.classList.contains("dark");
    const newTheme = isCurrentlyDark ? "light" : "dark";
    setTheme(newTheme);
  }

  function setTheme(theme, save = true) {
    if (save) {
      localStorage.setItem("theme", theme);
    }
    document.body.classList.remove("dark", "light");

    if (theme === "system") {
      const systemDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      document.body.classList.add(systemDark ? "dark" : "light");
    } else {
      document.body.classList.add(theme);
    }
    updateIcon();
  }

  function updateIcon() {
    const isDark = document.body.classList.contains("dark");
    themeToggle.innerHTML = `
          <svg class="icon">
              <use xlink:href="#${isDark ? "sun" : "moon"}"/>
          </svg>
      `;
  }
});
