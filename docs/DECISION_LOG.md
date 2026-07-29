# Decision Log

결정은 `날짜 / 상태 / 결정 / 이유 / 영향 / 재검토 조건` 형식으로 기록한다.

## 2026-04-06 — Superseded

**결정:** ZombieClicks, 즉 AI 추천을 의식적·무의식적으로 수용하는 차이를 gaze로 관찰하는 주제를 지원사업의 초기 메인 방향으로 선택.

**이유:** HAI 시의성, eye tracking 기반 분석, ML 연결 가능성, 결과 방향과 무관한 탐색 가능성을 고려.

**영향:** 새 gaze dataset과 eye tracker 예산이 계획에 포함됨.

**왜 바뀌었나:** trust/attention construct의 ground truth가 불명확하고 eye tracking–trust 관계가 문헌에서 일관되지 않음.

## 2026-05-11 — Retired

**결정:** agent trace verification gap을 EEG + eye tracking + behavior로 관찰하는 multimodal study를 검토.

**이유:** disengagement와 misallocated attention을 생체·행동 signature로 구분하려는 시도.

**왜 폐기했나:** EEG noise, device/import, medical IRB, advisor, error taxonomy, sample size, construct validity 부담이 연구 기여를 압도함.

**교훈:** sensor를 추가하는 것이 construct validity나 novelty를 보장하지 않는다.

## 2026-05-16 — Completed sub-study, now revise

**결정:** 장비·IRB를 기다리는 동안 EyeBench OneStop에서 text difficulty를 이용한 reading-comprehension prediction을 APCCAS short paper로 진행.

**결과:** 2026-05-23 제출, 2026-07-09 arXiv, 2026-07-16 reject.

**재검토 조건:** owner, venue, compute budget이 정해질 때 reviewer-requested ablation과 evaluation을 수행.

## 2026-05-26–29 — Archived

**결정:** cursor-based/DOM web agent oversight, action trace, grounded representation, WoZ scripted error를 탐색.

**이유:** agent process visibility와 human oversight를 직접 연결할 수 있음.

**왜 보류했나:** cursor와 DOM 조건의 비교 가능성, error injection 정당화, 구현/IRB 복잡성이 미해결.

## 2026-06-27 — Active portfolio

**결정:** GazeMed와 GazeImageRefine를 병행.

**이유:** 공개 expert-gaze dataset으로 즉시 진행 가능한 dry ML 연구와, 이미 구매하기로 한 Tobii를 사용하는 일반 사용자 HCI 연구의 시간 의존성이 다름.

**영향:** 의료 gaze와 generative image interaction을 독립 repository/workstream으로 분리.

## 2026-07-17 — Focus now

**결정:** 다음 한 달간 GazeMed에 집중.

**이유:** GazeImageRefine는 IRB·배송 대기, leXic은 reviewer-driven revision 필요, GazeMed는 REFLACX/MIMIC access가 준비됨.

**영향:** 중간보고에도 GazeMed 결과를 우선 활용할 계획.

## 2026-07-20–21 — Deprioritized method

**결정:** raw gaze를 dense video-like representation으로 넣는 방법을 primary path에서 evidence-gated exploratory path로 이동.

**이유:** 초기 실험이 잘 되지 않았고, GradTrack/GazeX/DiffEye 등 temporal/raw gaze 관련 최신 선행연구로 단순 novelty가 약함. 1,000 Hz point stream의 sparse/redundant tensor 비용도 큼.

**대체:** image-only → heatmap → fixation event → shuffle → gaze–dictation alignment 순으로 information ablation.

**재검토 조건:** event representation에서 raw-only feature가 유의미하다는 사전 증거가 있을 때.

## 2026-07-21 — Proposed research framing

**결정:** 이 문서와 사이트에서 다음을 권고 framing으로 채택.

- GazeMed: gaze information-value decomposition on REFLACX.
- GazeImageRefine: saliency-controlled dissatisfaction/edit-intent identifiability, then selective mixed-initiative assistance.
- leXic: empirical study of low-cost lexical conditioning and its limits.

**상태:** 대화 기록의 사실이 아니라 관련 문헌과 현재 제약을 바탕으로 한 권고안. 다음 팀 회의에서 승인·수정 필요.

## 2026-07-25 — Active GazeMed direction

**결정:** GazeMed PR #3의 test-time gaze–speech lesion grounding을 현재 primary path로 채택.

**근거:** 2026-07-29 최신 technical spec 기준 Final은 1,093개 test instance에서 IoU 0.3188 / Pointing 0.7237이고 Temporal-only는 0.2880 / 0.6816이다. Final은 5/5 training seed에서 Temporal-only보다 높고, position shuffle은 5/5에서 크게 하락한다.

**해석:** 좌표 의존성과 공간 언어의 IoU 기여는 지지된다. 다만 spatial-word mask의 Pointing 효과는 약하고, 환자 split은 하나이며, full fixation sequence와 signed Δt를 사용해 causal online 성질은 아직 입증되지 않았다.

**구현 방향:** causal prefix replay → split·reader sensitivity → RadZero와 instance-level 오류 상보성 → calibrated late fusion. 결과가 지지할 때만 streaming cache 또는 joint image×behavior model로 확장한다.

## 2026-07-29 — Evidence boundary

**결정:** 현재 Final을 “image-free, test-time gaze+speech localization”으로 부르고 “real-time/causal”은 다음 연구 질문으로 분리한다.

**이유:** Final은 실제 fixation 좌표에 attention을 splat해 해석 가능하고 RadZero와 경쟁력 있는 성능을 보이지만, 미래 fixation을 구조적으로 차단한 replay 결과는 아직 없다.

**영향:** 사이트의 현재 결과와 미래 아이디어를 분리하고, causal replay와 image×behavior fusion을 각각 독립 gate로 관리한다.
