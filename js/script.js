const toggleButton = document.getElementById("theme-toggle");
const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

function applyTheme(theme) {
  if (theme === "dark") {
    document.body.classList.add("dark-theme");
    document.body.classList.remove("light-theme");
  } else if (theme === "light") {
    document.body.classList.add("light-theme");
    document.body.classList.remove("dark-theme");
  } else {
    // no explicit choice: follow system preference
    if (prefersDarkScheme.matches) {
      document.body.classList.add("dark-theme");
      document.body.classList.remove("light-theme");
    } else {
      document.body.classList.add("light-theme");
      document.body.classList.remove("dark-theme");
    }
  }
}

const storedTheme = localStorage.getItem("theme");
applyTheme(storedTheme);

if (toggleButton) {
  toggleButton.addEventListener("click", function () {
    const isDark = document.body.classList.contains("dark-theme");
    const newTheme = isDark ? "light" : "dark";
    applyTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  });
}

if (!storedTheme) {
  prefersDarkScheme.addEventListener("change", (e) => {
    applyTheme(null);
  });
}