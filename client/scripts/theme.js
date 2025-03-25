document.addEventListener("DOMContentLoaded", () => {
  const themeToggle = document.getElementById("theme-toggle");
  let currentTheme = localStorage.getItem("theme") || "system";

  // Apply initial theme
  setTheme(currentTheme);

  themeToggle.addEventListener("click", (e) => {
    e.preventDefault();
    toggleTheme();
  });

  // Watch for system theme changes
  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", () => {
      if (currentTheme === "system") {
        updateBodyClass();
        updateIcon();
      }
    });

  function toggleTheme() {
    // Simplified toggle between light/dark only
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    setTheme(newTheme);
  }

  function setTheme(theme) {
    currentTheme = theme;
    localStorage.setItem("theme", theme);
    updateBodyClass();
    updateIcon();
  }

  function updateBodyClass() {
    document.body.classList.remove("dark", "light");

    if (currentTheme === "system") {
      const systemDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      document.body.classList.add(systemDark ? "dark" : "light");
    } else {
      document.body.classList.add(currentTheme);
    }
  }

  function updateIcon() {
    const isDark =
      currentTheme === "dark" ||
      (currentTheme === "system" &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);

    themeToggle.innerHTML = `
          <svg class="icon">
              <use xlink:href="#${isDark ? "sun" : "moon"}"/>
          </svg>
      `;
  }
});
