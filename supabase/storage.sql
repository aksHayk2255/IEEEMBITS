insert into storage.buckets (id, name, public) values
  ('team', 'team', true), ('events', 'events', true), ('projects', 'projects', true),
  ('achievements', 'achievements', true), ('gallery', 'gallery', true)
on conflict (id) do nothing;

create policy "public read managed images" on storage.objects for select using (bucket_id in ('team','events','projects','achievements','gallery'));
create policy "admins upload managed images" on storage.objects for insert to authenticated with check (public.is_admin() and bucket_id in ('team','events','projects','achievements','gallery'));
create policy "admins update managed images" on storage.objects for update to authenticated using (public.is_admin() and bucket_id in ('team','events','projects','achievements','gallery')) with check (public.is_admin() and bucket_id in ('team','events','projects','achievements','gallery'));
create policy "admins delete managed images" on storage.objects for delete to authenticated using (public.is_admin() and bucket_id in ('team','events','projects','achievements','gallery'));
