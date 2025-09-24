console.log("blog script");

const postArray = [
  {
    slug: "001-first-post",
    title: "My First Post",
    snippet: "My very first blog post",
    url: "../../assets/posts/001-first-post.md",
  },
  {
    slug: "002-second-post",
    title: "Second Post",
    snippet: "Another day, another post",
    url: "../../assets/posts/002-second-post.md",
  },
];

function loadPosts() {
  const container = document.getElementById("blog-posts");
  if (!container) return;

  postArray.forEach((post) => {
    const postEl = document.createElement("li");
    postEl.className = "blog-post";

    postEl.innerHTML = `
            <h2>${post.title}</h2>
            <p>${post.snippet}</p>
            <a href="post.html?slug=${post.slug}">Read more</a>
        `;
    container.appendChild(postEl);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const postSlug = urlParams.get("slug");

  if (postSlug) {
    const post = postArray.find((p) => p.slug === postSlug);
    if (post) {
      fetch(post.url)
        .then((response) => response.text())
        .then((markdown) => {
          const md = window.markdownit({
            html: true,
            linkify: true,
            typographer: true,
            breaks: true,
          });
          const content = document.getElementById("post-content");
          if (content) {
            content.innerHTML = md.render(markdown);
          }
        });
    } else {
        console.error("Post not found:", postId);
        window.location.href = "404.html";
    }
  } else {
    loadPosts();
  }
});
