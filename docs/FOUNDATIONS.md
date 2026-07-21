# BEAVER 개념적 배경

> 목적: 프로젝트마다 같은 용어를 다르게 쓰거나 센서값에서 과도한 결론을 끌어내지 않도록 공통 추론 구조를 보존한다.  
> 사이트 설명: `knowledge/foundations.html`

## 1. 관찰값에서 개입까지

BEAVER의 주장은 다음 층을 건너뛰지 않는다.

1. **Latent construct:** 불만족, 이해, 검증, 위험처럼 직접 관찰되지 않는 개념
2. **Task operationalization:** edit 선택, 정답 응답, 오류 발견, 안전 위반처럼 관찰 가능한 기준
3. **Observation:** gaze sample, image, language, action, robot telemetry
4. **Representation:** heatmap, fixation event, object state, action chunk, aligned event
5. **Prediction:** region/label/anomaly/progress score
6. **Intervention:** 표시, 확인 요청, pause, stop

센서값은 construct의 직접 측정값이 아니다. 높은 예측 점수도 개입 권한을 자동으로 주지 않는다. 오류 비용이 클수록 학습 모델의 역할을 후보 생성·경고로 제한하고 검증 가능한 규칙과 사람의 확인을 둔다.

## 2. Gaze signal vocabulary

- **Raw sample:** tracker 주파수마다 기록한 좌표, pupil, validity. parser 이전의 미세 동역학을 보존하지만 노이즈도 크다.
- **Fixation:** 일정 시간·공간 범위의 sample 묶음. 위치와 duration을 제공하나 parser threshold에 의존한다.
- **Saccade:** fixation 사이의 빠른 이동. 방향·진폭·속도를 가지지만 의식적 의도로 단정할 수 없다.
- **Dwell:** AOI 안의 누적 체류. object-level attention에 편리하지만 AOI 크기와 visual saliency의 영향을 받는다.
- **Scanpath:** fixation/saccade의 순서. 탐색·재방문을 기술하지만 task state의 직접 라벨은 아니다.
- **Heatmap:** 위치와 duration의 공간 집계. 강건한 baseline이지만 event order를 잃는다.

전처리에서 screen↔viewport↔image 좌표, zoom/pan/letterbox, tracker loss, blink, calibration drift를 분리해 기록한다. gaze·speech·click·robot action이 서로 다른 clock을 쓰면 timestamp normalization과 lag sensitivity를 수행한다.

## 3. Construct validity

### Attention ≠ intent

오래 본 영역은 단지 밝거나 크거나 과제 수행에 필요한 영역일 수 있다. edit intent를 주장하려면 saliency, object size, center bias, task context를 통제하고 실제 edit 선택·region·reason과 연결해야 한다.

### Monitoring ≠ trust

automation AOI를 본 시간은 monitoring allocation의 단서일 수 있지만 trust의 직접 측정값이 아니다. trust self-report, reliance behavior, error detection을 분리한다.

### Task success ≠ safety

로봇이 목적을 달성해도 충돌 직전 동작, 금지구역 침범, 불필요한 위험 노출이 있을 수 있다. safe success, unsafe success, safe failure, unsafe failure를 분리하고 과정 위험을 측정한다.

## 4. Multimodal alignment

멀티모달 결합은 feature concatenation보다 정렬 가정의 문제다.

- **Spatial:** gaze↔lesion/object, camera pixel↔workspace
- **Temporal:** fixation↔dictation mention, observation↔action, anomaly↔intervention
- **Semantic:** pathology, edit reason, instruction predicate, expected task state
- **Causal/information:** modality shuffle, order shuffle, label shuffle, lag sweep으로 실제 추가 정보를 검정

## 5. Evidence standard

- **Incremental value:** image/saliency/rule-only baseline 위의 추가 효과
- **Entity-aware split:** patient/image/reader/participant/task setup/episode가 train/test를 넘지 않음
- **Calibration:** probability와 실제 오류율의 대응; ECE, Brier, risk–coverage
- **Operational metric:** AUROC뿐 아니라 false alarm, latency, task success, recovery, safety violation
- **Strong ablation:** 주장한 정보의 order/location/meaning을 보존한 경우와 파괴한 경우 비교

## 6. Opportunity Lab 부록 — VLA와 runtime assurance

> 이 절은 해커톤 후보를 이해하기 위한 독립 부록이다. GazeMed·GazeImageRefine·leXic의 공통 이론이나 Core Research roadmap에 VLA를 추가하지 않는다.

VLA는 language instruction `l`과 observation history `o_<=t`에서 robot action `a_t`를 예측하는 policy `pi(a_t | o_<=t, l)`다. observation은 image와 robot state를, action은 pose/joint/gripper command 또는 action chunk를 포함한다.

주요 간극은 세 가지다.

1. **Grounding gap:** language가 올바른 object·relation·goal과 연결되는가.
2. **Embodiment gap:** robot마다 action dimension, coordinate, gripper, frequency가 다르다.
3. **Assurance gap:** task competence가 physical safety를 보장하지 않는다.

VLA-Guard에서는 역할을 분리한다.

- **Policy:** 다음 행동을 제안·실행
- **Semantic monitor:** wrong object, wrong destination, stall처럼 task-level inconsistency를 탐지
- **Hard shield/controller:** workspace, velocity, collision, emergency stop처럼 검증 가능한 물리 제약을 집행
- **Human interface:** 불확실한 상황에서 확인·pause·recovery를 지원

learned monitor를 safety guarantee라고 부르지 않는다.
