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

The site includes a browser-based Recipe Studio for practicing this process. Work is saved separately for each experience on the local device and does not replace approved standardized recipes or official course records.

## Student Site Structure

- **Home** — the student's orientation point: current event, current phase, progress, next action, prior-event management briefing, and the six-event year at a glance
- **Event Workspace** — one reusable six-phase cycle for every major experience: Brief → Learn → Plan → Produce → Close → Improve
- **Learning** — menu- and production-driven routing to the relevant ProStart Second Edition material, instructor lesson, demonstration, or focused practice
- **Recipes** — a customer-driven Recipe Studio connecting the accepted brief, current learning, three research possibilities, testing, revision, and teacher approval
- **Quick Reference** — concise operating protocols for time management, complete closeout, professional recovery, safety stops, client-change authority, and individual evidence

Reusable production tools remain behind the event workflow. Students open the correct tool from the phase where it is required rather than interpreting a disconnected form library. Adult planning and unresolved department-review questions remain in development records rather than student navigation.

## Repository Structure

- `site/` — static student-facing web application
- `docs/` — development status, source register, and review notes
- `.github/workflows/` — GitHub Pages deployment

The editable field manual and six-experience planning workbook remain staff development sources. They are not presented as student assignments.

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
- The accepted client commitment must be protected.
- Time management includes production, packaging, delivery, dishes, sanitation, storage, and station restoration.
- Every student completes meaningful cooking or production work.
- Team success does not replace individual evidence.
- Honest failure followed by diagnosis and instructor-approved correction remains productive learning; concealment is a separate professional breach.
- Demonstrations, technique lessons, ingredient studies, and smaller labs build capacity between and within the six major experiences.
- ProStart Second Edition is an authoritative information source, not the pacing structure of the course.
- Advanced Culinary encounters operating and entrepreneurial results; Kitchen Management conducts the deeper analysis and briefs the next event cycle.
- The graduation/professional portfolio is a curated record of real course work, not a separate paperwork system.
- The Cottage is Arcadia's local SBE identity; districtwide curriculum language remains locally flexible.
- Exact clients, dates, menus, sales procedures, and local operating details remain subject to department approval.
