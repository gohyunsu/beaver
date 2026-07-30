# BEAVER 연구 맥락

> 기준일: 2026-07-31<br>
> 주요 근거: `KakaoTalk_20260721_1823_50_609_group.txt` 전체 대화, 팀이 공유한 공개 논문·데이터셋 페이지<br>
> 목적: 새로운 팀원·연구 보조자·AI agent가 이 문서를 먼저 읽고 연구의 현재 상태와 판단 근거를 복구할 수 있게 한다.<br>
> 개인정보: 원본 대화의 연락처, 학번, 이메일, 서명, 행정 첨부물은 의도적으로 배제했다.

## 1. 한 문장 정의

BEAVER는 **사람의 시선이 담는 공간·시간·맥락 정보가 기존 영상·텍스트·행동 신호보다 무엇을 더 설명하는지**를 의료 영상 supervision, 생성 이미지 수정 의도, 읽기 이해 예측이라는 세 환경에서 검증하는 gaze-centered human–AI research program이다.

중요한 관점은 “gaze가 유용하다”가 아니다. 다음을 분리해 묻는다.

- 어디를 보았는가: spatial density, AOI, object coverage
- 얼마나 머물렀는가: fixation duration, dwell
- 어떤 순서로 보았는가: scanpath, revisit, temporal state
- fixation parsing 전에 무엇이 있었는가: raw sample, velocity, saccade
- 무엇을 말하거나 행동하며 보았는가: dictation, prompt, edit action과의 정렬
- 이 정보가 기존 image/text/saliency baseline보다 실제 증분 가치를 갖는가

## 2. 현재 포트폴리오와 우선순위

### 2.1 GazeMed — Focus now

**현재 상태:** 접근 가능한 REFLACX와 MIMIC-CXR-JPG를 바탕으로 즉시 실험할 수 있어 2026-07-17 이후 팀의 단기 초점이 되었다. 대화에서는 2026-08-15 IEEE MedAI 제출을 내부 목표로 제시했으나, 공식 CFP와 적합성은 재확인이 필요하다.

**초기 아이디어:** raw 1,000 Hz gaze를 video-like spatiotemporal trajectory로 표현하면 fixation parsing이 버리는 saccade, velocity, micro-motion을 보존해 lesion localization을 개선할 것이라는 가설. 2026-07-20 예비실험에서 유의미한 방향을 찾지 못해 primary path에서 내렸다.

**초기 실험이 남긴 경계:** raw trajectory와 fixation heatmap의 차이는 Gaussian blur bandwidth를 맞추면 사라졌고, velocity·saccade·pupil 특징도 독립적인 이득을 보이지 않았다. 별도의 초기 probe에서는 finding별 해부학적 위치 prior가 gaze-only보다 강했다. 이 결과는 현재 Final의 효과를 부정하지 않지만, 같은 split·instance·label에서 anatomy-only와 직접 비교해 gaze가 흔한 위치를 재현하는 것 이상인지 확인해야 함을 뜻한다.

**현재 모델:** 하나의 instance는 finding label과 ellipse가 있는 판독 구간이다. 추론 때 CXR pixel은 사용하지 않고, 전체 fixation sequence와 timestamped speech에서 만든 특징만 사용한다. 10개 binary text descriptor와 8차원 finding embedding이 query가 되고, 시간·운동학 6개 특징과 16차원 Fourier x/y가 fixation key가 된다. 구현에는 같은 finding embedding이 key에도 남아 있지만 모든 key에 동일한 상수로 들어가 softmax에서 상쇄되므로 실제 조건화는 query에서 일어난다. 단일 cross-attention의 weight를 실제 fixation 좌표에 splat하고 Gaussian smoothing해 위치 분포를 만든다.

**PR #3 최신 결과:** Phase 3 patient-level split의 같은 1,093개 test instance에서 평가했다.

- B1, 발화 1.5초 전 gaze 고정 규칙: IoU 0.2652 / Pointing 0.5837
- Temporal-only: IoU 0.2907 / Pointing 0.6789
- Final, 시간+Fourier 좌표+공간 언어: IoU 0.3394 / Pointing 0.8029
- Final position-shuffled: IoU 0.2908 / Pointing 0.6653
- Final spatial-word-masked: IoU 0.3077 / Pointing 0.7462
- RadZero, 외부 image+phrase 모델의 metric별 최선: IoU 0.3165 / Pointing 0.7255. 서로 다른 operating point다.

Final은 Temporal-only보다 5개 training seed와 5개 patient split에서 높았다. position shuffle과 spatial-word masking도 중복된 primary run을 제외한 9/9 실행에서 두 지표 모두 유의하게 하락했다. patient split의 IoU 변동은 seed 변동의 5.6배다. 한 primary split의 paired 비교에서 Final은 RadZero의 metric별 최선보다 두 지표 모두 높지만, 두 모델의 입력이 다르므로 이는 경쟁력의 근거이지 modality 우월성의 근거가 아니다.

**최신 문헌이 주는 제약:**

- GazeMedSeg는 static gaze heatmap을 weak segmentation supervision으로 쓴다.
- GradTrack은 fixation position, duration, temporal order를 이미 사용한다.
- label-specific REFLACX gaze extraction과 CXR phrase-grounding 연구는 gaze–report alignment를 이미 다룬다.
- GazeX는 CXR에서 gaze trajectory를 VLM pretraining에 사용하는 2026 preprint다.

따라서 “temporal gaze를 쓴다”, “text로 병변을 grounding한다”, “gaze를 VLM에 넣는다”는 framing만으로는 충분하지 않다. 현재 입증된 차별점은 <strong>test-time gaze+speech만으로 얻는 해석 가능한 localization과 정보 제거 대조</strong>다.

**권고된 핵심 질문:**

> fixation의 시간·좌표 정보와 발화의 공간 표현이 fixed-lag 및 정보 제거 대조보다 언급된 병변 국소화를 얼마나 개선하며, 그 이득은 새로운 split과 causal replay에서도 유지되는가?

**권고 태스크:** primary는 finding-conditioned abnormality localization. REFLACX ellipse를 pixel-perfect mask로 간주하지 않으므로 `segmentation`이라는 주장을 기본값으로 쓰지 않는다.

**필수 비교:**

1. 발화 1.5초 전 gaze 고정 규칙
2. Temporal-only
3. Final
4. RadZero image+phrase external baseline
5. coordinate permutation
6. spatial-token mask
7. causal prefix replay와 future-gaze mask

**평가 원칙:**

- 동일 subject/study/image의 여러 reading이 train/test를 넘지 않는 group split
- IoU + Pointing + containment + center distance, abstention을 쓰면 calibration과 risk–coverage
- study/image bootstrap confidence interval과 paired comparison
- pathology, certainty, reader, lesion size subgroup
- fixed lag, RadZero, coordinate permutation, spatial-word mask sanity check
- 하나의 patient split 외 추가 split과 가능한 reader-held-out sensitivity
- 발화 뒤의 미래 fixation을 볼 수 없는 causal mask, timestamp assertion, streaming latency

**현재 증거의 경계:** 이 모델은 test-time gaze+speech 모델이지만, full fixation sequence와 signed Δt를 사용하므로 causal online model은 아직 아니다. 다섯 patient split은 같은 REFLACX pool 안의 표본 변동만 다루며, regex mention linker, coarse ellipse, single institution/device도 일반화 주장에 제약을 준다.

**즉시 필요한 산출물:** 같은 프로토콜의 label-conditioned anatomy prior와 subgroup value map → causal prefix replay → 추가 patient split과 reader sensitivity → RadZero·Final 오류 상보성 분석 → calibrated image×behavior late fusion gate.

### 2.2 GazeImageRefine — Waiting, but offline design active

**현재 상태:** 2026-07-17 IRB 제출 완료. 대화상 예상 심의 결과는 2026-08-21 이후이며 수정 요구로 늦어질 수 있다. Tobii eye tracker도 주문했으며 배송을 기다린다.

**문제:** 생성 이미지에서 사용자는 시각적 문제를 느끼지만 이를 prompt나 mask로 다시 표현해야 한다. gaze가 pre-verbal dissatisfaction을 일부 포착할 수 있다는 가설이다.

**가까운 선행연구:**

- Eye Want It All! (CHI EA 2026): 재생성하고 싶은 영역을 더 오래 본다는 N=16 상관 연구.
- GazeGen (2024 preprint): 바라본 객체를 대상으로 능동적 gaze-driven editing.
- Midas touch 문헌: 보는 것과 명령 의도를 동일시하면 false activation이 발생.

따라서 `gaze로 이미지를 편집한다` 또는 `오래 보면 고치고 싶은 곳이다`만으로는 새롭지 않다.

**권고된 핵심 질문:**

1. image saliency와 prompt–image mismatch를 통제한 뒤에도 gaze가 실제 edit region을 예측하는가?
2. 어떤 error type, spatial extent, salience에서 gaze가 유용하거나 모호한가?
3. calibrated high-confidence candidate만 제시할 때 articulation cost를 줄이고 false interruption을 통제하는가?

**두 단계 연구:**

- Study 1, identifiability: pre-action gaze → keep/edit → region → reason/instruction → output choice를 수집. gaze-only가 아니라 saliency-only, gaze–saliency residual, prompt grounding과 비교. leave-participant-out과 leave-image-out을 모두 평가.
- Study 2, interface value: Study 1 gate를 통과하면 manual baseline과 gaze-assisted suggestion UI를 비교. 자동 편집은 금지하고 explicit confirmation과 undo를 제공.

**자극 taxonomy 권고:**

- provenance: prompt violation / rendering artifact / preference mismatch
- extent: local detail / object / relation / global composition
- salience: salient / non-salient, satisfied salient distractor 포함

photorealistic multi-object scene으로 scope를 제한하는 것이 object masks, 관계 오류, distractor 통제에 유리하다.

**IRB 대기 중 가능한 작업:** protocol freeze, stimulus audit, saliency/prompt-grounding baseline, logging schema, Tobii integration code의 synthetic test.

### 2.3 leXic — Parked / revise

**현재 상태:** 2026-05-23 APCCAS 2026 제출, 2026-07-09 arXiv 공개, 2026-07-16 reject 리뷰 수신. 팀 대화상 담당자가 자발적으로 보강하면 higher venue를 노리고, 없으면 10월 국내/아시아권 venue를 고려한다는 안이 있으나 확정되지 않았다.

**연구 내용:** EyeBench OneStop reading-comprehension task에서 AhnCNN에 precomputed word length, word frequency, GPT-2 surprisal을 주입. Concat과 typical-reader gaze residual 방식 비교. K=5 seed ensemble × 10 folds.

**공개 결과:** unseen text에서 +1.8–2.2%p AUROC, Concat unseen reader에서 +2.9%p. 절대 성능 일부는 chance에 가깝다.

**리뷰 핵심:**

- standard feature fusion 대비 기술적 novelty 부족
- three feature의 개별·조합 ablation 부재
- 작은 gain의 실용적 의미, calibration, error analysis 부족
- OneStop과 AhnCNN 한정
- lightweight claim을 뒷받침할 parameter/FLOPs/latency/memory 부재
- GPT-2 surprisal은 precomputed이므로 language-model-free 표현이 부정확

**권고 framing:** 큰 architectural advance가 아니라 gaze-only comprehension에서 low-cost lexical cues의 효과와 한계를 분석한 empirical study.

**재개 조건:** 명시적 owner, compute budget, target venue/date. GazeMed P0를 침범하지 않는다.

## 3. 연구가 여기까지 온 과정

### 3.1 3월 말–4월: biosignal + AI에서 ZombieClicks로

초기 후보는 biosignal을 LLM feedback, empathy, music intervention 등에 쓰는 아이디어였다. HCI/HAI novelty와 지원사업의 ML 적합성을 고민하면서 AI 추천을 의식적·무의식적으로 받아들이는 차이를 eye tracking으로 보는 ZombieClicks가 선택됐다. 지원사업 계획서에는 ground truth 없는 새 gaze dataset과 고가 장비가 필요하다는 점이 funding justification으로 들어갔다.

### 3.2 5월 초–중순: verification gap + EEG

지원사업에 선정된 뒤 agent trace의 오류를 사용자가 검증하는 상황에서 disengagement와 misallocated attention을 EEG, eye tracking, blink, HRV, mouse 등으로 찾는 multimodal study로 커졌다. 그러나 다음 문제가 드러났다.

- error type, difficulty, domain의 정당화가 미완성
- bottom-up cluster를 미리 두 subtype으로 명명할 위험
- EEG noise와 기기 사양·수입 문제
- 비침습 의료연구 IRB와 medical safety advisor 부담
- gaze와 trust의 관계가 선행연구에서 일관되지 않음

결국 EEG를 핵심으로 둔 방향은 폐기됐다. 이 이력에서 얻은 교훈은 sensor를 늘려도 construct validity가 생기지 않는다는 것이다.

### 3.3 5월 중순: leXic 서브 연구

기기와 IRB를 기다리는 동안 EyeBench의 OneStop reading-comprehension task를 선택해 text difficulty injection을 빠르게 실험하고 APCCAS에 제출했다. 이 트랙은 메인 연구와 별개지만 gaze signal에 context를 결합한다는 공통 질문을 가진다.

### 3.4 5월 말: cursor/DOM agent oversight 탐색

EEG 없이 cursor-based agent를 gaze로 감독하거나 DOM agent의 action trace/grounded representation을 비교하는 아이디어가 발전했다. continuous visibility와 symbolic visibility, Wizard-of-Oz error injection, web research/spreadsheet task를 검토했다. 그러나 DOM과 cursor를 동일선상에서 비교하기 어렵고, scripted error의 정당화와 구현 복잡성이 커 IRB 제출을 미뤘다. 이 방향은 현재 active가 아니라 archived alternative다.

### 3.5 6월 말: gaze-centered two-track portfolio

구매할 eye tracker를 실제로 쓰면서 일반 참가자를 쉽게 모집할 수 있는 GazeImageRefine와, 공개 expert-gaze dataset으로 즉시 dry research를 할 수 있는 GazeMed를 병행하기로 결정했다. GitHub 조직에 각각 repository가 만들어졌고, 7월에는 IRB와 dataset ideation이 진행됐다.

### 3.6 7월: 실행 초점 분리

- leXic: reject 리뷰를 받아 revise/parked.
- GazeImageRefine: IRB 제출·Tobii 주문으로 waiting.
- GazeMed: MIMIC image access 확보·REFLACX 서버 업로드 후 active focus.
- raw gaze video idea는 예비실험에서 약했고 최신 related work와 겹쳐 gate 뒤로 이동.

## 4. 공통 연구 원칙

### 4.1 Gaze는 construct의 직접 측정값이 아니다

gaze는 overt visual orientation의 noisy observation이다. trust, understanding, dissatisfaction, intention을 1:1로 뜻하지 않는다. 각 프로젝트는 후속 행동·전문가 annotation·task context와 연결된 operational definition을 가져야 한다.

### 4.2 증분 가치가 핵심이다

gaze model이 random보다 좋은 것으로 부족하다. image-only, saliency-only, center/anatomy prior, text/context baseline에 비해 무엇이 추가되는지 보여야 한다.

### 4.3 split은 entity 구조를 따라야 한다

- 의료: subject/study/image 단위 group split. 같은 CXR의 multiple reading은 한 split.
- 사용자 연구: participant generalization과 stimulus generalization을 별도 평가.
- 읽기: unseen reader/text/both regime 유지.

### 4.4 ablation은 feature 제거보다 강해야 한다

temporal order를 주장하면 order shuffle, duration을 주장하면 duration shuffle, gaze location을 주장하면 spatial permutation을 수행한다. 모델 capacity가 아니라 정보가 성능을 만드는지 검정한다.

### 4.5 negative result는 자동으로 contribution이 아니다

강한 baseline, 충분한 power, 정확한 측정, 좁은 claim, 실패 원인 분석이 있을 때만 음성 결과가 가치 있다. `결과가 어느 쪽이어도 논문 가능`을 계획 근거로 쓰지 않는다.

### 4.6 복잡도는 정보가치를 확인한 뒤 늘린다

VLM, video encoder, multimodal biosignal을 먼저 붙이지 않는다. 작은 모델과 frozen split에서 신호가 있는지 확인한 뒤 확장한다.

## 5. 데이터와 보안

### 5.1 REFLACX

- 3,032 synchronized gaze–dictation readings, 2,616 unique CXR, five radiologists.
- raw gaze와 fixation 모두 존재.
- 0–5 certainty와 abnormality ellipse는 전문가 reference이지 absolute truth가 아니다.
- 일부 109 CXR은 여러 radiologist 판독이 있어 variability 분석에 사용 가능.

### 5.2 MIMIC-CXR-JPG

- 377,110 images, 227,827 reports/studies.
- credentialed access와 DUA가 필요하며 데이터 공유 금지.
- repository에는 원본이나 credential을 넣지 않는다.

### 5.3 GazeImageRefine participant data

- IRB 승인과 동의 범위가 우선.
- eye video가 필요하지 않으면 보관하지 않는다.
- coordinates, task log, participant key를 분리한다.
- 공개 release는 동의·de-identification·재식별 위험 검토 후 결정한다.

## 6. 다음 행동

### GazeMed P0

1. 같은 split·instance·label의 anatomy-only prior와 병변 subgroup별 증분 가치
2. mention 시점 이후 fixation을 차단한 causal replay와 latency report
3. 추가 patient split에서 핵심 비교 반복
4. 가능한 범위의 reader-held-out sensitivity
5. regex mention linker의 manual audit와 clinical NLP 대안
6. RadZero·Final instance-level 오류 상보성과 calibrated late fusion

### GazeImageRefine offline P0

1. IRB 문서와 실제 protocol 일치 확인
2. stimulus taxonomy와 ground-truth action schema 고정
3. saliency-only 및 prompt-grounding baseline 준비
4. device delivery 후 calibration/drift/event sync rehearsal

### leXic

owner와 venue가 정해질 때만 feature ablation, additional backbone/data, calibration, cost benchmark를 시작한다.

## 7. 이 문서를 업데이트하는 방법

- 상태가 바뀌면 먼저 2절을 고치고 `DECISION_LOG.md`에 날짜·근거·영향을 남긴다.
- 새 방법은 4절의 원칙과 충돌하지 않는지 확인한다.
- 새 문헌이 novelty를 줄이면 숨기지 말고 연구 질문을 좁힌다.
- 숫자와 일정은 원 출처를 확인하고 기준일을 갱신한다.
- 대화에서 제안된 아이디어와 실제 결정·실험 결과를 같은 문장에 섞지 않는다.
