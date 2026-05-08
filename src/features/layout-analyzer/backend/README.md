# Godel PDF Analyzer

A cinematic, data-driven web application for structural PDF analysis. This engine determines if a document is "worth vectorizing" by analyzing vector density, raster fragmentation, and text layers.

## Project Structure
```text
/backend/           # FastAPI application & PDF analysis engine
/frontend/          # Modular web application
  /css/             # Cinematic styling & design system
  /js/              # App logic & Content-First configuration
/uploads/           # Dynamic file storage
/archive/           # Legacy monolithic versions
```

## Setup & Running
1. **Backend**: Install dependencies (`pip install fastapi uvicorn pymupdf`) and run `python backend/main.py`.
2. **Frontend**: The app is served automatically at `http://localhost:8000`.

## Content Management
To update any text or data on the site, edit **`frontend/js/content.js`**.
