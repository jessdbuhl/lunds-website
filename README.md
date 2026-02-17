# Lund's Swedish Pancake Mix Website

Landing site for Lund's Swedish Pancake Mix (Birch Benders–style), with an admin area to edit copy and images. Built with React, TypeScript, Tailwind, and Supabase.

## Setup

1. **Clone and install**
   ```bash
   cd lunds-website
   npm install
   ```

2. **Supabase**
   - Create a project at [supabase.com](https://supabase.com).
   - In the SQL Editor, run the migration: `supabase/migrations/001_site_content.sql`.
   - Create a Storage bucket named `site-images` (public) if not created by the migration.
   - Run `supabase/seed.sql` to insert default content.
   - In Authentication → Users, add an admin user (email + password).

3. **Env**
   - Copy `.env.example` to `.env`.
   - Set `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` from your Supabase project settings.

4. **Run**
   ```bash
   npm run dev
   ```
   - Site: http://localhost:5173
   - Admin: http://localhost:5173/admin (sign in with your Supabase user)

## Scripts

- `npm run dev` – dev server
- `npm run build` – production build
- `npm run preview` – preview production build
- `npm run lint` – ESLint

## Deploy

See [DEPLOYMENT.md](DEPLOYMENT.md) for Vercel and Netlify.
