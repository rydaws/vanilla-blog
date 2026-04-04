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
  updateToggleIcon();
}

function updateToggleIcon() {
  const btn = document.getElementById("theme-toggle");
  if (!btn) return;
  const isDark = document.body.classList.contains("dark-theme");
  btn.textContent = isDark ? "\u2600" : "\u263E";
}

const storedTheme = localStorage.getItem("theme");
applyTheme(storedTheme);

const toggleButton = document.getElementById("theme-toggle");
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

(function renderMarkdownBlocks() {
  if (typeof window.markdownit !== "function") return;
  const md = window.markdownit({
    html: true,
    linkify: true,
    typographer: true,
    breaks: true,
  });

  document.querySelectorAll("[data-markdown]").forEach((el) => {
    let source = el.textContent || "";
    source = source.replace(/^\s*\n|\n\s*$/g, "");
    const lines = source.split(/\r?\n/);
    const minIndent = lines.reduce((m, l) => {
      if (!l.trim()) return m;
      const match = l.match(/^(\s*)/);
      const len = match ? match[1].length : 0;
      return m === null ? len : Math.min(m, len);
    }, null);
    if (minIndent && minIndent > 0) {
      source = lines.map((l) => l.slice(minIndent)).join("\n");
    }
    source = source.trim();
    if (!source) return;
    el.innerHTML = md.render(source);
  });
})();
