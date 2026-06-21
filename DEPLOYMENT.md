# Deployment Guide

This project is ready for GitHub + Vercel deployment as a Next.js app.

## 1. Upload To GitHub

Create a new GitHub repository, then push this project directory.

Recommended repository contents:

- Source files under `app/`, `components/`, `data/`, `lib/`, and `types/`
- `package.json`
- `package-lock.json`
- `.env.example`
- `README.md`
- `DEPLOYMENT.md`
- `PROJECT_STATUS.md`

Do not upload:

- `node_modules/`
- `.next/`
- `.env.local`
- `.npm-cache/`

These are covered by `.gitignore`.

## 2. Connect Vercel

In Vercel:

1. Create a new project.
2. Import the GitHub repository.
3. Keep the framework preset as `Next.js`.
4. Use the default output directory.

Recommended commands:

```text
Install Command: npm install
Build Command: npm run build
```

## 3. Configure Environment Variables

In Vercel project settings, add:

```text
OPENAI_API_KEY=<your OpenAI API key>
OPENAI_MODEL=gpt-4.1-mini
```

`OPENAI_API_KEY` is optional for MVP deployment. If it is missing, the translation page still works with built-in fallback examples.

## 4. Deploy

Trigger a Vercel deployment from the dashboard or by pushing to the connected GitHub branch.

Expected behavior:

- Vercel installs dependencies from `package-lock.json`.
- Vercel runs `npm run build`.
- Vercel serves the app as a standard Next.js deployment.

## 5. Test `/translate`

After deployment, open:

```text
https://<your-vercel-domain>/translate
```

Minimum smoke checks:

- Enter `Xin chào` with `Viet -> Trung`; expected result includes `你好` and `ni hao`.
- Enter `Cảm ơn`; expected result includes `谢谢`.
- Save a result, then open `/vocab`; the saved item should appear on the same device/browser.
- Tap the pronunciation button on a Chinese result; supported browsers should play Chinese audio.

Fallback behavior:

- Without `OPENAI_API_KEY`, only built-in common phrases return full translation data.
- Unknown phrases show a fallback message asking for API configuration.

AI behavior:

- With `OPENAI_API_KEY`, unknown phrases should be translated by the server API.
- If OpenAI fails, the app returns fallback output instead of exposing an error to the user.

## Current Local Build Note

In the current Codex Windows environment, `npm install`, `npm run typecheck`, and `npm run lint` pass. `next build` compiles successfully, then fails later with `spawn EPERM` because the environment blocks Next.js internal child processes.

This is not expected on Vercel.
