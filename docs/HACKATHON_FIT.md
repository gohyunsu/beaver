# 앵커 × COSS 공유대학 융합 해커톤 적합성 판단

> 판단일: 2026-07-21  
> 상태: **조건부 참여 권고; 팀의 참여 결정이나 매칭 완료를 뜻하지 않음**  
> 근거: 사용자가 제공한 2026 행사 안내, 2026-07-20 팀 대화의 공지, 전체 대화에서 확인한 BEAVER 연구 이력, VLA·robot safety 1차 문헌

## 1. 결론

BEAVER의 주제를 해커톤에 연결할 수 있다. 단, **GazeMed 또는 gaze 모델을 로봇에 직접 적용하는 방식이 아니라, 5월에 탐색했던 agent oversight·grounded action trace를 embodied robot의 runtime verification으로 확장할 때** 타당하다.

권장 주제는 다음과 같다.

> **VLA 기반 로봇 작업의 명령–관측–행동 정합성 검증 및 이상행동 시각화 시스템 (VLA-Guard)**

참여 권고는 다음 조건에 달려 있다.

- 7월 매칭에서 xArm/ROS/SDK 경험과 실제 장비 접근성을 가진 파트너 확보
- 8월 계획서 전에 한 개 작업의 SDK/simulator logging, pause/stop, 최소 anomaly 1종을 end-to-end로 재현
- 범용 VLA 학습이 아니라 one-cell pick-and-place monitor로 범위 제한
- learned semantic monitor와 deterministic safety shield를 분리

이 조건을 충족하지 못하면 범위를 simulation/log-replay dashboard로 줄이거나 참여하지 않는 편이 낫다.

## 2. 왜 직접 연결은 아닌가

현재 확인된 BEAVER 자산은 다음과 같다.

- gaze representation과 multimodal temporal alignment
- agent action trace, grounded representation, scripted error, oversight UI의 과거 설계
- selective prediction, explicit confirmation, false interruption 통제
- group split, information ablation, calibration, failure analysis

현재 확인되지 않은 자산은 다음과 같다.

- xArm 또는 ROS/SDK 제어 코드
- robot camera/kinematics calibration
- robot demonstration/action dataset
- VLA fine-tuning 및 실기 배포 결과
- physical safety operation 경험

따라서 “현재 수행 중인 VLA 로봇 연구를 그대로 확장한다”는 표현은 현재 대화 근거로는 과장이다. “BEAVER의 human-AI oversight와 multimodal alignment 연구를 VLA robot monitoring으로 확장한다”가 정확하다.

## 3. 행사 적합성

| 기준 | 판단 | 근거 |
|---|---|---|
| AI 주제 적합성 | 높음 | VLA, multimodal monitoring, anomaly detection |
| 산업·현장 문제 | 높음 | wrong object, wrong destination, stall, forbidden zone |
| 11월 시연 가능성 | 중간–높음 | 한 작업과 네 오류로 제한할 때 반복 시연 가능 |
| BEAVER 연구 연속성 | 중간 | oversight/evaluation은 직접 연결, gaze는 간접 연결 |
| 현재 구현 준비도 | 낮음 | robot/VLA code와 hardware result가 확인되지 않음 |
| 1:1 팀 매칭 시너지 | 높음 | AI monitor와 robot control의 경계가 분명함 |
| 4개월 범위 위험 | 중간 | foundation VLA 학습을 제외하면 관리 가능 |

## 4. 시스템 범위

### 입력

- 자연어 instruction
- fixed RGB/RGB-D observation
- robot pose/joint/gripper state
- 현재 action/action chunk
- optional object tracker/segmentation state

### 중간 표현

- instruction predicate: target object, destination, forbidden condition
- expected task state: approach → grasp → lift → move → place
- observed task state: object identity/location, gripper, progress
- event record: timestamp, observation, action, expected/observed state, evidence

### 출력

- allow: 정상 수행 계속
- ask: 의미가 모호해 사용자 확인
- pause: 이상 가능성이 높아 동작 보류
- stop: hard constraint 위반 또는 emergency condition
- dashboard: 명령–장면–행동–경고 근거 timeline

### 안전 경계

semantic monitor는 task inconsistency를 탐지한다. workspace/velocity/collision/E-stop은 robot controller 또는 deterministic rule이 담당한다. 전자를 physical safety guarantee로 표현하지 않는다.

## 5. MVP demo

작업은 “색상 블록을 지정 구역으로 옮기기” 하나로 제한한다.

1. **Nominal:** red block → zone A
2. **Wrong object:** blue block 접근/파지
3. **Wrong destination:** zone B로 이동
4. **Grasp failure/stall:** progress가 정해진 시간 안 바뀌지 않음
5. **Forbidden zone/human intrusion:** deterministic shield가 hard stop

동일 episode를 no-monitor, rule-only, semantic-only, hybrid에서 비교한다.

## 6. 평가

- anomaly macro-F1/AUPRC
- normal episode false-alarm rate
- anomaly onset→alert/pause/stop latency
- task success와 unsafe success 분리
- intervention recovery success
- completion time과 unnecessary pause
- object instance/layout/light/instruction paraphrase 중 최소 하나의 hold-out

frame random split은 금지한다. episode/setup 단위로 분리한다.

## 7. 팀 간 역할

### BEAVER / COSS AI team

- error taxonomy와 benchmark protocol
- instruction–state schema와 temporal alignment
- semantic anomaly detector와 calibration
- evidence dashboard
- evaluation, ablation, failure analysis

### Anchor / robotics team

- xArm/ROS/SDK integration
- motion primitive와 gripper control
- camera–workspace calibration
- telemetry와 hard safety configuration
- real episode collection과 demo operation

### 공동 interface

7월에 다음 event schema를 고정한다.

`timestamp, instruction, frame_id, object_state, robot_state, action, expected_state, alert, evidence`

## 8. 일정 gate

- **7월 Match gate:** partner, hardware, single task, four anomalies, event schema, SDK/sim smoke test
- **8월 Vertical slice:** nominal + one anomaly end-to-end; 이 범위로 개발계획서 제출
- **9월 Benchmark gate:** four anomalies, no-monitor/rule-only baseline, mid-review results
- **10월 Integration freeze:** hybrid system, hold-out evaluation, replay fallback, 설치 문서
- **11월 Demo:** live nominal/failure comparison + network/model failure용 replay mode

## 9. 추천서용 문안

### 주제

VLA 기반 로봇 작업의 명령–관측–행동 정합성 검증 및 이상행동 시각화 시스템

### 현장 문제

제조·물류 협동로봇은 자연어 지시를 이해하더라도 잘못된 객체 선택, 작업 정체, 목적지 오류처럼 task success만으로 드러나지 않는 실패를 낼 수 있다. 운영자는 로봇이 무엇을 보고 어떤 근거로 행동했는지 확인하기 어렵다.

### 필요성 · 150자 이내 초안

자연어 기반 로봇은 잘못된 객체 선택·작업 정체·경로 위험을 성공 여부만으로 설명하기 어렵다. 명령–관측–행동을 실시간 대조해 이상을 조기 탐지하고 근거를 시각화하는 검증 계층이 필요하다.

### 협업계획 초안

우리 팀의 멀티모달 정렬·이상탐지·평가 역량과 부산 공유대학 팀의 로봇 제어·현장 시나리오·센서 통합 역량을 결합한다. 공통 event schema를 기준으로 AI monitor와 xArm 제어계를 독립 개발한 뒤, 실제 작업 episode에서 통합 검증한다.

## 10. 하지 않을 주장

- 범용 산업용 VLA를 새로 학습했다.
- learned monitor가 물리적 안전을 보장한다.
- gaze가 robot operator intent를 직접 읽는다.
- 한 작업 데모가 다른 공정·robot에 일반화된다.
- pre-trained model을 사용했음에도 전체가 자체 개발 foundation model이다.

직접 개발한 범위는 monitor, episode dataset, interface, dashboard, evaluation으로 명시하고 외부 model/SDK의 license와 기여를 기록한다.
