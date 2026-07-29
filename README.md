# BEAVER

BEAVER is a static research site about what human attention, language, and behavior add to intelligent systems.

The site uses a hub-and-project architecture:

- **BEAVER hub:** the shared research question, portfolio, and evidence principles.
- **Project mini-sites:** project-specific foundations, data, methods, evidence, literature, directions, and research notes.
- **Internal research records:** decision history, tasks, and long-term context under `docs/`.

## Projects

1. **GazeMed — active:** localize the chest X-ray finding a radiologist is describing from test-time gaze and speech.
2. **GazeImageRefine — study design:** identify revision intent in generated images after controlling for visual saliency.
3. **leXic — revision study:** measure which precomputed lexical cues improve gaze-based reading-comprehension prediction.

## Site structure

```text
index.html                              BEAVER research-program hub
projects/
  gazemed/
    index.html                          project overview
    foundations.html                    concepts and vocabulary
    data.html                           REFLACX and instance construction
    approach.html                       model, baselines, and controls
    evidence.html                       results and claim boundaries
    literature.html                     research lineage and closest work
    directions.html                     evidence gates and next questions
    notes/
      index.html                        project notebook
      spatial-language.html             research note 001
      ko/
        index.html                      Korean project notebook
        spatial-language.html           Korean research note 001
  gaze-image-refine/index.html          project mini-site
  lexic/index.html                      project mini-site
assets/
  css/site.css                          shared visual system
  js/site.js                            shared global and project navigation
  img/                                  attributed or original visuals
  video/                                attributed research demonstrations
docs/                                   internal research context and records
```

Legacy pages under `knowledge/`, `operations/`, and the old flat `projects/*.html` paths redirect to the relevant project mini-site.

## Content model

Project content has three stability levels:

1. **Overview and chapters** contain the current stable explanation.
2. **Research notes** contain focused, provisional arguments about direction.
3. **Internal records** preserve tasks, decisions, and operational details that should not interrupt the public learning path.

A research note should follow:

```text
question → current evidence → alternative explanations
→ recommendation → experiment that could change the recommendation
```

Research notes are maintained in English and Korean. Each translation uses the same
slug and section anchors under `notes/` and `notes/ko/`, so evidence, source links,
and recommendations can be reviewed as one paired record. The rest of the public
site remains English.

## Local preview

No build step is required.

```bash
python3 -m http.server 8000
```

Open `http://localhost:8000`.

## Update principles

- Keep the BEAVER homepage abstract; project details belong in project mini-sites.
- Introduce concepts before using them in methods or evidence pages.
- Separate observed results, supported interpretations, open alternatives, and future ideas.
- Link every result to its dataset version, split, seed, and source commit.
- Add literature for the boundary it establishes, not only for topical similarity.
- Keep raw conversations, personal information, restricted medical data, credentials, and participant records out of the repository.
- Record the license, source, and modifications for every redistributed external visual in `docs/ASSET_ATTRIBUTIONS.md`.

See [CONTRIBUTING.md](CONTRIBUTING.md) for the editing workflow.
