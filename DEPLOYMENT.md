# Deployment (Vercel / Netlify)

## Environment variables

Set these in your host dashboard:

- `VITE_SUPABASE_URL` – Supabase project URL
- `VITE_SUPABASE_ANON_KEY` – Supabase anon/public key

## Vercel

1. Connect your Git repo (e.g. GitHub).
2. Root directory: `lunds-website` (or leave blank if repo root is the app).
3. Build command: `npm run build`
4. Output directory: `dist`
5. Add the two env vars above.
6. Deploy.

## Netlify

1. Connect your Git repo.
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Add the two env vars in Site settings → Environment variables.
5. Deploy.

## After deploy

- Create an admin user in Supabase (Authentication → Users) if you haven’t.
- Open `https://your-site.com/admin`, sign in, and update the Amazon URL and any copy/images as needed.
