---
title: "Project Work Allocation & Execution Strategy"
author: "clamayo, odero, mamani"
date: "2026-08-18"
vs code  ===> press ctrl + shitft + V 
---

## Executive Summary

This document outlines the task distribution, component ownership, and phased implementation timeline for the project. Tasks are structured to minimize blocking dependencies and enable parallel development across team members.

---

## 1. Team Task Breakdown

### Person A: UI, Layout & Navigation

* **Files:** `index.html`, `styles.css`, `app.js`, `router.js`
* **Core Responsibilities:**
  * Build structural HTML scaffold and global CSS styling rules.
  * Set up client-side URL routing and query parameter synchronization (`router.js`).
  * Implement main application bootstrap and event wiring (`app.js`).

### Person B: Data Processing & Display Components

* **Files:** `api.js`, `parser.js`, `tableComponent.js`, `detailModal.js`
* **Core Responsibilities:**
  * Implement asynchronous data fetching routines from external endpoints (`api.js`).
  * Process, sanitize, and extract raw data attributes (`parser.js`).
  * Construct UI display views for the main data table and hero detail overlays.

### Person C: State Management & Interactive Controls

* **Files:** `state.js`, `pagination.js`, `search.js`, `sorter.js`, `filter.js`
* **Core Responsibilities:**
  * Engineer the central reactive state store and subscription mechanism (`state.js`).
  * Implement data filtering, string/numeric sorting algorithms, and search parameters.
  * Construct interactive control inputs for pagination and query execution.

---

## 2. Phased Implementation Strategy

The implementation plan is informed by the architectural documentation for the **Sortable Superhero Data Vault**, summarized below.

---

# Sortable Superhero Data Vault — Architectural Documentation

## 1. Directory Blueprint

```
sortable/
├── index.html               # Entry DOM layout & section mount points
├── css/
│   ├── styles.css           # Core layout, reset, and component spacing
│   └── theme.css            # Dark-mode aesthetics & UI accents
└── js/
    ├── app.js                # Main orchestrator & lifecycle setup
    ├── state.js               # Central reactive store & observer pattern
    ├── api.js                 # Fetch client & API normalizers
    ├── components/
    │   ├── table.js           # Dynamic table render & header click events
    │   ├── pagination.js      # Page limit, navigation buttons & indicators
    │   ├── search.js          # Real-time search input & field filters
    │   └── detailModal.js     # Expanded hero view modal controller
    └── utils/
        ├── parsers.js         # Measurement cleaners (cm, kg) & missing values
        ├── sorter.js          # Multi-type column sorting algorithm
        ├── filter.js          # Search operator evaluation engine
        └── router.js          # URL query string state synchronizer
```

## 2. High-Level System Architecture

This diagram illustrates how application modules communicate using a centralized state pattern to decouple UI rendering from data processing.

```
              ┌──────────────────────┐
              │      index.html      │
              └──────────┬───────────┘
                         │
                         ▼
                    ┌─────────┐
                    │ app.js  │ (Orchestrator)
                    └────┬────┘
                         │
 ┌───────────────────────┼───────────────────────┐
 ▼                       ▼                       ▼
┌─────────┐             ┌─────────┐             ┌─────────┐
│ api.js  │             │state.js │             │router.js│
└────┬────┘             └────┬────┘             └─────────┘
     │                       │
     ▼                       ▼
┌───────────┐           ┌─────────────────────────────────┐
│parsers.js │           │       components/               │
└───────────┘           │ (table, pagination, search, etc)│
                         └────────────────┬────────────────┘
                                          │
                                          ▼
                                ┌─────────────────┐
                                │   utils/        │
                                │(sorter, filter) │
                                └─────────────────┘
```

## 3. Data Transformation & Rendering Flow

This flowchart tracks data transformations from API ingestion to DOM updates triggered by user actions.

```
[ Remote Hero JSON API ]
        │
        ▼
┌─────────────┐
│   api.js    │ Fetch raw records
└──────┬──────┘
       │
       ▼
┌─────────────┐
│ parsers.js  │ Normalize metrics (height -> cm, weight -> kg)
└──────┬──────┘
       │
       ▼
┌─────────────┐
│  state.js   │ ◄─── User Actions (Filter, Sort, Page Change)
└──────┬──────┘
       │
   ┌───┴────────────────┐
   ▼                    ▼
┌───────────┐   ┌───────────┐
│ filter.js │   │ sorter.js │ Apply logic to raw data
└─────┬─────┘   └─────┬─────┘
      └───────┬────────┘
              │
              ▼
┌───────────────────────┐
│ components/           │ Re-render active view slices
└───────────────────────┘
```

## 4. Core Implementation Strategy

### A. Centralized State Store (`state.js`)

* **Single Source of Truth**: Houses `rawData`, `filteredData`, `sortColumn`, `sortOrder`, `currentPage`, `pageSize`, and `searchQuery`.
* **Observer Pattern**: Components subscribe to state changes, triggering targeted component re-renders when relevant slice parameters change.

### B. Data Normalization (`parsers.js`)

* **Metric Conversion**: Standardizes heights into centimeters (`cm`) and weights into kilograms (`kg`) regardless of mixed unit strings (e.g., `6'2"`, `200 lbs`, `-`).
* **Missing Values Handling**: Replaces missing or null values with fallback defaults (e.g., `N/A` or `-1`) so numerical operations do not fail.

### C. Multi-Type Column Sorting (`sorter.js`)

* **Dynamic Property Lookups**: Accesses nested fields (e.g., `appearance.height`, `powerstats.intelligence`).
* **Type-Aware Comparisons**: Automatically toggles between `localeCompare()` for text and numeric differences for numeric columns.
* **Direction Toggling**: Toggles between ascending (`asc`) and descending (`desc`) sorting orders seamlessly.

### D. Deep Filtering & Search (`filter.js`)

* **Live Query Matching**: Supports search across select fields (e.g., `name`, `publisher`, `alignment`, `race`).
* **Operator Logic**: Provides comparison options like string inclusion, exclusion, fuzzy matching, and numeric threshold operators (`>`, `<`, `=`).

### E. Deep Linking & URL Synchronization (`router.js`)

* **State Persistence**: Serializes search, sort parameters, and pagination state into URL query parameters (`URLSearchParams`).
* **History State Integration**: Keeps browser back/forward history intact without full page reloads.