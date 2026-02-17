-- site_content: key-value store for all editable copy and image URLs
create table if not exists public.site_content (
  id uuid primary key default gen_random_uuid(),
  key text not null unique,
  value jsonb,
  updated_at timestamptz default now()
);

-- RLS: anyone can read (public site), only authenticated users can write (admin)
alter table public.site_content enable row level security;

create policy "Public read access"
  on public.site_content for select
  using (true);

create policy "Authenticated users can update"
  on public.site_content for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- Storage: create a bucket named "site-images" in Supabase Dashboard → Storage, set to public.
-- Policies below apply once the bucket exists.
create policy "Public read site-images"
  on storage.objects for select
  using (bucket_id = 'site-images');

create policy "Auth upload site-images"
  on storage.objects for insert
  with check (bucket_id = 'site-images' and auth.role() = 'authenticated');

create policy "Auth update site-images"
  on storage.objects for update
  using (bucket_id = 'site-images' and auth.role() = 'authenticated');

create policy "Auth delete site-images"
  on storage.objects for delete
  using (bucket_id = 'site-images' and auth.role() = 'authenticated');
