<div align="center">

# Clinical RAG — UI

**A polished, accessible chat interface for querying clinical documents with cited sources.**
Angular 22 (Signals) · Tailwind CSS 4 · dark, premium, WCAG-minded.

[![Angular](https://img.shields.io/badge/Angular-22-1f2937?logo=angular&logoColor=white)](https://angular.dev/)
[![Tailwind](https://img.shields.io/badge/Tailwind_CSS-4-0f766e)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-111827?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-MIT-6b7280)](LICENSE)

**English · [Italiano](README.it.md)**

**▶ Live demo: [clinical-rag-ui.vercel.app](https://clinical-rag-ui.vercel.app)**

</div>

---

> **What it is.** The front-end of the clinical AI portfolio: a chat UI that turns the
> [Clinical RAG Engine](https://github.com/dianapopovici/clinical-rag-engine) into something
> a person can actually use. Ask in natural language, get a grounded answer with the **cited
> source snippets** shown alongside it. Ships with a **demo mode**, so the public deployment
> works with no backend; flip to **live mode** to talk to the real RAG engine on `localhost`.

> **Data disclaimer.** Every clinical snippet shown is **100% synthetic**. No real patient
> data is present.

---

## Highlights

| Area | What was done |
|---|---|
| **Design** | Intentional type system (Space Grotesk / DM Sans / JetBrains Mono), design-token color system, premium dark surfaces — not a default template. |
| **Accessibility** | Screen-reader live region for new messages, ARIA labels on every control, full keyboard support, visible focus rings, `prefers-reduced-motion`, semantic headings. |
| **UX** | New-conversation reset (no reload), copy-answer with confirmation, auto-scroll, typing indicator, multiline input (Enter to send · Shift+Enter for newline). |
| **Architecture** | Standalone components, Angular **Signals** for state, a typed service that swaps between demo data and the live RAG HTTP API. |
| **Responsive** | Single-page, mobile-friendly layout that never reloads. |

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Angular 22 (standalone, Signals, new control flow) |
| Styling | Tailwind CSS 4 + design tokens |
| Language | TypeScript (strict) |
| Data | Demo mode (canned) or live `POST /query` to the Clinical RAG Engine |
| Deploy | Vercel (static build) |

---

## Quickstart

```bash
# 1. Install
npm install

# 2. Run the dev server
npm start            # → http://localhost:4200

# 3. Production build
npm run build        # → dist/clinical-rag-ui/browser
```

By default the app runs in **demo mode**. To use the real engine, start the
[Clinical RAG Engine](https://github.com/dianapopovici/clinical-rag-engine) on
`http://localhost:8000`, then toggle **Live** in the top-right.

---

## Project Structure

```
src/
├── app/
│   ├── app.ts            # root component — chat state via Signals
│   ├── app.html          # accessible chat template
│   ├── app.config.ts     # providers (HttpClient)
│   ├── rag.service.ts    # demo data ↔ live RAG HTTP API
│   └── models.ts         # typed message / source models
├── styles.css            # design-token system + components
└── index.html
```

---

## Deploy (Vercel)

1. Push this repo to GitHub.
2. On [vercel.com](https://vercel.com), **Add New → Project** and import the repo.
3. Vercel reads [`vercel.json`](vercel.json) (build `ng build`, output
   `dist/clinical-rag-ui/browser`) and gives you a public URL.

---

<div align="center">

**Built by [Diana Popovici](https://www.linkedin.com/in/diana-popovici)** — AI systems that actually work in production.

</div>
