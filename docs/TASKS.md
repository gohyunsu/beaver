# Tasks

> Snapshot: 2026-07-29<br>
> Owner는 GitHub issue에서 지정한다. 날짜는 공식 deadline을 재확인한 뒤 issue에 둔다.

## P0 — GazeMed

### GM-01 PR #3 reproduction + data audit

- **산출물:** 고정 manifest·split·seed의 PR #3 재현표, `audit.md`, 20개 coordinate overlay figure
- **완료 조건:**
  - reading→image→study→subject join coverage
  - 동일 image/multiple reader 중복 group
  - phase와 class별 certainty/ellipse count
  - invalid raw gaze, fixation count/duration, pupil missingness
  - screen→image coordinate와 zoom/pan 반영 표본 확인
  - 미래 gaze 누출이 없는 causal window assertion
  - reported IoU 0.233 / 0.29 / 0.32 계열 재현 여부
- **의존:** 승인된 로컬 REFLACX/MIMIC access

### GM-02 Fixed-lag and unimodal baselines

- **산출물:** fixed 1.5 s, all-reading heatmap, gaze-only, language-only 결과
- **완료 조건:** 같은 split/config에서 IoU, Pointing, containment, center distance와 paired bootstrap CI
- **의존:** GM-01

### GM-03 Temporal–spatial alignment ablation

- **산출물:** learned lag, coordinate, duration, spatial-token, lag-shuffled, coordinate-permuted 결과
- **완료 조건:** 시간·좌표·공간 언어별 증분 효과와 future-gaze leak test, at least 5 seeds 또는 사전 정의한 반복
- **의존:** GM-02

### GM-04 Streaming grounder gate

- **결정:** phrase trigger + causal multi-scale fixation bank 구현 확대 / 현재 모델 유지 / stop
- **기준:** language-only·gaze-only 대비 effect size, CI, 병변 크기·판독자 subgroup, oracle fixation ceiling
- **의존:** GM-03

### GM-05 Streaming implementation

- **산출물:** pathology/spatial phrase trigger, multi-scale causal fixation bank, anatomy-normalized grounding, no-grounding confidence
- **완료 조건:** latency와 risk–coverage, fixed-lag 대비 paired result, 재현 명령
- **의존:** GM-04 통과

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
