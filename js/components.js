const navLinks = [
  { page: "home", label: "home", href: "index.html" },
  { page: "blog", label: "blog", href: "pages/thingsthatareinterestingtome.html" },
  { page: "about", label: "about", href: "pages/ifyoucaretoknowabouttheauthor.html" },
  { page: "projects", label: "projects", href: "pages/mycatalogofprojectsthatyoucanview.html" },
];

function isSubpage() {
  return window.location.pathname.includes("/pages/");
}

function renderNavbar() {
  const nav = document.getElementById("navbar");
  if (!nav) return;

  const activePage = document.body.dataset.page;
  const prefix = isSubpage() ? "../" : "";

  const items = navLinks.map((link) => {
    const href = prefix + link.href;
    const isActive = link.page === activePage;
    const text = isActive ? link.label.toUpperCase() : link.label;
    const activeAttr = isActive ? ' id="active-nav-el"' : "";
    return `<li><a${activeAttr} href="${href}">${text}</a></li>`;
  });

  items.push(
    '<li><button id="theme-toggle" aria-label="Toggle theme">&#9790;</button></li>'
  );

  nav.innerHTML = `<ul class="navbar">${items.join("\n")}</ul>`;
}

function renderFooter() {
  const footer = document.getElementById("footer");
  if (!footer) return;

  footer.innerHTML = `
    <div class="container">
      <p>&copy; 2025 rydaws</p>
      <ul>
        <a target="_blank" referrerpolicy="noreferrer" href="https://github.com/rydaws">github</a>
        <a target="_blank" referrerpolicy="noreferrer" href="https://linkedin.com/ryan-dawson">linkedin</a>
      </ul>
    </div>`;
}

renderNavbar();
renderFooter();
