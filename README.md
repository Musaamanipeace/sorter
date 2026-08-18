# Sortable Superhero Data Vault

The Sortable Superhero Data Vault is a client-side web application that lets users browse, search, sort, and filter a collection of superhero data fetched from a remote API. It provides an interactive data table, pagination controls, and a detail modal for expanded hero profiles — all running directly in the browser with no build step required.

## Features

- Live search and field-based filtering across superhero attributes
- Multi-type column sorting (string and numeric)
- Paginated data table with page navigation
- Detail modal for viewing expanded hero statistics and appearance
- URL state synchronization for shareable views

## Tech Stack

- HTML5
- CSS3 (core layout + dark-mode theme)
- Vanilla JavaScript (ES modules, no frameworks)

## How to Run

This project is a static site. You can open it directly in your browser:

```bash
# Option 1: Open the HTML file directly
open sortable/index.html

# Option 2: Serve with a simple HTTP server (Python)
python3 -m http.server 8080
# Then visit: http://localhost:8080/sortable/

# Option 3: Serve with Node.js (if http-server is installed)
npx http-server sortable
```

No `npm install` or build step is required — just serve the `sortable/` directory and open `index.html`.

## Project Structure

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

## Authors

- [AmayoClinton](https://github.com/AmayoClinton) — UI, Layout & Navigation
- [Eddy-Odero](https://github.com/Eddy-Odero) — Data Processing & Display Components
- [Musaamanipeace](https://github.com/Musaamanipeace) — State Management & Interactive Controls
