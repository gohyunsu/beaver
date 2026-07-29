# BEAVER

BEAVER의 연구 프로젝트, 배경 개념, 데이터셋, 방법론과 선행연구를 연결한 정적 사이트입니다.

현재 연구 포트폴리오는 다음 세 트랙입니다.

1. **GazeMed — 현재 초점:** 판독 중 들어오는 expert gaze와 발화를 시간·공간적으로 정렬해 언급된 CXR 이상소견의 위치를 예측합니다.
2. **GazeImageRefine — IRB/장비 대기:** 생성 이미지에서 visual attention과 dissatisfaction/edit intent를 구분하고 gaze-assisted suggestion의 효용을 검증합니다.
3. **leXic — 보강 대기:** gaze-only reading-comprehension prediction에 precomputed lexical difficulty를 주입한 연구를 APCCAS 리뷰에 맞춰 보완합니다.

## 사이트 구조

- `index.html` — 연구 프로그램의 큰 그림과 현재 우선순위
- `projects/` — 프로젝트별 research question, scope, method, evaluation, gate
- `knowledge/foundations.html` — gaze, construct validity, weak supervision, multimodal alignment의 개념 지도
- `knowledge/datasets.html` — 데이터셋 registry와 data governance
- `knowledge/methods.html` — 방법 후보와 선택 기준
- `knowledge/related-work.html` — 계열별 searchable literature map
- `operations/roadmap.html` — task, milestone, decision, risk
- `docs/RESEARCH_CONTEXT.md` — 앞으로 가장 먼저 읽을 장기 맥락 문서
- `docs/FOUNDATIONS.md` — 연구 전반의 개념적 배경과 공통 언어
- `docs/DECISION_LOG.md` — 의사결정과 이유
- `docs/TASKS.md` — 실행 backlog
- `assets/img/` — 자체 설명용 SVG와 라이선스·출처를 확인한 외부 도판

## 로컬 실행

빌드 도구가 없는 정적 사이트입니다.

```bash
python3 -m http.server 8000
```

그다음 `http://localhost:8000`을 엽니다. 파일을 직접 열어도 대부분 작동하지만, 로컬 서버 사용을 권장합니다.

## 업데이트 원칙

- raw 대화록, 연락처, 학번, 서명, IRB 제출 파일, 제한 데이터는 commit하지 않습니다.
- 사실, 팀 내부 목표, 분석·권고를 구분합니다.
- 방법을 추가할 때는 그것이 검정하는 정보와 필수 baseline을 함께 적습니다.
- 실험 결과에는 dataset version, manifest hash, split, seed, commit SHA를 연결합니다.
- 새 문헌은 제목과 요약만 추가하지 않고 “BEAVER의 claim을 어떻게 바꾸는가”를 적습니다.
- 외부 그림은 license와 필요성을 확인하고, 본문 caption과 `docs/ASSET_ATTRIBUTIONS.md`에 출처·변경 여부를 기록합니다.

상세 규칙은 [CONTRIBUTING.md](CONTRIBUTING.md)를 참고하세요.
