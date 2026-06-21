# Vietnamese Chinese Learning App

Mobile-first MVP web app for Vietnamese users learning beginner Chinese.

## Current Scope

- Next.js App Router, TypeScript, Tailwind CSS
- Built-in beginner lessons and scenario phrase practice
- Saved vocabulary with `localStorage`
- Simple lesson progress and daily streak tracking
- Vietnamese-Chinese translation page
- Browser Chinese pronunciation with `SpeechSynthesis`
- Optional OpenAI-powered translation through a server API route

This stage does not include login, database, payments, or an AI chat page.

## Pages

- `/` home dashboard
- `/translate` Vietnamese-Chinese translation
- `/lessons` lesson list
- `/lessons/intro-greetings` lesson detail
- `/scenarios` scenario phrases
- `/vocab` saved vocabulary

## Local Run

```bash
npm install
npm run dev
```

Open:

```text
http://localhost:3000
```

Quality checks:

```bash
npm run typecheck
npm run lint
npm run build
```

Note: in the current Codex Windows environment, `next build` compiles successfully and then fails later with `spawn EPERM` because the environment blocks Next.js internal child processes. This is an environment restriction, not an application code error. `typecheck` and `lint` pass.

## Environment Variables

Create `.env.local` from `.env.example`:

```text
OPENAI_API_KEY=
OPENAI_MODEL=gpt-4.1-mini
```

`OPENAI_API_KEY` is optional. It is read only by the server route at `app/api/translate/route.ts` and must never be exposed in client components.

## Translation Modes

Fallback mode:

- Works without `OPENAI_API_KEY`.
- Uses built-in examples from `data/translations.ts`.
- Supports common daily, romantic, learning, food, and shopping phrases.

AI mode:

- Enabled when `OPENAI_API_KEY` is configured.
- `/api/translate` calls OpenAI from the server.
- The API response is normalized into the same shape as fallback results.
- If OpenAI fails, the app automatically returns fallback output.

## Vercel Deployment

Recommended Vercel settings:

- Framework Preset: `Next.js`
- Install Command: `npm install`
- Build Command: `npm run build`
- Output Directory: leave default

Environment variables in Vercel:

```text
OPENAI_API_KEY=<your key>
OPENAI_MODEL=gpt-4.1-mini
```

The app can still deploy and run without `OPENAI_API_KEY`; `/translate` will use fallback mode.

## Documentation

- Deployment guide: `DEPLOYMENT.md`
- Project status: `PROJECT_STATUS.md`

## Next Stage

After deployment is stable, add basic AI role-play practice through `/api/ai-chat`, then add a UI for scenario-based conversation practice.
