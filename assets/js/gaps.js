const searchInput = document.querySelector("[data-gap-search]");
const filterRoot = document.querySelector("[data-gap-filters]");
const cards = [...document.querySelectorAll("[data-gap-card]")];
const count = document.querySelector("[data-gap-count]");

let activeType = "all";

const types = [
  ["all", "All"],
  ["validity", "Validity"],
  ["mechanism", "Mechanism"],
  ["generalization", "Generalization"],
  ["system", "System"],
  ["data", "Data"],
  ["construct", "Construct"],
];

const render = () => {
  const query = (searchInput?.value || "").trim().toLocaleLowerCase();
  let visible = 0;

  cards.forEach((card) => {
    const typeMatch = activeType === "all" || card.dataset.gapType === activeType;
    const textMatch = !query || card.textContent.toLocaleLowerCase().includes(query);
    const show = typeMatch && textMatch;
    card.hidden = !show;
    if (show) visible += 1;
  });

  if (count) count.textContent = `${visible} gaps`;
};

if (filterRoot) {
  filterRoot.innerHTML = types
    .map(
      ([value, label]) =>
        `<button class="filter-button${value === activeType ? " active" : ""}" type="button" data-gap-filter="${value}">${label}</button>`,
    )
    .join("");

  filterRoot.addEventListener("click", (event) => {
    const button = event.target.closest("[data-gap-filter]");
    if (!button) return;
    activeType = button.dataset.gapFilter;
    filterRoot.querySelectorAll("[data-gap-filter]").forEach((item) => item.classList.toggle("active", item === button));
    render();
  });
}

searchInput?.addEventListener("input", render);
render();

const workbenchOutput = document.querySelector("[data-workbench-output]");
const workbenchButtons = [...document.querySelectorAll("[data-workbench-template]")];
const workbenchCopy = document.querySelector("[data-workbench-copy]");
const workbenchStatus = document.querySelector("[data-workbench-status]");

const experimentTemplates = {
  anatomy: {
    eyebrow: "Template 01 · Incremental value",
    title: "Gaze는 anatomy prior를 언제 넘어서는가?",
    hypothesis: "환자별 gaze–speech는 finding의 전형적 위치만으로 만든 prior보다 작은·주변부·산발적 병변에서 더 큰 추가 가치를 갖는다.",
    rows: [
      ["Unit", "같은 patient split의 reading × finding instance"],
      ["Required comparison", "label-conditioned ellipse prior · chest-center prior · B1 · Temporal · Final"],
      ["Stratification", "ellipse area · chest 중심거리 · label · reader · certainty"],
      ["Primary evidence", "Final − anatomy prior의 paired IoU/Pointing과 subgroup interaction"],
      ["Critical control", "cross-instance gaze shuffle가 Final의 subgroup gain을 제거하는가"],
    ],
    decision: "전체와 사전 정의 subgroup에서 Final이 prior를 안정적으로 이길 때만 patient-specific gaze value를 주장합니다. 그렇지 않으면 gaze가 필요한 병변군으로 scope를 좁힙니다.",
  },
  causal: {
    eyebrow: "Template 02 · Validity before system",
    title: "미래 시선 없이도 현재 성능이 유지되는가?",
    hypothesis: "finding phrase가 끝난 시점까지 관찰된 fixation만으로 full-sequence Final의 핵심 이득을 보존할 수 있다.",
    rows: [
      ["Output clock", "finding mention 또는 phrase 종료 시각 t₀"],
      ["Required comparison", "full sequence · causal prefix · fixed 1.5 s B1"],
      ["Manipulation", "fixation_end ≤ t₀ hard mask, 0.5/1/2/4초 look-back"],
      ["Primary evidence", "paired ΔIoU/Pointing · no-fixation coverage · mention→heatmap latency"],
      ["Critical control", "future-only gaze와 timestamp jitter를 positive/negative control로 사용"],
    ],
    decision: "causal prefix가 사전 정의한 성능 보존 범위와 latency를 만족할 때만 streaming cache를 구현합니다. 손실이 크면 online claim을 버리고 offline test-time assistance로 제한합니다.",
  },
  fusion: {
    eyebrow: "Template 03 · Complementarity before architecture",
    title: "Image와 gaze–speech는 서로 다른 실패를 보완하는가?",
    hypothesis: "RadZero의 영상 근거와 Final의 판독 행동 근거는 instance-level 오류가 완전히 겹치지 않아 작은 calibrated fusion이 두 단일 모델을 모두 개선한다.",
    rows: [
      ["Unit", "동일 key로 join한 1,093개 instance의 heatmap과 per-instance metric"],
      ["Stage 0", "error correlation · one-correct-only cases · oracle max ceiling"],
      ["Required comparison", "RadZero · Final · mean · max · product-of-experts"],
      ["Reliability signal", "image-map entropy · gaze dispersion · phrase descriptor · modality agreement"],
      ["Critical control", "cross-patient gaze shuffle와 validation-only calibration"],
    ],
    decision: "oracle ceiling이 작으면 즉시 중단합니다. 단순 calibrated average가 반복 split에서 두 단일 모델을 이길 때만 reliability gate, 그 뒤에만 joint model로 확장합니다.",
  },
};

const renderWorkbench = (key) => {
  const template = experimentTemplates[key];
  if (!template || !workbenchOutput) return;
  const plainRows = template.rows.map(([label, value]) => `${label}: ${value}`).join("\n");
  workbenchOutput.innerHTML = `
    <div class="workbench-heading">
      <span>${template.eyebrow}</span>
      <h3>${template.title}</h3>
      <p>${template.hypothesis}</p>
    </div>
    <dl>${template.rows.map(([label, value]) => `<div><dt>${label}</dt><dd>${value}</dd></div>`).join("")}</dl>
    <div class="workbench-decision"><span>Decision rule</span><strong>${template.decision}</strong></div>
  `;
  workbenchOutput.dataset.copyText = `${template.title}\n\nHypothesis: ${template.hypothesis}\n\n${plainRows}\n\nDecision rule: ${template.decision}`;
};

workbenchButtons.forEach((button) => {
  button.addEventListener("click", () => {
    workbenchButtons.forEach((item) => {
      const selected = item === button;
      item.classList.toggle("active", selected);
      item.setAttribute("aria-selected", String(selected));
    });
    renderWorkbench(button.dataset.workbenchTemplate);
    if (workbenchStatus) workbenchStatus.textContent = `${button.textContent.trim()} 템플릿을 표시했습니다.`;
  });
});

workbenchCopy?.addEventListener("click", async () => {
  const text = workbenchOutput?.dataset.copyText;
  if (!text) return;
  try {
    await navigator.clipboard.writeText(text);
    if (workbenchStatus) workbenchStatus.textContent = "실험안을 클립보드에 복사했습니다.";
  } catch {
    if (workbenchStatus) workbenchStatus.textContent = "브라우저 권한 때문에 복사하지 못했습니다. 내용을 직접 선택해 복사해주세요.";
  }
});

renderWorkbench("anatomy");
