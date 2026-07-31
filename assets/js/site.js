const body = document.body;
const root = body.dataset.root || "./";
const current = body.dataset.page || "";
const project = body.dataset.project || "";
const projectRoot = body.dataset.projectRoot || "./";
const noteLang = body.dataset.noteLang || "en";
const siteLang = body.dataset.lang || document.documentElement.lang || noteLang;
const alternateLanguageHref = body.dataset.altLang || "";

const globalLinks = [
  { label: siteLang === "ko" ? "연구 프로그램" : "Research program", href: `${root}${siteLang === "ko" ? "ko/" : ""}index.html#program` },
  { label: siteLang === "ko" ? "프로젝트" : "Projects", href: `${root}${siteLang === "ko" ? "ko/" : ""}index.html#projects` },
  { label: siteLang === "ko" ? "연구 원칙" : "Principles", href: `${root}${siteLang === "ko" ? "ko/" : ""}index.html#principles` },
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
      ["refine-home", "Overview", "index.html"],
      ["refine-foundations", "Foundations", "index.html#foundations"],
      ["refine-study", "Study", "index.html#study"],
      ["refine-evaluation", "Evaluation", "index.html#evaluation"],
      ["refine-literature", "Literature", "index.html#literature"],
      ["refine-direction", "Directions", "index.html#direction"],
    ],
  },
  lexic: {
    name: "leXic",
    descriptor: "Lexically conditioned reading models",
    status: "Revision study",
    links: [
      ["lexic-home", "Overview", "index.html"],
      ["lexic-foundations", "Foundations", "index.html#foundations"],
      ["lexic-dataset", "Data", "index.html#dataset"],
      ["lexic-approach", "Approach", "index.html#approach"],
      ["lexic-evidence", "Evidence", "index.html#evidence"],
      ["lexic-literature", "Literature", "index.html#literature"],
      ["lexic-direction", "Directions", "index.html#direction"],
    ],
  },
};

const koreanProjectCopy = {
  gazemed: {
    descriptor: "시선 + 발화 기반 병변 grounding",
    status: "집중 연구",
    labels: {
      "gazemed-home": "개요",
      "gazemed-foundations": "기초",
      "gazemed-data": "데이터",
      "gazemed-approach": "방법",
      "gazemed-evidence": "근거",
      "gazemed-literature": "선행 연구",
      "gazemed-directions": "방향",
      "gazemed-notes": "연구 노트",
    },
  },
  refine: {
    descriptor: "주의 기반 생성 이미지 수정",
    status: "연구 설계",
    labels: {
      "refine-home": "개요",
      "refine-foundations": "기초",
      "refine-study": "연구 설계",
      "refine-evaluation": "평가",
      "refine-literature": "선행 연구",
      "refine-direction": "방향",
    },
  },
  lexic: {
    descriptor: "어휘 조건부 읽기 모델",
    status: "보강 연구",
    labels: {
      "lexic-home": "개요",
      "lexic-foundations": "기초",
      "lexic-dataset": "데이터",
      "lexic-approach": "방법",
      "lexic-evidence": "근거",
      "lexic-literature": "선행 연구",
      "lexic-direction": "방향",
    },
  },
};

const localizedProjectHref = (id, href) => {
  if (siteLang !== "ko") return href;
  if (id === "gazemed-notes") return "notes/ko/index.html";
  const [page, hash = ""] = href.split("#");
  return `ko/${page}${hash ? `#${hash}` : ""}`;
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
  const localizedProjectCopy = siteLang === "ko" ? koreanProjectCopy[project] : null;
  const projectHomeHref =
    siteLang === "ko" ? `${projectRoot}ko/index.html` : `${projectRoot}index.html`;
  const projectNav = projectSpec
    ? `
      <div class="project-bar">
        <div class="shell project-bar-inner">
          <a class="project-identity" href="${projectHomeHref}">
            <span>${projectSpec.name}</span>
            <small>${localizedProjectCopy?.descriptor || projectSpec.descriptor}</small>
          </a>
          <nav class="project-links" aria-label="${projectSpec.name} sections">
            ${projectSpec.links
              .map(
                ([id, label, href]) => {
                  const localizedHref = localizedProjectHref(id, href);
                  const localizedLabel = localizedProjectCopy?.labels[id] || label;
                  return `<a href="${projectRoot}${localizedHref}"${id === current ? ' aria-current="page"' : ""}>${localizedLabel}</a>`;
                },
              )
              .join("")}
          </nav>
          <span class="project-state">${localizedProjectCopy?.status || projectSpec.status}</span>
        </div>
      </div>`
    : "";
  const languageSwitch = alternateLanguageHref
    ? `<nav class="global-language-switch" aria-label="${siteLang === "ko" ? "언어" : "Language"}">
        ${
          siteLang === "ko"
            ? `<a href="${alternateLanguageHref}" lang="en">EN</a><span aria-current="page">한국어</span>`
            : `<span aria-current="page">EN</span><a href="${alternateLanguageHref}" lang="ko">한국어</a>`
        }
      </nav>`
    : "";

  header.innerHTML = `
    <a class="skip-link" href="#main">${siteLang === "ko" ? "본문으로 건너뛰기" : "Skip to content"}</a>
    <header class="site-header">
      <div class="nav-shell">
        <a class="brand" href="${root}${siteLang === "ko" ? "ko/" : ""}index.html" aria-label="BEAVER home">
          <span class="brand-mark" aria-hidden="true">B</span>
          <span>BEAVER <small>Human signals × intelligent systems</small></span>
        </a>
        <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="site-nav">${siteLang === "ko" ? "메뉴" : "Menu"}</button>
        <nav class="nav-links" id="site-nav" aria-label="Primary navigation">${globalNav}</nav>
        ${languageSwitch}
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
  const homePrefix = `${root}${siteLang === "ko" ? "ko/" : ""}`;
  const gazemedHref = `${root}projects/gazemed/${siteLang === "ko" ? "ko/" : ""}index.html`;
  const refineHref = `${root}projects/gaze-image-refine/${siteLang === "ko" ? "ko/" : ""}index.html`;
  const lexicHref = `${root}projects/lexic/${siteLang === "ko" ? "ko/" : ""}index.html`;
  footer.innerHTML = `
    <footer class="site-footer">
      <div class="shell footer-grid">
        <div>
          <div class="brand"><span class="brand-mark" aria-hidden="true">B</span><span>BEAVER <small>Human signals × intelligent systems</small></span></div>
          <p>${siteLang === "ko" ? "사람의 주의, 언어, 행동이 지능형 시스템에 더하는 정보를 연구합니다." : "Researching what human attention, language, and behavior add to intelligent systems."}</p>
        </div>
        <div class="footer-links">
          <a href="${homePrefix}index.html#program">${siteLang === "ko" ? "연구 프로그램" : "Research program"}</a>
          <a href="${gazemedHref}">GazeMed</a>
          <a href="${refineHref}">GazeImageRefine</a>
          <a href="${lexicHref}">leXic</a>
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
