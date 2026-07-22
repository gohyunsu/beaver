# Tasks

> Snapshot: 2026-07-21<br>
> Owner는 GitHub issue에서 지정한다. 날짜는 공식 deadline을 재확인한 뒤 issue에 둔다.

## P0 — GazeMed

### GM-01 Data audit

- **산출물:** `audit.md`, machine-readable manifest, 20개 coordinate overlay figure
- **완료 조건:**
  - reading→image→study→subject join coverage
  - 동일 image/multiple reader 중복 group
  - phase와 class별 certainty/ellipse count
  - invalid raw gaze, fixation count/duration, pupil missingness
  - screen→image coordinate와 zoom/pan 반영 표본 확인
  - leakage-safe group split proposal
- **의존:** 승인된 로컬 REFLACX/MIMIC access

### GM-02 Frozen split and baseline

- **산출물:** versioned split IDs, image-only I0, heatmap G1 results
- **완료 조건:** 같은 backbone/config에서 paired results, per-class AUROC/AUPRC/localization, bootstrap CI, center/random prior
- **의존:** GM-01

### GM-03 Fixation information ablation

- **산출물:** ordered event G2, order-shuffled, duration-shuffled, spatially permuted result table
- **완료 조건:** 정보원별 효과와 compute cost, at least 5 seeds 또는 사전 정의한 반복
- **의존:** GM-02

### GM-04 Scope gate

- **결정:** full method / short empirical report / stop
- **기준:** baseline 대비 effect size, CI, subgroup consistency, novelty matrix, 남은 시간
- **의존:** GM-03

### GM-05 Gaze–dictation alignment

- **산출물:** pathology mention extraction, lag-window sweep, label-specific gaze maps
- **완료 조건:** 기존 label-specific eye-tracking work와 같은/다른 점을 명시한 baseline
- **의존:** GM-04에서 계속 결정

## P0 — GazeImageRefine offline work

### GI-01 Protocol freeze

- **산출물:** IRB와 일치하는 trial flow, primary RQ/outcome, exclusion, stopping rule
- **완료 조건:** pre-gaze, keep/edit, region, reason, instruction, output validation event가 명시됨

### GI-02 Stimulus audit set

- **산출물:** provenance × spatial extent × salience matrix를 채운 자극 후보
- **완료 조건:** satisfied salient distractor 포함, object mask 가능, prompt/brief와 연결

### GI-03 No-user baseline

- **산출물:** visual-saliency-only와 prompt-grounding pipeline
- **완료 조건:** region candidate와 evaluation schema가 synthetic/manual labels에서 동작

### GI-04 Tobii rehearsal

- **산출물:** calibration, drift, screen-image coordinate, event synchronization test log
- **의존:** device delivery

### GI-05 IRB-approved pilot

- **산출물:** data quality, task clarity, preliminary precision/spatial error
- **의존:** IRB approval + GI-01–04
- **금지:** 승인 전 participant pilot

### GI-06 Study 2 gate

- **결정:** mixed-initiative prototype을 만들지 여부
- **기준:** Study 1의 calibrated precision, risk–coverage, participant/image generalization

## P2 — leXic revision

### LX-00 Resume gate

- owner
- target venue and date
- compute budget
- GazeMed P0 일정과 충돌 없음

### LX-01 Feature ablation

- length, frequency, surprisal 각 단독
- 3개 pairwise 조합
- all features
- 동일 folds/seeds

### LX-02 Generalization

- AhnCNN 외 최소 1 backbone
- 가능한 추가 EyeBench dataset/task
- unseen reader/text/both

### LX-03 Practical evaluation

- AUROC, AUPRC, balanced accuracy
- ECE, Brier, calibration plot
- subgroup/error analysis
- parameter, FLOPs/MACs, latency, peak memory
- feature precompute cost와 deployment inference cost 분리

### LX-04 Rewrite

- `language-model-free` 표현 제거
- architectural novelty보다 empirical analysis framing
- Residual branch는 ablation이 지지하지 않으면 부차적/negative result로 축소

## Repository operations

### OPS-01 GitHub issues

- 이 문서의 각 task를 issue로 옮기고 owner, status, dependency, due date 지정

### OPS-02 Evidence update cadence

- 주 1회 roadmap snapshot 갱신
- major result/IRB/review가 오면 즉시 decision log 기록

### OPS-03 Privacy audit

- raw chat, contact/student/signature, IRB zip, restricted data, credentials가 Git history에 없는지 push 전 확인
