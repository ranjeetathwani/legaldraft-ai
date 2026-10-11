# LegalDraft AI — Full-stack SaaS MVP

A responsive legal-document drafting application built for the **Complete MVP Development and Deployment with Vibe Coding** assignment.

## Features
- Next.js frontend with responsive dashboard and document editor
- Backend `POST /api/generate` endpoint with validated inputs and three deterministic legal templates
- Backend `POST /api/pdf` endpoint generating downloadable PDFs
- Supabase email/password authentication and PostgreSQL document storage
- Row-level security (RLS): each user can access only their own documents
- Create, read, update and delete saved documents

**Disclaimer:** The generated content is a template for demonstration purposes and is not legal advice. A qualified lawyer must review it before use. No external AI model is called; drafting is template-based and does not incur AI API costs.

## Run locally

1. Install Node.js 20 or later.
2. Run `npm install`.
3. Create a Supabase project at https://supabase.com/dashboard.
4. Open the Supabase **SQL Editor**, paste and run `supabase/schema.sql`.
5. Under **Authentication → Providers**, enable Email. For testing, either confirm emails or turn off email confirmation in your own development project.
6. Copy `.env.example` to `.env.local` and replace placeholders with **Project URL** and **publishable / anon key** from Supabase project settings. Never use a service-role key in a `NEXT_PUBLIC_` variable.
7. Run `npm run dev` and open http://localhost:3000.
8. Create an account, generate a document, edit it, save it, reload it, and export a PDF.

Without Supabase environment variables, the drafting and PDF endpoints still work, but authentication and database saving are disabled and clearly labelled in the UI.

## Deploy on Vercel

1. Create a new GitHub repository and upload this project's files (not `node_modules` or `.env.local`).
2. At https://vercel.com/new, import your GitHub repository.
3. Select Next.js and add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` in **Environment Variables**.
4. Deploy, then open the Vercel URL.
5. In Supabase Authentication → URL Configuration, set **Site URL** to your Vercel URL. If using email confirmation, configure the permitted redirect URLs as needed.
6. Test sign-up/sign-in, generation, save, refresh, editing, deletion, and PDF export on the deployed URL.

## API example

```bash
curl -X POST http://localhost:3000/api/generate -H 'Content-Type: application/json' -d '{"template":"Non-Disclosure Agreement","partyA":"Acme Ltd","partyB":"Example Ltd","effectiveDate":"2026-10-11","jurisdiction":"Pakistan","purpose":"Discuss a potential partnership","terms":"Keep information confidential for two years."}'
```

PDF endpoint: `POST /api/pdf` with JSON `{ "title": "My Draft", "content": "..." }`. Returns `application/pdf`.

## Architecture

```text
Browser (Next.js React UI)
  |-- POST /api/generate --> validation + deterministic draft builder
  |-- POST /api/pdf      --> pdf-lib PDF export
  |-- Supabase Auth      --> email/password session
  +-- Supabase PostgREST --> PostgreSQL documents table (RLS per user)
```

## Assignment evidence checklist

- [ ] GitHub repository URL
- [ ] Live Vercel deployment URL
- [ ] Supabase database configured and live
- [ ] Screenshot: frontend dashboard
- [ ] Screenshot: generated legal draft
- [ ] Screenshot: document saved and reloaded from database
- [ ] Downloaded sample PDF
- [ ] README with setup and architecture

## Limitations / next steps

- No LLM integration; add an AI provider only after implementing abuse controls, privacy safeguards and review workflows.
- PDF export currently uses standard Helvetica and replaces non-Latin glyphs. Unicode font embedding is needed for Urdu and other scripts.
- No collaborative editing, legal compliance certification, payment system, or password recovery UI in this academic MVP.
- API endpoints have request validation but no rate limiting; add rate limiting before a public production launch.
