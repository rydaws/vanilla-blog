const POSTS_DIR = "../assets/posts/";

// Stuff at beginning of markdown files is treated as "frontmatter" for metadata
function parseFrontmatter(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) return { meta: {}, content: raw };

  const meta = {};
  // 0: full match, 1: frontmatter, 2: content
  match[1].split(/\r?\n/).forEach((line) => {
    const i = line.indexOf(":");
    if (i === -1) return;
    const key = line.slice(0, i).trim();
    const val = line.slice(i + 1).trim();
    meta[key] = val;
  });
  return { meta, content: match[2] };
}

function renderMarkdown(text) {
  const md = window.markdownit({
    html: true,
    linkify: true,
    typographer: true,
    breaks: true,
  });
  return md.render(text);
}

async function loadPostList() {
  const container = document.getElementById("blog-posts");
  if (!container) return;

  const res = await fetch(POSTS_DIR + "posts.json");
  const filenames = await res.json();

  const posts = await Promise.all(
    filenames.map(async (filename) => {
      const raw = await fetch(POSTS_DIR + filename).then((r) => r.text());
      const { meta } = parseFrontmatter(raw);
      const slug = filename.replace(/\.md$/, "");
      return { slug, ...meta };
    }),
  );

  posts.sort((a, b) => (b.date || "").localeCompare(a.date || ""));

  posts.forEach((post) => {
    const li = document.createElement("li");
    li.className = "blog-post";
    li.innerHTML = `
      <a class="blog-post-link" href="post.html?slug=${post.slug}">
        ${post.title || post.slug}
      </a>`;
    container.appendChild(li);
  });
}

async function loadSinglePost(slug) {
  const res = await fetch(POSTS_DIR + slug + ".md");
  if (!res.ok) {
    window.location.href = "404.html";
    return;
  }

  const raw = await res.text();
  const { meta, content } = parseFrontmatter(raw);
  const postContent = document.getElementById("post-content");
  if (!postContent) return;

  postContent.innerHTML = renderMarkdown(content);

  document.title = (meta.title || slug) + " - GROMORG";
}

document.addEventListener("DOMContentLoaded", () => {
  const slug = new URLSearchParams(window.location.search).get("slug");
  if (slug) {
    loadSinglePost(slug);
  } else {
    loadPostList();
  }
});
