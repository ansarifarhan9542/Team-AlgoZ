# Deploying to Render with MongoDB Atlas

## 1. MongoDB Atlas setup

1. Create a free cluster at https://cloud.mongodb.com (M0 tier is fine to start).
2. **Database Access** → add a database user with a strong password (this is separate from your Atlas login).
3. **Network Access** → add an IP entry:
   - Easiest: `0.0.0.0/0` (allow from anywhere) — required because Render's outbound IP isn't fixed on standard plans. Rely on your DB username/password + a strong `JWT_SECRET` for security.
   - If you're on a paid Render plan with a Static Outbound IP add-on, whitelist that IP instead.
4. **Database** → Connect → "Drivers" → copy the connection string. It looks like:
   ```
   mongodb+srv://<username>:<password>@<cluster>.mongodb.net/?retryWrites=true&w=majority
   ```
5. Add your database name before the `?`: `.../hrms?retryWrites=true&w=majority`
6. URL-encode any special characters in your password (e.g. `@` → `%40`).

## 2. Push this code to GitHub

Render deploys from a Git repo, not a zip upload.

```bash
cd server
git init
git add .
git commit -m "Initial HRMS backend"
git branch -M main
git remote add origin https://github.com/<you>/hrms-backend.git
git push -u origin main
```

`.env` is already git-ignored — never commit real secrets. `.env.example` shows what's needed.

## 3. Create the Render Web Service

1. https://dashboard.render.com → **New** → **Web Service** → connect your GitHub repo.
2. If your repo root *is* this `server` folder, leave Root Directory blank. If `server` is a subfolder, set **Root Directory** to `server`.
3. **Environment**: Node
4. **Build Command**: `npm install`
5. **Start Command**: `npm start`
6. **Instance Type**: Free is fine to start (note: free instances spin down when idle, and their disk is ephemeral — see the uploads note below).

## 4. Environment variables (Render dashboard → Environment)

Set these (values from `.env.example`, filled in for real):

| Key | Value |
|---|---|
| `NODE_ENV` | `production` |
| `MONGO_URI` | your Atlas connection string |
| `JWT_SECRET` | a long random string (e.g. `openssl rand -hex 32`) |
| `JWT_EXPIRE` | `7d` |
| `CLIENT_URL` | your frontend's URL |
| `CORS_ORIGINS` | your frontend's URL (comma-separate if more than one) |
| `EMAIL_HOST` / `EMAIL_PORT` / `EMAIL_USER` / `EMAIL_PASS` / `EMAIL_FROM` | your SMTP provider |

Do **not** set `PORT` — Render injects it automatically and `config/env.js` already reads `process.env.PORT`.

## 5. Health check

In the service's **Settings → Health Check Path**, set it to `/health`. The app already exposes this route.

## 6. File uploads — important caveat

Render's filesystem is **ephemeral** on the free/standard plans: anything written to `/uploads` (profile pictures, documents) is wiped on every restart or redeploy. This backend currently saves uploads to local disk via Multer (`middleware/uploadMiddleware.js`).

For production you have two options:
- **Render Persistent Disk** (paid add-on) — mount a disk at `/opt/render/project/src/uploads` and point `uploadMiddleware.js` at it. Files survive restarts but not across zero-downtime redeploys unless the disk is truly persistent per Render's docs.
- **Cloud object storage (recommended)** — switch `uploadMiddleware.js` to upload directly to S3, Cloudinary, or similar, and store the returned URL instead of a local path. This is the more robust fix if you expect real usage.

I can wire up Cloudinary or S3 storage for you if you want — just say the word.

## 7. Email deliverability

Gmail SMTP works for testing but can throttle or block server-originating mail. For production, a transactional email provider (SendGrid, Mailgun, Postmark, Resend) tends to be more reliable — same `sendEmail.js` interface, just swap the SMTP host/credentials.

## 8. After deploy

- Confirm `https://<your-render-url>/health` returns `{ success: true, ... }`.
- Register a test user and confirm the verification email arrives (check spam).
- Watch Render's **Logs** tab for the `MongoDB connected: ...` line to confirm Atlas connectivity.
