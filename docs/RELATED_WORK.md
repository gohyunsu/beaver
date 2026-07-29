# Related Work Synthesis

사이트의 searchable index는 `assets/js/references.js`에 있다. 이 문서는 계열별 결론과 연구 설계에 미치는 영향만 보존한다.

## 1. Dataset / benchmark 계열

- **REFLACX:** CXR, raw/fixation gaze, timestamped dictation, certainty, ellipse를 한 recording에서 제공한다. GazeMed의 representation ablation이 가능한 이유다.
- **MIMIC-CXR-JPG:** REFLACX source image와 대규모 pretraining을 제공하지만 credential/DUA를 따라야 한다.
- **EGD-CXR:** 다른 tracker에서 replication 가능하지만 single-reader다.
- **FG-CXR:** fine-grained gaze–diagnosis alignment를 제공하므로 alignment 자체를 novelty로 주장하기 어렵다.
- **OneStop / EyeBench:** leXic의 표준 evaluation regime을 제공한다.

## 2. Medical gaze supervision 계열

- **GazeMedSeg:** static heatmap→pseudo-mask baseline.
- **GradTrack:** fixation duration과 order가 이미 사용됨.
- **Label-specific eye-tracking annotation:** REFLACX gaze–report temporal alignment가 이미 연구됨.
- **Object detection vs phrase grounding (2025):** report sentence별 gaze 후보 영역과 text-conditioned CXR localization을 비교하므로 phrase grounding 자체는 novelty가 아님.
- **Look & Mark / GazeSAM:** gaze를 prompt 또는 interactive annotation으로 쓰는 대안.
- **GazeX / CoRaX:** broad CXR gaze-VLM과 blind-spot correction이 이미 경쟁 중.

**결론:** GazeMed는 inference-time의 causal gaze–speech alignment와 공간 언어의 증분 가치를 fixed-lag·language-only·gaze-only baseline 및 leak test로 입증해야 한다.

## 3. Temporal / gaze–language 계열

- gaze-guided sequential cross-modal alignment는 2020년 image captioning에도 존재한다.
- raw continuous trajectory는 DiffEye 등에서 별도의 modeling 대상이다.
- gaze ROI로 VLM compute를 줄이는 방향도 존재한다.

**결론:** raw/temporal signal을 쓴다는 사실보다 어떤 representation이 어떤 downstream value를 주는지와 비용을 함께 보여야 한다.

## 4. Intent / interaction 계열

- **Midas touch:** 시선은 지각을 위해 움직이므로 명령 의도와 동일하지 않다.
- **MIDAS:** temporal gaze로 intent를 예측할 수 있지만 task/object context와 nonlinear model이 필요하다.
- **Do You (Dis)agree With Me?:** personalized gaze disagreement model이 generalized보다 강하다.

**결론:** GazeImageRefine는 saliency/context baseline, participant generalization, explicit confirmation, selective prediction이 필요하다.

## 5. Generative image interaction 계열

- **Eye Want It All!:** edit 희망 영역과 dwell correlation을 이미 보임.
- **GazeGen:** active gaze-targeted generation/editing을 이미 구현.
- **Unveiling the Truth:** fake/manipulated image에서 gaze pattern 차이를 보임.
- **EditBench:** object/attribute/scene 편집과 human evaluation 기준을 제공.

**결론:** novelty는 passive dissatisfaction inference가 saliency를 넘어 식별되는지, 그리고 false interruption을 낮춘 assistive UI가 실제 articulation cost를 줄이는지에 있다.

## 6. Reading / cognition 계열

- gaze-only reading comprehension은 어렵고 text-aware models가 강하다.
- leXic은 저비용 lexical context로 작은 gain을 보였지만 feature attribution과 practical significance가 없다.

**결론:** empirical study framing, single/pairwise feature ablation, additional backbone/data, calibration, compute report가 필요하다.

## 7. Automation oversight archive

- eye tracking–trust review는 22개 연구 중 약 절반만 기대한 관계를 보고했다.
- trust measurement review는 gaze가 독립된 automation AOI의 monitoring proxy일 때 제한적으로 유용하다고 본다.

**결론:** 초기 ZombieClicks/verification-gap 연구에서 gaze를 trust의 직접 측정값으로 사용하지 않는다. 이 방향을 재개한다면 trust, verification behavior, error detection을 분리해야 한다.
