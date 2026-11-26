-- v4: akkaunt videosi (1 GB gacha). Bir marta Run qiling.
alter table public.accounts add column if not exists video text;
insert into storage.buckets(id,name,public,file_size_limit) values('videos','videos',true,1073741824) on conflict (id) do update set file_size_limit=1073741824;
drop policy if exists vd_r on storage.objects; drop policy if exists vd_w on storage.objects;
create policy vd_r on storage.objects for select using (bucket_id='videos');
create policy vd_w on storage.objects for insert to authenticated with check (bucket_id='videos' and (storage.foldername(name))[1]=auth.uid()::text);
