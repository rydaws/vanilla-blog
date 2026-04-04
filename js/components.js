const navLinks = [
  { page: "home", label: '<span class="nav-logo-dark">GROMM</span><span class="nav-logo-dot">.</span><span class="nav-logo-light">ORG</span>', href: "index.html", isLogo: true },
  { page: "blog", label: "blog", href: "pages/thingsthatareinterestingtome.html" },
  { page: "about", label: "about", href: "pages/ifyoucaretoknowabouttheauthor.html" },
  { page: "media", label: "media", href: "pages/thingsivebeenstaringat.html" },
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
    if (link.isLogo) {
      const activeClass = isActive ? " nav-logo-active" : "";
      const ariaCurrent = isActive ? ' aria-current="page"' : "";
      return `<li><a class="nav-logo${activeClass}" href="${href}"${ariaCurrent}>${link.label}</a></li>`;
    }
    const text = isActive ? link.label.toUpperCase() : link.label;
    const activeAttr = isActive ? ' id="active-nav-el" aria-current="page"' : "";
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
        <li><a target="_blank" rel="noopener noreferrer" href="https://github.com/rydaws">github</a></li>
        <li><a target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/ryan-dawson-dev/">linkedin</a></li>
      </ul>
    </div>`;
}

renderNavbar();
renderFooter();
