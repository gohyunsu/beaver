# BEAVER Research Atlas

BEAVER 팀의 2026 학생자율연구를 위한 연구 운영 문서와 정적 사이트입니다. 대화록을 그대로 보관하는 대신, 연구 질문·근거·결정·작업 상태를 개인정보 없이 재구성했습니다.

현재 연구 포트폴리오는 다음 세 트랙입니다.

1. **GazeMed — 현재 초점:** REFLACX에서 expert gaze의 공간 밀도, 지속시간, 순서, raw signal, dictation alignment가 CXR abnormality localization에 주는 증분 가치를 분해합니다.
2. **GazeImageRefine — IRB/장비 대기:** 생성 이미지에서 visual attention과 dissatisfaction/edit intent를 구분하고 gaze-assisted suggestion의 효용을 검증합니다.
3. **leXic — 보강 대기:** gaze-only reading-comprehension prediction에 precomputed lexical difficulty를 주입한 연구를 APCCAS 리뷰에 맞춰 보완합니다.

## 사이트 구조

- `index.html` — 연구 프로그램의 큰 그림과 현재 우선순위
- `projects/` — 프로젝트별 research question, scope, method, evaluation, gate
- `knowledge/datasets.html` — 데이터셋 registry와 data governance
- `knowledge/methods.html` — 방법 후보와 선택 기준
- `knowledge/related-work.html` — 계열별 searchable literature map
- `operations/roadmap.html` — task, milestone, decision, risk
- `docs/RESEARCH_CONTEXT.md` — 앞으로 가장 먼저 읽을 장기 맥락 문서
- `docs/DECISION_LOG.md` — 의사결정과 이유
- `docs/TASKS.md` — 실행 backlog

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

상세 규칙은 [CONTRIBUTING.md](CONTRIBUTING.md)를 참고하세요.
