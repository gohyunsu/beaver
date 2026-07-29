const body = document.body;
const root = body.dataset.root || "./";
const current = body.dataset.page || "";

const links = [
  { id: "overview", label: "Home", href: `${root}index.html`, pages: ["overview"] },
  { id: "research", label: "Projects", href: `${root}index.html#research`, pages: ["gazemed", "refine", "lexic"] },
  { id: "knowledge", label: "Learn", href: `${root}knowledge/foundations.html`, pages: ["foundations", "datasets", "methods"] },
  { id: "literature", label: "Literature", href: `${root}knowledge/related-work.html`, pages: ["related"] },
  { id: "gaps", label: "Research Gaps", href: `${root}knowledge/research-gaps.html`, pages: ["gaps"] },
  { id: "roadmap", label: "Roadmap", href: `${root}operations/roadmap.html`, pages: ["roadmap"] },
];

const nav = links
  .map(
    ({ label, href, pages, className = "" }) =>
      `<a href="${href}"${className ? ` class="${className}"` : ""}${pages.includes(current) ? ' aria-current="page"' : ""}>${label}</a>`,
  )
  .join("");

const header = document.querySelector("[data-site-header]");
if (header) {
  header.innerHTML = `
    <a class="skip-link" href="#main">본문으로 이동</a>
    <header class="site-header">
      <div class="nav-shell">
        <a class="brand" href="${root}index.html" aria-label="BEAVER 홈">
          <span class="brand-mark" aria-hidden="true">B</span>
          <span>BEAVER <small>Human signals × AI</small></span>
        </a>
        <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="site-nav">Menu</button>
        <nav class="nav-links" id="site-nav" aria-label="주요 탐색">${nav}</nav>
      </div>
    </header>`;

  const toggle = header.querySelector(".nav-toggle");
  const menu = header.querySelector(".nav-links");
  toggle?.addEventListener("click", () => {
    const open = menu.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
  });

  menu?.addEventListener("click", (event) => {
    if (event.target.closest("a")) {
      menu.classList.remove("open");
      toggle?.setAttribute("aria-expanded", "false");
    }
  });
}

const footer = document.querySelector("[data-site-footer]");
if (footer) {
  footer.innerHTML = `
    <footer class="site-footer">
      <div class="shell footer-grid">
        <div>
          <div class="brand"><span class="brand-mark" aria-hidden="true">B</span><span>BEAVER <small>Human signals × AI</small></span></div>
          <p>시선·언어·행동이 지능형 시스템에 제공하는 추가 정보를 연구합니다.</p>
        </div>
        <div class="footer-links">
          <a href="${root}index.html#research">Projects</a>
          <a href="${root}knowledge/foundations.html">Concepts</a>
          <a href="${root}knowledge/related-work.html">Literature</a>
          <a href="${root}knowledge/research-gaps.html">Research gaps</a>
        </div>
      </div>
    </footer>`;
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.08 },
);

document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));

const readingProgress = document.querySelector("[data-reading-progress]");
if (readingProgress) {
  const updateReadingProgress = () => {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const percent = scrollable > 0 ? Math.min(100, Math.max(0, (window.scrollY / scrollable) * 100)) : 0;
    readingProgress.style.width = `${percent}%`;
  };

  updateReadingProgress();
  window.addEventListener("scroll", updateReadingProgress, { passive: true });
  window.addEventListener("resize", updateReadingProgress);
}
