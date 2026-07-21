const references = [
  {
    category: "datasets",
    label: "Datasets",
    year: 2022,
    title: "REFLACX: Reports and Eye-Tracking Data for Localization of Abnormalities in Chest X-rays",
    venue: "Scientific Data",
    finding: "5명의 흉부영상 전문의가 2,616개 CXR을 판독한 3,032개 gaze–dictation pair와 raw 1,000 Hz gaze, fixation, ellipse, certainty를 공개했다.",
    why: "GazeMed의 anchor. 서로 다른 gaze representation을 동일 recording에서 비교할 수 있다.",
    url: "https://www.nature.com/articles/s41597-022-01441-z",
  },
  {
    category: "datasets",
    label: "Datasets",
    year: 2024,
    title: "MIMIC-CXR-JPG v2.1.0",
    venue: "PhysioNet",
    finding: "377,110개 흉부 X-ray와 227,827개 report-derived structured labels, 표준 split을 제공한다.",
    why: "REFLACX가 참조하는 원본 영상과 대규모 image pretraining source. DUA상 재배포는 금지된다.",
    url: "https://physionet.org/content/mimic-cxr-jpg/2.1.0/",
  },
  {
    category: "datasets",
    label: "Datasets",
    year: 2020,
    title: "Eye Gaze Data for Chest X-rays (EGD-CXR)",
    venue: "PhysioNet",
    finding: "한 명의 radiologist가 1,083개 CXR을 읽는 동안 gaze, audio, transcript를 수집했다.",
    why: "다른 tracker·collection setup에서의 외부 확인 후보이나, single-reader라는 한계가 있다.",
    url: "https://physionet.org/content/egd-cxr/1.0.0/",
  },
  {
    category: "datasets",
    label: "Datasets",
    year: 2023,
    title: "MIMIC-Eye: Integrating MIMIC Datasets with REFLACX and Eye Gaze",
    venue: "PhysioNet",
    finding: "MIMIC-CXR, clinical data, REFLACX, EGD-CXR 계열을 연결한 multimodal resource다.",
    why: "통합 schema와 cross-modal join 참고 자료. 모든 record가 모든 modality를 갖는다고 가정하면 안 된다.",
    url: "https://physionet.org/content/mimic-eye-multimodal-datasets/1.0.0/",
  },
  {
    category: "datasets",
    label: "Datasets",
    year: 2024,
    title: "FG-CXR: A Radiologist-Aligned Gaze Dataset",
    venue: "ACCV",
    finding: "raw gaze와 report의 느슨한 결합을 넘어 anatomy-level gaze heatmap과 diagnosis transcript를 세밀하게 정렬한다.",
    why: "GazeMed의 gaze–language alignment novelty를 제한하며, 더 강한 비교·차별화 기준이 된다.",
    url: "https://openaccess.thecvf.com/content/ACCV2024/html/Pham_FG-CXR_A_Radiologist-Aligned_Gaze_Dataset_for_Enhancing_Interpretability_in_Chest_ACCV_2024_paper.html",
  },
  {
    category: "datasets",
    label: "Datasets",
    year: 2025,
    title: "OneStop: A 360-Participant English Eye Tracking Dataset",
    venue: "Scientific Data",
    finding: "360명, 152시간, 2.6M word tokens, 486 questions와 여러 reading regime을 제공한다.",
    why: "leXic의 task/data 기반이며 text difficulty와 reader variability 분석을 가능하게 한다.",
    url: "https://www.nature.com/articles/s41597-025-06272-2",
  },
  {
    category: "datasets",
    label: "Datasets",
    year: 2025,
    title: "EyeBench: Predictive Modeling from Eye Movements in Reading",
    venue: "NeurIPS Datasets & Benchmarks",
    finding: "6개 데이터셋, 7개 태스크, 15개 baseline을 unseen reader/text/both regime에서 표준화한다.",
    why: "leXic의 재현 가능 비교 틀이며, 단일 dataset/backbone 한계를 보강할 확장 경로다.",
    url: "https://papers.nips.cc/paper_files/paper/2025/hash/a3080b8e00bed560c433100a33ca6b2d-Abstract-Datasets_and_Benchmarks_Track.html",
  },
  {
    category: "medical",
    label: "Medical supervision",
    year: 2024,
    title: "Weakly-Supervised Medical Image Segmentation with Gaze Annotations",
    venue: "MICCAI",
    finding: "gaze heatmap을 계층 threshold pseudo-mask로 만들고 cross-level consistency로 gaze noise를 줄인다. GazeMedSeg 데이터도 공개했다.",
    why: "aggregate gaze heatmap을 supervision으로 쓰는 필수 baseline 계열이다.",
    url: "https://papers.miccai.org/miccai-2024/843-Paper1675.html",
  },
  {
    category: "medical",
    label: "Medical supervision",
    year: 2025,
    title: "Enjoying Information Dividend: Gaze Track-based Medical Weakly Supervised Segmentation",
    venue: "MICCAI",
    finding: "GradTrack은 fixation 위치·지속시간·순서를 계층 gaze-track map과 attention module에 사용해 두 segmentation dataset에서 개선했다.",
    why: "‘temporal order를 쓴다’는 주장만으로는 새롭지 않음을 보여주는 가장 직접적인 경계다.",
    url: "https://papers.miccai.org/miccai-2025/0305-Paper1072.html",
  },
  {
    category: "medical",
    label: "Medical supervision",
    year: 2022,
    title: "Gaze-Guided Class Activation Mapping",
    venue: "arXiv preprint",
    finding: "human gaze를 chest X-ray classifier attention과 결합해 분류 해석성과 weak localization을 개선하는 방향을 제시한다.",
    why: "CXR image-only/heatmap-alignment baseline 후보다.",
    url: "https://arxiv.org/abs/2202.07107",
  },
  {
    category: "medical",
    label: "Medical supervision",
    year: 2023,
    title: "Localization Supervision of Chest X-Ray Classifiers Using Label-Specific Eye-Tracking Annotation",
    venue: "Radiology: AI",
    finding: "REFLACX gaze와 timestamped report를 이용해 pathology-specific localization supervision을 추출하고 그 유효성을 비판적으로 분석한다.",
    why: "pathology mention-aligned gaze는 필수 선행 baseline이며 단순 재현을 novelty로 주장할 수 없다.",
    url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10365091/",
  },
  {
    category: "medical",
    label: "Medical supervision",
    year: 2025,
    title: "Look & Mark: Leveraging Radiologist Eye Fixations and Bounding Boxes",
    venue: "Findings of ACL",
    finding: "CXR VLM prompt에 abnormality box와 해당 영역의 fixation duration을 넣어 report generation을 보조한다.",
    why: "gaze를 token/텍스트 prompt로 변환하는 lightweight VLM baseline을 제공한다.",
    url: "https://aclanthology.org/2025.findings-acl.909/",
  },
  {
    category: "medical",
    label: "Medical supervision",
    year: 2025,
    title: "From Gaze to Insight: Human Attention + VLM Explanation for Weakly-Supervised Segmentation",
    venue: "MICCAI / arXiv",
    finding: "human gaze의 spatial cue와 VLM이 생성한 semantic context를 결합해 각각의 약점을 보완한다.",
    why: "gaze-only보다 image/text context와의 결합이 필요하다는 근거다.",
    url: "https://arxiv.org/abs/2504.11368",
  },
  {
    category: "medical",
    label: "Medical supervision",
    year: 2026,
    title: "Seeing Through Experts’ Eyes: GazeX",
    venue: "arXiv preprint",
    finding: "radiologist gaze trajectory와 fixation pattern을 behavioral prior로 사용해 report generation, grounding, VQA를 다루는 CXR VLM을 제안한다.",
    why: "GazeMed의 broad temporal-VLM 방향과 직접 겹친다. controlled ablation처럼 더 좁은 기여가 필요하다.",
    url: "https://arxiv.org/abs/2604.14316",
  },
  {
    category: "medical",
    label: "Medical supervision",
    year: 2025,
    title: "Collaborative Integration of AI and Human Expertise (CoRaX)",
    venue: "Radiology: Artificial Intelligence",
    finding: "REFLACX와 EGD-CXR의 image, report, gaze를 결합해 radiologist miss를 보완하는 collaborative AI를 제안한다.",
    why: "‘AI가 radiologist blind spot을 찾는다’는 downstream framing도 이미 경쟁이 있음을 보여준다.",
    url: "https://pubs.rsna.org/doi/abs/10.1148/ryai.240277",
  },
  {
    category: "medical",
    label: "Medical supervision",
    year: 2024,
    title: "GazeSAM: Interactive Image Segmentation with Eye Gaze and SAM",
    venue: "PMLR · Gaze Meets ML",
    finding: "gaze를 SAM interaction으로 사용해 자연·의료 이미지 annotation 효율을 높인다.",
    why: "새 데이터 annotation 연구로 확장할 때 비교해야 할 gaze-as-input 계열이다.",
    url: "https://proceedings.mlr.press/v226/wang24a.html",
  },
  {
    category: "temporal",
    label: "Temporal & multimodal",
    year: 2020,
    title: "Generating Image Descriptions via Sequential Cross-Modal Alignment Guided by Human Gaze",
    venue: "EMNLP",
    finding: "gaze와 language production을 순차적으로 정렬해 image description을 개선하고 여러 alignment 방식을 비교했다.",
    why: "단순 heatmap보다 gaze–language temporal alignment를 설계하는 고전적 참조점이다.",
    url: "https://aclanthology.org/2020.emnlp-main.377/",
  },
  {
    category: "temporal",
    label: "Temporal & multimodal",
    year: 2025,
    title: "Eye Gaze Tells You Where to Compute: Gaze-Driven Efficient VLMs",
    venue: "arXiv preprint",
    finding: "gaze ROI와 저해상도 global view로 visual token을 줄이는 training-free GazeVLM을 제안한다.",
    why: "gaze의 가치를 accuracy뿐 아니라 compute allocation으로 볼 수 있는 인접 방향이다.",
    url: "https://arxiv.org/abs/2509.16476",
  },
  {
    category: "temporal",
    label: "Temporal & multimodal",
    year: 2025,
    title: "DiffEye: Continuous Eye-Tracking Data Generation Conditioned on Natural Images",
    venue: "arXiv preprint",
    finding: "raw continuous trajectory의 다양성을 diffusion으로 모델링하고 fixation/scanpath 요약이 버리는 정보를 다룬다.",
    why: "raw gaze를 sequence로 다루는 표현·평가 아이디어를 제공하지만 medical supervision과 목적은 다르다.",
    url: "https://arxiv.org/abs/2509.16767",
  },
  {
    category: "intent",
    label: "Intent & interaction",
    year: 1990,
    title: "What You Look At Is What You Get: Eye Movement-Based Interaction Techniques",
    venue: "CHI",
    finding: "gaze interaction의 초기 설계와, 보는 행위를 명령으로 오해하는 Midas touch 문제를 정립했다.",
    why: "GazeImageRefine가 자동 edit 대신 explicit confirmation을 가져야 하는 이론적 출발점이다.",
    url: "https://doi.org/10.1145/97243.97246",
  },
  {
    category: "intent",
    label: "Intent & interaction",
    year: 2022,
    title: "MIDAS: Human Action Intention Prediction from Natural Eye Movement Patterns",
    venue: "arXiv preprint",
    finding: "inspection과 manipulation intent를 object-relative temporal gaze로 구분하며, 단순 dwell보다 nonlinear time-series model이 필요함을 보였다.",
    why: "GazeImageRefine의 temporal intent classifier와 personalized/generalized 비교에 직접적인 방법론 근거다.",
    url: "https://arxiv.org/abs/2201.09135",
  },
  {
    category: "intent",
    label: "Intent & interaction",
    year: 2020,
    title: "EyeTAP: Voice Inputs to Address the Midas Touch Problem",
    venue: "arXiv / HCI",
    finding: "gaze pointing과 별도의 acoustic confirmation을 결합해 accidental activation을 줄였다.",
    why: "gaze prediction은 후보 생성, 명시적 행동은 승인이라는 mixed-initiative 원칙을 뒷받침한다.",
    url: "https://arxiv.org/abs/2002.08455",
  },
  {
    category: "intent",
    label: "Intent & interaction",
    year: 2026,
    title: "Do You (Dis)agree With Me? Modelling Implicit User Disagreement Using Gaze",
    venue: "CHI",
    finding: "image-caption disagreement에서 gaze personalized model이 generalized model보다 높았고 temporal feature의 중요성을 보고했다.",
    why: "implicit disagreement는 개인화 의존성이 클 수 있으며 gaze-only 일반화가 제한된다는 최신 근거다.",
    url: "https://doi.org/10.1145/3772318.3790594",
  },
  {
    category: "generation",
    label: "Generative interaction",
    year: 2026,
    title: "Eye Want It All! Eye Tracking as Implicit Support for Generative Inpainting",
    venue: "CHI Extended Abstracts",
    finding: "16명 연구에서 사용자가 재생성하고 싶은 영역을 더 오래 본다는 상관을 보고했다.",
    why: "GazeImageRefine의 가장 가까운 선행연구. 상관 재현을 넘어 saliency 통제와 실제 시스템 효용이 필요하다.",
    url: "https://doi.org/10.1145/3772363.3799314",
  },
  {
    category: "generation",
    label: "Generative interaction",
    year: 2024,
    title: "GazeGen: Gaze-Driven User Interaction for Visual Content Generation",
    venue: "arXiv preprint",
    finding: "gaze로 객체를 지정해 추가·삭제·이동·재질 변경·video generation을 수행하는 시스템을 제안한다.",
    why: "gaze-targeted editing 자체는 novelty가 아니다. passive intent inference와 false-positive control로 차별화해야 한다.",
    url: "https://arxiv.org/abs/2411.04335",
  },
  {
    category: "generation",
    label: "Generative interaction",
    year: 2024,
    title: "Unveiling the Truth: Exploring Human Gaze Patterns in Fake Images",
    venue: "arXiv / image forensics",
    finding: "부분 조작 이미지의 eye-tracking dataset을 만들고 fake image에서 더 좁은 영역에 시선이 집중되는 경향을 보고했다.",
    why: "생성 결함에 대한 gaze가 존재할 수 있음을 보이지만, 감지와 수정 의도는 다른 construct다.",
    url: "https://arxiv.org/abs/2403.08933",
  },
  {
    category: "generation",
    label: "Generative interaction",
    year: 2023,
    title: "Imagen Editor and EditBench",
    venue: "CVPR",
    finding: "objects, attributes, scenes를 가로지르는 text-guided inpainting benchmark와 대규모 human evaluation을 제시했다.",
    why: "GazeImageRefine stimulus taxonomy와 output-quality 평가를 설계할 때 사용할 편집 측 기준이다.",
    url: "https://research.google/pubs/imagen-editor-and-editbench-advancing-and-evaluating-text-guided-image-inpainting/",
  },
  {
    category: "reading",
    label: "Reading & cognition",
    year: 2024,
    title: "Fine-Grained Prediction of Reading Comprehension from Eye Movements",
    venue: "arXiv preprint",
    finding: "question-level comprehension을 gaze와 multimodal language models로 예측하고 unseen text/reader 일반화를 비교했다.",
    why: "leXic의 직접 문제 설정과 강한 text-aware comparison을 제공한다.",
    url: "https://arxiv.org/abs/2410.04484",
  },
  {
    category: "reading",
    label: "Reading & cognition",
    year: 2020,
    title: "Towards Predicting Reading Comprehension From Gaze",
    venue: "ETRA",
    finding: "95명의 SAT passage reading에서 fixation location, duration, pupil feature를 CNN/RNN으로 예측했다.",
    why: "AhnCNN 계열 gaze-only baseline의 출발점이다.",
    url: "https://www3.cs.stonybrook.edu/~arunab/papers/etra20.pdf",
  },
  {
    category: "reading",
    label: "Reading & cognition",
    year: 2024,
    title: "Decoding Reading Goals from Eye Movements",
    venue: "arXiv preprint",
    finding: "ordinary comprehension과 information seeking을 scanpath+language model로 구분하고 mixed-effects 분석으로 item/participant 난이도를 설명했다.",
    why: "예측 점수와 함께 item·reader variability를 분석하는 leXic 보강 모델이다.",
    url: "https://arxiv.org/abs/2410.20779",
  },
  {
    category: "reading",
    label: "Reading & cognition",
    year: 2026,
    title: "LEXIC: Lightweight Eye-tracking eXtension via Injected Complexity",
    venue: "arXiv preprint",
    finding: "AhnCNN에 precomputed word length, frequency, GPT-2 surprisal을 concat/residual 방식으로 넣어 OneStop AUROC를 소폭 개선했다.",
    why: "BEAVER의 완료 연구. 개별 feature ablation, 추가 backbone/data, calibration, compute 분석이 다음 단계다.",
    url: "https://arxiv.org/abs/2607.08152",
  },
  {
    category: "oversight",
    label: "Oversight archive",
    year: 2025,
    title: "Do the Eyes Have It? A Review of Eye Tracking for Automation Trust Measurement",
    venue: "Human Factors",
    finding: "22개 연구 중 약 절반만 eye tracking과 trust의 기대한 음의 관계를 찾았고 나머지는 관계가 없었다.",
    why: "gaze를 trust의 1:1 proxy로 두었던 초기 BEAVER framing을 폐기한 핵심 근거다.",
    url: "https://pubmed.ncbi.nlm.nih.gov/40498518/",
  },
  {
    category: "oversight",
    label: "Oversight archive",
    year: 2021,
    title: "Measurement of Trust in Automation: A Narrative Review",
    venue: "Frontiers in Psychology",
    finding: "self-report, behavioral, gaze, physiological trust measures를 정리하고 gaze는 discrete automation AOI가 있는 맥락에서 monitoring의 proxy로 제한한다.",
    why: "trust와 verification behavior를 분리하고 task-specific operationalization을 해야 한다는 근거다.",
    url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC8562383/",
  },
  {
    category: "robotics",
    label: "Opportunity · VLA",
    year: 2023,
    title: "RT-2: Vision-Language-Action Models Transfer Web Knowledge to Robotic Control",
    venue: "CoRL / PMLR",
    finding: "vision-language model을 robot action token까지 공동 학습해 visual observation과 자연어 지시에서 low-level action을 생성하는 VLA 패러다임을 정립했다.",
    why: "VLA가 단순한 VLM planning이 아니라 embodiment-specific action policy임을 정의한다. VLA-Guard는 이 policy를 새로 만드는 대신 실행 검증 계층에 집중한다.",
    url: "https://proceedings.mlr.press/v229/zitkovich23a.html",
  },
  {
    category: "robotics",
    label: "Opportunity · VLA",
    year: 2023,
    title: "Open X-Embodiment: Robotic Learning Datasets and RT-X Models",
    venue: "ICRA / project page",
    finding: "22개 robot embodiment의 demonstration을 공통 형식으로 결합해 cross-embodiment policy 학습과 positive transfer를 연구했다.",
    why: "공개 robot data가 있어도 action space와 embodiment가 자동 호환되지 않는다. xArm integration은 별도 interface·data work다.",
    url: "https://robotics-transformer-x.github.io/",
  },
  {
    category: "robotics",
    label: "Opportunity · VLA",
    year: 2025,
    title: "OpenVLA: An Open-Source Vision-Language-Action Model",
    venue: "CoRL / PMLR",
    finding: "970k robot demonstration으로 학습한 7B open VLA와 LoRA fine-tuning·quantized serving 경로를 공개했다.",
    why: "4개월 프로젝트에서 foundation VLA를 처음부터 학습할 이유를 줄인다. 공개 policy를 쓰더라도 xArm용 data·action adapter·평가는 직접 필요하다.",
    url: "https://proceedings.mlr.press/v270/kim25c.html",
  },
  {
    category: "robotics",
    label: "Opportunity · Runtime monitoring",
    year: 2024,
    title: "Unpacking Failure Modes of Generative Policies: Runtime Monitoring of Consistency and Progress",
    venue: "CoRL SAFE-ROL Workshop",
    finding: "Sentinel은 erratic action inconsistency와 일관되지만 진전이 없는 task-progress failure를 분리해 runtime에서 감시한다.",
    why: "VLA-Guard가 anomaly를 하나의 점수로 뭉치지 않고 motion consistency와 semantic progress로 나눌 직접 근거다.",
    url: "https://openreview.net/forum?id=j1B3Id9CLm",
  },
  {
    category: "robotics",
    label: "Opportunity · Robot safety",
    year: 2025,
    title: "SafeVLA: Towards Safety Alignment of Vision-Language-Action Model via Constrained Learning",
    venue: "arXiv preprint",
    finding: "VLA 안전을 constrained MDP와 safe reinforcement learning으로 모델링하고 task performance와 safety cost의 trade-off를 평가한다.",
    why: "post-hoc 경고 UI만으로 policy safety가 해결된다고 주장할 수 없다. VLA-Guard는 monitor와 hard constraint의 역할을 제한해야 한다.",
    url: "https://arxiv.org/abs/2503.03480",
  },
  {
    category: "robotics",
    label: "Opportunity · Robot safety",
    year: 2025,
    title: "VLA-Arena: An Open-Source Framework for Benchmarking Vision-Language-Action Models",
    venue: "arXiv preprint",
    finding: "task structure, language command, visual observation을 직교 축으로 바꾸며 safety·distractor·extrapolation·long-horizon failure를 평가한다.",
    why: "명령 paraphrase, scene layout, task difficulty를 섞지 않고 hold-out 축으로 분리해야 한다는 benchmark 설계 근거다.",
    url: "https://arxiv.org/abs/2512.22539",
  },
  {
    category: "robotics",
    label: "Opportunity · Robot safety",
    year: 2026,
    title: "ForesightSafety-VLA: A Unified Diagnostic Safety Benchmark for VLA Models",
    venue: "arXiv preprint",
    finding: "safe/unsafe success와 failure를 분리하고 cumulative safety cost와 risk exposure time으로 과정 위험을 측정한다.",
    why: "task success만 보고 안전성을 주장하지 않고 unsafe success와 위험 노출 시간을 별도로 보고해야 한다.",
    url: "https://arxiv.org/abs/2606.27079",
  },
];

const categoryOrder = [
  ["all", "전체"],
  ["datasets", "Datasets"],
  ["medical", "Medical supervision"],
  ["temporal", "Temporal & multimodal"],
  ["intent", "Intent & interaction"],
  ["generation", "Generative interaction"],
  ["reading", "Reading & cognition"],
  ["oversight", "Oversight archive"],
  ["robotics", "Opportunity · VLA & robot safety"],
];

const grid = document.querySelector("[data-reference-grid]");
const filterRoot = document.querySelector("[data-reference-filters]");
const search = document.querySelector("[data-reference-search]");
const count = document.querySelector("[data-reference-count]");
let activeCategory = "all";

function renderFilters() {
  if (!filterRoot) return;
  filterRoot.innerHTML = categoryOrder
    .map(
      ([id, name]) =>
        `<button class="filter-button${id === activeCategory ? " active" : ""}" type="button" data-category="${id}">${name}</button>`,
    )
    .join("");

  filterRoot.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", () => {
      activeCategory = button.dataset.category;
      renderFilters();
      renderReferences();
    });
  });
}

function renderReferences() {
  if (!grid) return;
  const query = search?.value.trim().toLocaleLowerCase("ko") || "";
  const filtered = references.filter((reference) => {
    const categoryMatches = activeCategory === "all" || reference.category === activeCategory;
    const text = `${reference.title} ${reference.venue} ${reference.finding} ${reference.why}`.toLocaleLowerCase("ko");
    return categoryMatches && (!query || text.includes(query));
  });

  if (count) count.textContent = `${filtered.length} / ${references.length} works`;
  if (!filtered.length) {
    grid.innerHTML = '<div class="empty-state">조건에 맞는 문헌이 없습니다.</div>';
    return;
  }

  grid.innerHTML = filtered
    .map(
      (reference) => `
        <article class="reference-card">
          <div>
            <div><span class="chip">${reference.label}</span> <span class="chip">${reference.year}</span></div>
            <h3>${reference.title}</h3>
            <p><strong>${reference.venue}</strong> · ${reference.finding}</p>
          </div>
          <div>
            <p class="why"><strong>BEAVER에 주는 의미</strong><br>${reference.why}</p>
            <a href="${reference.url}">원문 / 공식 페이지 ↗</a>
          </div>
        </article>`,
    )
    .join("");
}

search?.addEventListener("input", renderReferences);
renderFilters();
renderReferences();
