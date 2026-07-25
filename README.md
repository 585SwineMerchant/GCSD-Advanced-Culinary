# GCSD Advanced Culinary Student Field Manual

This repository is the working environment for the Greece Central School District Advanced Culinary student field manual and its digital companion site.

## Purpose

Advanced Culinary moves students from foundational kitchen learning into client-centered production, school-based enterprise, recipe adaptation, leadership, quality control, service, and evidence-based reflection. The repository preserves the course architecture, six major experiences, student tools, and the web interface used before and after production.

## Current Working Architecture

1. Professional Kitchen Launch & Hors d’Oeuvre Reception
2. Preorder Pop-Up Bakery
3. Seasonal Soup, Sauce & Lunch Service
4. Fast-Casual Pop-Up: Pizza or Sandwich Shop
5. Protein-Centered Client Catering
6. Teacher Appreciation Breakfast/Brunch — Operations Capstone

The experiences share common technical, planning, assessment, and evidence expectations while allowing Arcadia and Olympia to use locally appropriate clients and service formats.

## How Recipes Work

Advanced Culinary does not depend on one fixed recipe collection. A client or production need comes first. Students and teachers research credible starting points, test feasibility, adapt deliberately, scale and cost the recipe, define a quality standard, approve one production version, and preserve successful versions with event notes and revisions.

The site includes a browser-based Recipe Development Studio for practicing this process. Saved drafts remain on the local device and do not replace approved standardized recipes or official course records.

## Student Site Structure

- **Home** — course identity, six-experience progression, recipe philosophy, and Arcadia/Olympia framework
- **Course System** — client-centered production cycle, professional systems, roles, assessment, and Gateway 4 evidence
- **Six Experiences** — detailed station cards with technical anchors, recipe-development challenges, planning packages, local options, evidence, and review questions
- **Recipe Studio** — eight-stage recipe-development pathway and working recipe brief
- **Field Manual** — searchable student reference based on the Advanced Culinary working manual
- **Production Tools** — printable planning, recipe, costing, order, quality, feedback, and evidence forms
- **My Evidence** — local-device evidence checkpoints and reflection builder

## Repository Structure

- `site/` — static student-facing web application
- `docs/` — development status, source register, and review notes
- `.github/workflows/` — GitHub Pages deployment

The editable field manual and six-experience planning workbook currently live in Google Drive and are linked directly from the student site.

## Local Preview

```bash
python -m http.server 8000 --directory site
```

Then open `http://localhost:8000`.

## Deployment

The GitHub Pages workflow uploads the `site/` directory whenever changes are pushed to `main`.

## Core Guardrails

- Learning before labor.
- Preparation before independence.
- Every student completes meaningful cooking or production work.
- Team success does not replace individual evidence.
- The Cottage is Arcadia's local SBE identity; districtwide curriculum language remains locally flexible.
- Exact clients, dates, menus, sales procedures, and local operating details remain subject to department approval.
