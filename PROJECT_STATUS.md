# Project Status

## Current Phase

MVP phase 3 is complete: translation system and Chinese pronunciation have been added on top of the lesson, scenario, vocabulary, and progress systems.

## Completed Features

- Mobile-first Next.js App Router project
- Bottom navigation
- Home dashboard
- Built-in beginner lesson data
- Lesson list and lesson detail pages
- Vocabulary, sentence, dialogue, choice question, and fill-in question rendering
- Immediate quiz feedback
- Course completion status and accuracy saved in `localStorage`
- Daily check-in and streak tracking
- Built-in scenario phrase library
- Saved vocabulary page
- Add/remove favorites through `localStorage`
- `/translate` page with language direction switch
- `/api/translate` server route
- Built-in fallback translations without OpenAI
- Optional OpenAI translation when `OPENAI_API_KEY` is configured
- Copy translation result
- Save translation result to vocabulary
- Chinese pronunciation through browser `SpeechSynthesis`

## Verified

- Dependency list includes required Next.js, React, TypeScript, Tailwind, PostCSS, and type packages.
- `npm install` completed successfully using a project-local npm cache.
- `npm run typecheck` passed.
- `npm run lint` passed.
- `next build` reached `Compiled successfully`.
- `next build` later failed with `spawn EPERM` in the Codex Windows environment due to blocked Next.js internal child processes.
- Static review passed for:
  - `OPENAI_API_KEY` only used in server route code
  - `localStorage` protected behind client-safe checks
  - `SpeechSynthesis` protected behind client-safe checks
  - fallback translation works without API key

## Known Limits

- No login or account sync.
- No database.
- Saved vocabulary and progress are browser-local only.
- AI chat API/page is not implemented yet.
- Browser pronunciation quality depends on the device's available Chinese voices.
- Current local Codex Windows environment blocks full `next build` completion with `spawn EPERM`.
- Current Next.js version reports a security advisory during install; upgrade should be planned before a public production launch.

## Deployment Readiness

The project is suitable for Vercel deployment as a standard Next.js app.

Vercel should use:

```text
Install Command: npm install
Build Command: npm run build
```

The app can run without OpenAI API configuration by using fallback translation data.

## Next Phase Plan

1. Deploy to Vercel and verify mobile access.
2. Upgrade Next.js to a patched version after deployment baseline is confirmed.
3. Add `/api/ai-chat` for scenario role-play.
4. Add an AI conversation practice UI after the API is stable.
5. Consider database-backed accounts and sync only after MVP usage is validated.
