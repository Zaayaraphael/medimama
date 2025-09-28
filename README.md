# MediMama

MediMama is a small full-stack medical assistant app built with React (Vite) frontend and an Express + MongoDB backend. It includes user authentication, a symptom checker and AI-powered features using Google Generative AI (Gemini). This README explains how to set up, run, and test the app locally.

---

## Repository layout

- `backend/` - Express server, MongoDB models and API routes
  - `server.js` - main server and auth routes (/api/signup, /api/login, /api/fetch-user, /api/logout)
  - `config/db.js` - MongoDB connection helper
  - `models/user.model.js` - Mongoose User schema
  - `.env` - backend environment variables (not checked into source)

- `medimama-frontend/` - Vite + React frontend
  - `src/` - React source code
  - `src/pages` - page components (SignUp, SignIn, Symptom, Pharmacy, etc.)
  - `src/components` - reusable UI components (Navbar, ChatBot, RequireAuth)
  - `src/store` - Zustand store for auth
  - `src/.env` - frontend environment variables for Vite (not checked into source)

---

## Quick start (development)

Prerequisites:
- Node.js 18+ / npm
- A MongoDB instance (Atlas or local)
- (Optional) Google Generative AI API key (Gemini) if you want AI features to work

1. Clone the repo

```bash
git clone <repo-url>
cd Medimama
```

2. Backend setup

```powershell
cd backend
npm install
# Create or update backend/.env with values (see Env section below)
node server.js
```

If the backend connects successfully you'll see log output showing the MongoDB host and that the server is running on the configured port (default `5000`).

3. Frontend setup

```powershell
cd medimama-frontend
npm install
# Create or update medimama-frontend/src/.env (see Env section below)
npm run dev
```

Open your browser at `http://localhost:5173` (Vite default) and interact with the app.

---

## Environment variables

Backend (`backend/.env`)

```
MONGODB_URI=<your mongodb connection string>
PORT=5000
JWT_SECRET=<your_jwt_secret>
CLIENT_URL=http://localhost:5173
```

Frontend (`medimama-frontend/src/.env`)

```
VITE_GOOGLE_GENAI_API_KEY=<your_google_generative_api_key>
# or
VITE_GEMINI_API_KEY=<your_fallback_key>
```

Notes:
- The frontend code looks for `VITE_GOOGLE_GENAI_API_KEY` first, then `VITE_GEMINI_API_KEY` as a fallback.
- Restart Vite after editing the `.env` file.

---

## Auth flow & persistence

- Frontend uses `Zustand` for auth state in `src/store/auth.js`. Axios is configured with `withCredentials = true` to include cookies.
- Backend sets an `httpOnly` cookie named `token` after signup/login; the frontend then calls `/api/fetch-user` to populate the store.
- The app persists a local flag `isAuthenticated` in `localStorage` to keep route-guards from bouncing users while the app fetches the user. For best security, call `fetchUser()` on app mount to fully validate the session.

---

## API endpoints (backend)

- POST `/api/signup` - Create a new user.
  - Request body JSON: `{ firstname, lastname, email, phone, dob, nationality, state, lga, city, password }`
  - Response: `{ user, message }` and sets httpOnly `token` cookie on success.

- POST `/api/login` - Authenticate user.
  - Request body JSON: `{ email, password }`
  - Response: `{ user, message }` and sets httpOnly `token` cookie on success.

- GET `/api/fetch-user` - Returns the logged in user's profile using the `token` cookie.
  - Requires `token` cookie to be present.

- POST `/api/logout` - Clears the `token` cookie server-side.

---

## Gemini / Google Generative AI integration

Several components call Google Generative AI (Gemini):
- `src/components/ChatBot.jsx`
- `src/pages/symptom.jsx`
- `src/pages/pharmacy.jsx`

These components read the API key from Vite environment variables and will show an informative message if the key is not provided.

To enable AI features, put your GenAI key into `medimama-frontend/src/.env` as `VITE_GOOGLE_GENAI_API_KEY` and restart the frontend.

Security note: Do not commit API keys to source control. In production you should proxy AI calls through your backend and store keys securely on the server.

---

## Useful development tips

- If you run into CORS or cookie issues, verify `CLIENT_URL` in `backend/.env` matches your frontend origin (for example `http://localhost:5173`) and that `axios.defaults.withCredentials = true` is enabled in `src/store/auth.js`.
- To auto-populate the frontend auth store on page reload, call the `fetchUser()` store action from a top-level component (e.g., `App.jsx`) on mount.

---

## Troubleshooting

- Backend cannot connect to MongoDB:
  - Check `MONGODB_URI` in `backend/.env`.
  - If using Atlas, ensure your IP address is allowed (or allow access from anywhere while developing).

- Frontend cannot talk to backend:
  - Ensure backend is running at `http://localhost:5000` (or the URL you configured in `backend/.env`).
  - Confirm `CLIENT_URL` in backend matches frontend origin.
  - Check browser console for CORS or cookie errors.

- Gemini/GenAI calls failing:
  - Verify `VITE_GOOGLE_GENAI_API_KEY` is set and valid.
  - For production, proxy AI requests from backend to avoid exposing keys client-side.

---

## Next improvements (nice to have)

- Add server-side validation with `express-validator` or `Joi` and map errors back to frontend fields.
- Implement unit/integration tests for the API (Jest + Supertest) and frontend (React Testing Library).
- Proxy GenAI calls through the backend and add rate-limiting and caching.
- Improve UX: show loading states, success/error toasts consistently, and add input masks for phone numbers.

---

If you'd like, I can:
- Add `fetchUser()` invocation on app mount so the client store is synced with the backend cookie automatically;
- Create a `README` section with sample curl/postman requests for each API endpoint;
- Add a Vite proxy so you can call `/api/*` without CORS during development.

Tell me which follow-up you'd like and I will implement it next.