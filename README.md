# HRMS Frontend

- `npm install`
- `npm run dev` to start development (Vite)
- Set `VITE_API_URL` in `.env` to point to backend API (default `http://localhost:4000`)
- `npm run build` to build for production

Deploy to Vercel:
- Import the repo on Vercel
- Set `VITE_API_URL` environment variable to your backend URL
- Use `npm run build` as the build command and `dist` as the output directory
