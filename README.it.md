<div align="center">

# Clinical RAG — UI

**Un'interfaccia di chat curata e accessibile per interrogare documenti clinici con fonti citate.**
Angular 22 (Signals) · Tailwind CSS 4 · dark, premium, attenta alle WCAG.

[![Angular](https://img.shields.io/badge/Angular-22-1f2937?logo=angular&logoColor=white)](https://angular.dev/)
[![Tailwind](https://img.shields.io/badge/Tailwind_CSS-4-0f766e)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-111827?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-MIT-6b7280)](LICENSE)

**[English](README.md) · Italiano**

<!-- Dopo il deploy, sostituisci con il tuo URL pubblico: -->
**▶ Demo live:** _inserisci qui il tuo URL Vercel_

</div>

---

> **Cos'è.** Il front-end del portfolio AI clinico: un'interfaccia di chat che trasforma il
> [Clinical RAG Engine](https://github.com/dianapopovici/clinical-rag-engine) in qualcosa di
> realmente usabile. Domande in linguaggio naturale, risposte ancorate con i **frammenti di
> fonte citati** mostrati di fianco. Include una **modalità demo**, così il deploy pubblico
> funziona senza backend; passa a **modalità live** per parlare col RAG engine reale in locale.

> **Avvertenza sui dati.** Ogni frammento clinico mostrato è **100% sintetico**. Nessun dato
> reale di paziente è presente.

---

## Punti chiave

| Area | Cosa è stato fatto |
|---|---|
| **Design** | Tipografia intenzionale (Space Grotesk / DM Sans / JetBrains Mono), sistema di colori a design-token, superfici dark premium — non un template di default. |
| **Accessibilità** | Live region per screen reader sui nuovi messaggi, etichette ARIA su ogni controllo, supporto completo da tastiera, focus visibili, `prefers-reduced-motion`, gerarchia semantica. |
| **UX** | Reset "Nuova conversazione" (senza ricaricare), copia-risposta con conferma, auto-scroll, indicatore di digitazione, input multilinea (Invio invia · Shift+Invio a capo). |
| **Architettura** | Componenti standalone, **Signals** Angular per lo stato, servizio tipizzato che passa tra dati demo e API HTTP del RAG. |
| **Responsive** | Single-page, adatta a mobile, non ricarica mai. |

---

## Stack tecnologico

| Livello | Tecnologia |
|---|---|
| Framework | Angular 22 (standalone, Signals, nuovo control-flow) |
| Stile | Tailwind CSS 4 + design token |
| Linguaggio | TypeScript (strict) |
| Dati | Modalità demo (canned) o `POST /query` live al Clinical RAG Engine |
| Deploy | Vercel (build statica) |

---

## Avvio rapido

```bash
# 1. Installa
npm install

# 2. Server di sviluppo
npm start            # → http://localhost:4200

# 3. Build di produzione
npm run build        # → dist/clinical-rag-ui/browser
```

Di default l'app è in **modalità demo**. Per usare il motore reale, avvia il
[Clinical RAG Engine](https://github.com/dianapopovici/clinical-rag-engine) su
`http://localhost:8000`, poi attiva **Live** in alto a destra.

---

## Deploy (Vercel)

1. Pubblica questo repo su GitHub.
2. Su [vercel.com](https://vercel.com), **Add New → Project** e importa il repo.
3. Vercel legge [`vercel.json`](vercel.json) (build `ng build`, output
   `dist/clinical-rag-ui/browser`) e ti dà un URL pubblico.

---

<div align="center">

**Realizzato da [Diana Popovici](https://www.linkedin.com/in/diana-popovici)** — sistemi AI che funzionano davvero in produzione.

</div>
