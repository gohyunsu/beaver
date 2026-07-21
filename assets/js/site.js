const body = document.body;
const root = body.dataset.root || "./";
const current = body.dataset.page || "";

const links = [
  ["overview", "Overview", `${root}index.html`],
  ["gazemed", "GazeMed", `${root}projects/gazemed.html`],
  ["refine", "ImageRefine", `${root}projects/gaze-image-refine.html`],
  ["lexic", "leXic", `${root}projects/lexic.html`],
  ["datasets", "Datasets", `${root}knowledge/datasets.html`],
  ["methods", "Methods", `${root}knowledge/methods.html`],
  ["related", "Related work", `${root}knowledge/related-work.html`],
  ["roadmap", "Roadmap", `${root}operations/roadmap.html`],
];

const nav = links
  .map(
    ([id, label, href]) =>
      `<a href="${href}"${id === current ? ' aria-current="page"' : ""}>${label}</a>`,
  )
  .join("");

const header = document.querySelector("[data-site-header]");
if (header) {
  header.innerHTML = `
    <a class="skip-link" href="#main">본문으로 이동</a>
    <header class="site-header">
      <div class="nav-shell">
        <a class="brand" href="${root}index.html" aria-label="BEAVER Research Atlas 홈">
          <span class="brand-mark" aria-hidden="true">B</span>
          <span>BEAVER <small>Research Atlas</small></span>
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
}

const footer = document.querySelector("[data-site-footer]");
if (footer) {
  footer.innerHTML = `
    <footer class="site-footer">
      <div class="shell footer-grid">
        <div>
          <div class="brand"><span class="brand-mark" aria-hidden="true">B</span><span>BEAVER <small>Research Atlas</small></span></div>
          <p>2026 학생자율연구의 연구 질문, 근거, 의사결정과 실행 상태를 한곳에서 관리합니다. 원본 대화의 개인정보와 제한 데이터는 포함하지 않습니다.</p>
        </div>
        <div class="footer-links">
          <a href="${root}docs/RESEARCH_CONTEXT.md">Context</a>
          <a href="${root}docs/TASKS.md">Tasks</a>
          <a href="${root}docs/DECISION_LOG.md">Decisions</a>
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
