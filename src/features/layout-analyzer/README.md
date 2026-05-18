# spatialAI

Godel Technologies' marketing site and product surface — including the **PDF Vetter Tool**, an in-browser tool that classifies PDFs by their suitability for geometric vectorization.

The analyzer runs **entirely client-side**. Uploaded PDFs never leave the user's device — they are parsed and analyzed in WebAssembly inside the browser.

## License

This project is licensed under the **GNU Affero General Public License v3.0 or later** (AGPL-3.0-or-later). See [LICENSE](./LICENSE) for the full text.

What this means in practice:

- Any deployment of this site (Vercel, your own server, anywhere) constitutes "distribution" under the AGPL.
- Anyone you distribute or serve this software to is entitled, on request, to receive the **complete corresponding source code** of the application as it stood at the time of distribution.
- Contributions to this repository are accepted under the same AGPL-3.0-or-later terms; contributors retain copyright on their work.
- Forks and derivative works must also be licensed AGPL-3.0-or-later (or compatible).

The AGPL choice is driven by our use of [MuPDF.js](https://mupdf.com) (Artifex Software, AGPL-3.0-or-later) for client-side PDF analysis. If the license becomes a constraint, the path back to a permissive license is to swap MuPDF for a permissively-licensed engine (e.g. PDF.js) — accuracy trade-offs apply.

## Getting started

Prerequisites: **Node.js ≥ 20** and **npm ≥ 10**.

```bash
git clone git@github.com:Godel-Technologies-LLP/spatialAI_website.git
cd spatialAI_website
npm install
npm run dev
```

The dev server runs at <http://localhost:3000/>. Vite serves the site with hot reload.

### Useful scripts

| Command | Purpose |
|---|---|
| `npm run dev` | Dev server, port 3000, hot reload |
| `npm run build` | Production build → `dist/` |
| `npm run preview` | Serve the `dist/` build locally |
| `npm run lint` | TypeScript check (`tsc --noEmit`) |

## Project layout

```
src/
  App.tsx                      Routes
  pages/                       Top-level pages (Home, Solutions, FAQ, …)
  features/                    Feature modules
    layout-analyzer/           PDF Vetter Tool
      lib/pdfAnalyzer.ts       Client-side analyzer (MuPDF Device walker)
      components/              Upload / progress / results UI
    geometry-to-text/          Geometry-to-Text product page
    asset-creation/            Case study
    digitising-farmlands/      Case study
    conversational-ai/         Case study
  components/                  Shared UI primitives
  data/                        Static product / page data
```

The layout-analyzer is the most code-heavy feature. Its analyzer entry point is `analyzePdf(file)` in `src/features/layout-analyzer/lib/pdfAnalyzer.ts`, which dynamically loads MuPDF on first use to keep other pages light.

## Tech stack

- **Vite 6** (build tool, dev server)
- **React 19** + **react-router-dom 7**
- **TypeScript 5.8**
- **Tailwind CSS 4** + custom design tokens in `src/theme.css`
- **motion** (animations)
- **mupdf 1.27** (WASM, PDF analysis)
- **three** + **@react-three/fiber** (3D visuals)

## Third-party notices

| Library | License |
|---|---|
| MuPDF.js | AGPL-3.0-or-later (Artifex Software, Inc.) |
| React | MIT |
| Vite | MIT |
| Tailwind CSS | MIT |
| motion (Framer Motion) | MIT |
| lucide-react | ISC |
| three.js | MIT |

Full dependency licenses are available via `npm ls --all` and in each package's `node_modules/<pkg>/LICENSE`.

## Privacy

The PDF Vetter Tool is engineered so that **no user file ever leaves the browser**. The PDF is read into memory via `File.arrayBuffer()`, processed by an in-browser WASM build of MuPDF, and discarded when the user navigates away. No file, byte, or derived artifact is sent to any server.

This is verifiable in DevTools → Network tab while analyzing a file.

## Contact

Godel Technologies LLP — <https://godeltech.in>
