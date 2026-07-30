# Tasks

> Snapshot: 2026-07-31<br>
> Owner는 GitHub issue에서 지정한다. 날짜는 공식 deadline을 재확인한 뒤 issue에 둔다.

## P0 — GazeMed

### GM-01 PR #3 evidence freeze

- **상태:** 완료
- **산출물:** B1, RadZero, Temporal-only, Final, position shuffle, spatial-word mask의 같은 1,093-instance 결과표, 5-seed·5-split 비교, complete 2×2 architecture ablation
- **핵심 결과:** Final 5-seed 평균 IoU 0.3394 / Pointing 0.8029, Temporal-only 및 정보 제거 control 대비 9/9 distinct seed/split run에서 양의 방향

### GM-02 Anatomy prior and value map

- **산출물:** training ellipse로 만든 label-conditioned anatomy prior, Final과 동일 instance의 결과표, pathology·lesion size·location subgroup별 paired difference
- **완료 조건:** patient split을 보존하고 test label location을 사용하지 않음, IoU/Pointing/center distance와 bootstrap interval 보고
- **의존:** frozen split과 finding-label crosswalk

### GM-03 Causal prefix replay

- **산출물:** mention 시점에 이용 가능한 fixation만 사용하는 replay loader와 결과표
- **완료 조건:** 미래 fixation hard-mask assertion, full-sequence 대비 paired IoU/Pointing, end-to-end latency, no-fixation coverage
- **의존:** timestamp·mention alignment audit

### GM-04 Split and reader sensitivity

- **산출물:** 추가 patient split의 핵심 네 조건과 가능한 reader-held-out 결과
- **완료 조건:** split별 effect direction, seed variance, paired interval, 실패 subgroup
- **의존:** training budget

### GM-05 Mention linker audit

- **산출물:** regex linker의 false-link/missed-link manual audit, clinical NLP 대안 비교
- **완료 조건:** pathology·negation·uncertainty·공간 표현별 오류표와 downstream sensitivity

### GM-06 Image × behavior complementarity gate

- **산출물:** RadZero와 Final의 instance-level error map, calibrated average, reliability-gated late fusion
- **완료 조건:** frozen test protocol에서 각 단일 모델을 모두 개선하고 calibration 악화가 없음
- **의존:** matched RadZero prediction

### GM-07 Streaming implementation

- **산출물:** incremental phrase trigger, causal fixation key cache, no-grounding confidence
- **완료 조건:** GM-03에서 signal retention 확인, latency와 risk–coverage, 재현 명령
- **의존:** GM-03 gate 통과

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
