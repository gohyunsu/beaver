# Contributing

## 1. 문서의 역할

- `docs/RESEARCH_CONTEXT.md`: 오래 유지되는 연구 맥락과 현재 기준선
- `docs/DECISION_LOG.md`: 날짜가 있는 결정과 이유
- `docs/TASKS.md`: 실행 가능한 산출물과 gate
- 사이트: 위 내용을 탐색하기 쉽게 설명하는 공개 가능한 표현

같은 정보를 여러 곳에서 수정할 때는 먼저 Markdown 문서를 갱신하고 사이트를 맞춥니다.

## 2. 상태 용어

- **Active / Focus now:** 현재 자원을 우선 배정
- **Waiting:** 외부 승인·장비·선행 산출물을 기다림
- **Parked:** 재개 조건은 있으나 현재 작업하지 않음
- **Archived / Retired:** 결정 이력으로만 남김
- **Proposed:** 팀에서 확정되지 않은 권고안

### Scope lane 규칙

- **Core Research:** GazeMed, GazeImageRefine, leXic. P0–P2 priority와 core roadmap을 공유한다.
- 새 연구 아이디어는 BEAVER의 기존 맥락과 섞지 않고 별도 저장소에서 관리한다.
- BEAVER의 범위를 바꾸는 결정은 날짜·근거·자원 영향을 `DECISION_LOG.md`에 남긴 뒤 반영한다.

## 3. Task 작성법

Task는 활동이 아니라 검증 가능한 산출물이어야 합니다.

나쁜 예: `REFLACX 살펴보기`

좋은 예: `reading→image 매칭률, 중복 group, label 분포, invalid gaze 비율, 20개 coordinate overlay를 담은 audit report`

각 task에는 priority, definition of done, dependency, owner, issue link를 둡니다.

## 4. 실험 기록

결과를 기록할 때 다음을 포함합니다.

- 데이터셋 이름과 버전
- manifest 또는 split hash
- preprocessing config
- model config와 seed
- 실행 commit SHA
- primary metric과 confidence interval
- 실패한 run과 제외 이유

## 5. 개인정보와 제한 데이터

다음을 commit하지 않습니다.

- 카카오톡 원본 대화록
- 전화번호, 이메일, 학번, 전자서명
- IRB 동의서·교육증·제출 zip
- MIMIC/REFLACX 원본 데이터와 직접 식별 가능한 서버 경로·credential
- participant raw eye video 또는 식별 키

필요한 파일은 접근제어된 저장소에 두고 repository에는 schema, synthetic fixture, checksum manifest만 둡니다.

## 6. 문헌 추가

`assets/js/references.js`의 각 문헌에는 다음이 필요합니다.

- primary/official URL
- 연구가 실제로 보인 핵심 결과
- BEAVER의 novelty, baseline, scope에 주는 구체적 의미
- preprint인지 peer-reviewed인지 드러나는 venue/status

## 7. 이미지와 시각화

- 원 논문 figure를 그대로 복사하는 것을 기본값으로 삼지 않습니다.
- 먼저 primary source의 개념·수치·구조를 바탕으로 자체 설명용 SVG를 만들고 caption에 출처와 “자체 재구성”임을 표시합니다.
- 외부 이미지를 직접 쓸 때는 license, attribution, local redistribution 가능 여부를 기록합니다.
- 시각화는 장식이 아니라 branch, 정보 손실, 단계, 비교 관계를 설명할 때만 추가합니다.
- 색만으로 프로젝트 또는 상태를 구분하지 않고 label과 설명을 함께 둡니다.
