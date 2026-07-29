const body = document.body;
const root = body.dataset.root || "./";
const current = body.dataset.page || "";
const project = body.dataset.project || "";
const projectRoot = body.dataset.projectRoot || "./";

const globalLinks = [
  { label: "Research program", href: `${root}index.html#program` },
  { label: "Projects", href: `${root}index.html#projects` },
  { label: "Principles", href: `${root}index.html#principles` },
  { label: "GitHub", href: "https://github.com/gohyunsu/beaver", external: true },
];

const projectSpecs = {
  gazemed: {
    name: "GazeMed",
    descriptor: "Gaze + speech lesion grounding",
    status: "Active study",
    links: [
      ["gazemed-home", "Overview", "index.html"],
      ["gazemed-foundations", "Foundations", "foundations.html"],
      ["gazemed-data", "Data", "data.html"],
      ["gazemed-approach", "Approach", "approach.html"],
      ["gazemed-evidence", "Evidence", "evidence.html"],
      ["gazemed-literature", "Literature", "literature.html"],
      ["gazemed-directions", "Directions", "directions.html"],
      ["gazemed-notes", "Notes", "notes/index.html"],
    ],
  },
  refine: {
    name: "GazeImageRefine",
    descriptor: "Attention-aware image revision",
    status: "Study design",
    links: [
      ["refine", "Overview", "index.html"],
      ["refine", "Question", "index.html#question"],
      ["refine", "Study design", "index.html#study"],
      ["refine", "Literature", "index.html#literature"],
      ["refine", "Direction", "index.html#direction"],
    ],
  },
  lexic: {
    name: "leXic",
    descriptor: "Lexically conditioned reading models",
    status: "Revision study",
    links: [
      ["lexic", "Overview", "index.html"],
      ["lexic", "Foundations", "index.html#foundations"],
      ["lexic", "Evidence", "index.html#evidence"],
      ["lexic", "Literature", "index.html#literature"],
      ["lexic", "Direction", "index.html#direction"],
    ],
  },
};

const globalNav = globalLinks
  .map(
    ({ label, href, external }) =>
      `<a href="${href}"${external ? ' target="_blank" rel="noreferrer"' : ""}>${label}${external ? '<span aria-hidden="true">↗</span>' : ""}</a>`,
  )
  .join("");

const header = document.querySelector("[data-site-header]");
if (header) {
  const projectSpec = projectSpecs[project];
  const projectNav = projectSpec
    ? `
      <div class="project-bar">
        <div class="shell project-bar-inner">
          <a class="project-identity" href="${projectRoot}index.html">
            <span>${projectSpec.name}</span>
            <small>${projectSpec.descriptor}</small>
          </a>
          <nav class="project-links" aria-label="${projectSpec.name} sections">
            ${projectSpec.links
              .map(
                ([id, label, href]) =>
                  `<a href="${projectRoot}${href}"${id === current ? ' aria-current="page"' : ""}>${label}</a>`,
              )
              .join("")}
          </nav>
          <span class="project-state">${projectSpec.status}</span>
        </div>
      </div>`
    : "";

  header.innerHTML = `
    <a class="skip-link" href="#main">Skip to content</a>
    <header class="site-header">
      <div class="nav-shell">
        <a class="brand" href="${root}index.html" aria-label="BEAVER home">
          <span class="brand-mark" aria-hidden="true">B</span>
          <span>BEAVER <small>Human signals × intelligent systems</small></span>
        </a>
        <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="site-nav">Menu</button>
        <nav class="nav-links" id="site-nav" aria-label="Primary navigation">${globalNav}</nav>
      </div>
    </header>
    ${projectNav}`;

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
          <div class="brand"><span class="brand-mark" aria-hidden="true">B</span><span>BEAVER <small>Human signals × intelligent systems</small></span></div>
          <p>Researching what human attention, language, and behavior add to intelligent systems.</p>
        </div>
        <div class="footer-links">
          <a href="${root}index.html#program">Research program</a>
          <a href="${root}projects/gazemed/index.html">GazeMed</a>
          <a href="${root}projects/gaze-image-refine/index.html">GazeImageRefine</a>
          <a href="${root}projects/lexic/index.html">leXic</a>
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
