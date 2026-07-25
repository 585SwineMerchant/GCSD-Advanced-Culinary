# GCSD Advanced Culinary Student Field Manual

This repository is the working environment for the Greece Central School District Advanced Culinary student field manual and its digital companion site.

## Purpose

Advanced Culinary moves students from foundational kitchen learning into client-centered production, school-based enterprise, leadership, quality control, service, and evidence-based reflection. The repository preserves the course architecture, six major experiences, student tools, and the web interface used before and after production.

## Current Working Architecture

1. Professional Kitchen Launch & Hors d’Oeuvre Reception
2. Preorder Pop-Up Bakery
3. Seasonal Soup, Sauce & Lunch Service
4. Fast-Casual Pop-Up: Pizza or Sandwich Shop
5. Protein-Centered Client Catering
6. Teacher Appreciation Breakfast/Brunch — Operations Capstone

The experiences share common technical, planning, assessment, and evidence expectations while allowing Arcadia and Olympia to use locally appropriate clients and service formats.

## Repository Structure

- `site/` — static student-facing web application
- `documents/` — current Advanced Culinary field manual and six-experience planning workbook
- `docs/` — development status, source register, and review notes
- `.github/workflows/` — GitHub Pages deployment

## Local Preview

Open `site/index.html` directly or serve the folder with any static web server.

```bash
python -m http.server 8000 --directory site
```

Then open `http://localhost:8000`.

## Deployment

The included GitHub Pages workflow uploads the `site/` directory whenever changes are pushed to `main`.

## Core Guardrails

- Learning before labor.
- Preparation before independence.
- Every student completes meaningful cooking or production work.
- Team success does not replace individual evidence.
- The Cottage is Arcadia's local SBE identity; districtwide curriculum language remains locally flexible.
- Exact clients, dates, menus, sales procedures, and local operating details remain subject to department approval.
