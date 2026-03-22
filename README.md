# CampusPreorder

This repo is arranged as two deployable apps:

- `frontend`: Next.js web app
- `backend`: Express API with mock data and order logic

## Local development

1. Install frontend dependencies: `npm install` in `frontend`
2. Install backend dependencies: `npm install` in `backend`
3. Start the API: `npm run dev:backend`
4. Start the web app: `npm run dev:frontend`

The frontend expects the backend at `http://localhost:4000` by default.

## Docker

Run both services together:

```bash
docker compose up --build
```

Frontend: `http://localhost:3000`
Backend: `http://localhost:4000`
