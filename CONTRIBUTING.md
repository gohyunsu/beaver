# Contributing

## 1. Put content at the correct level

- `index.html` explains the shared BEAVER research program.
- `projects/<project>/index.html` defines one project at a high level.
- Project chapters explain foundations, data, methods, evidence, literature, and directions.
- `projects/<project>/notes/` holds dated, focused arguments about open decisions.
- `docs/RESEARCH_CONTEXT.md` preserves long-lived internal context.
- `docs/DECISION_LOG.md` records decisions and their reasons.
- `docs/TASKS.md` contains actionable deliverables and evidence gates.

Do not place detailed experiments, schedules, or internal coordination on the BEAVER homepage.

## 2. Keep a stable reading sequence

For a mature project, use this order:

1. Overview
2. Foundations
3. Data
4. Approach
5. Evidence
6. Literature
7. Directions
8. Research notes

Every page should explain prerequisites locally or link backward to the chapter that introduces them.

## 3. Write research notes as arguments

Each note must include:

- the question,
- the current evidence,
- the strongest alternative explanation,
- a recommendation,
- the minimum comparison or control,
- and the result that would change the recommendation.

Notes may be provisional. Stable chapters should change only after the evidence or project position changes.

## 4. Keep research-note translations paired

- Keep the English note at `notes/<slug>.html` and its Korean counterpart at `notes/ko/<slug>.html`.
- Use the same note number, publication date, section IDs, result values, source links, and recommendation structure in both versions.
- Add reciprocal language links and `hreflang` metadata to the note and both note indexes.
- Treat evidence changes as one edit: update and review both languages in the same pull request.
- Translation may adapt phrasing for clarity, but it must not strengthen, weaken, or omit a claim.

## 5. Record experiments reproducibly

Include:

- dataset name and version,
- manifest or split hash,
- preprocessing configuration,
- model configuration and seed,
- execution commit SHA,
- primary metric and uncertainty,
- failed runs and exclusion reasons.

## 6. Use explicit project states

- **Active:** receiving current research effort.
- **Study design:** measurement and protocol are being defined.
- **Revision study:** an existing result is being re-evaluated or extended.
- **Waiting:** blocked on an external dependency.
- **Parked:** has a restart condition but is not active.
- **Archived:** retained only as decision history.
- **Proposed:** a recommendation that has not been adopted.

## 7. Protect restricted and personal data

Never commit:

- raw private conversations,
- phone numbers, email addresses, student identifiers, or signatures,
- IRB submissions, consent forms, or training certificates,
- MIMIC/REFLACX source data, credentials, or identifying server paths,
- participant eye video or participant-key mappings.

Store restricted files in access-controlled systems. Commit only schemas, synthetic fixtures, checksums, and reproducible transformation code.

## 8. Add literature for its implication

Every work should have:

- a primary or official URL,
- the finding relevant to the project,
- its inference-input and output contract,
- publication status,
- and the concrete boundary it places on novelty, baseline choice, or scope.

## 9. Attribute visuals

- Prefer original explanatory diagrams for concepts and comparisons.
- Reproduce an external figure only when it materially improves understanding and its license or ownership permits reuse.
- Add a source link in the figure caption.
- Record source, creator, license, and modifications in `docs/ASSET_ATTRIBUTIONS.md`.
- Never imply that an illustrative figure is a model output.

## 10. Validate before publishing

- Check HTML structure, local paths, and anchors.
- Check JavaScript syntax.
- Confirm the site remains English outside `projects/<project>/notes/ko/`.
- Compare paired research-note section IDs, result values, source links, and language-switch destinations.
- Test the hub, each mini-site, each research note, and redirected legacy paths over HTTP.
- Verify the deployed pages contain the new content, not only a successful workflow status.
