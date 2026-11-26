-- v3: profil (nik/rasm) + supercar + chat (o'qildi, rasm/video) + e'lon o'chirish. Bir marta Run qiling (qayta ishlatsa ham xavfsiz).
alter table public.profiles add column if not exists avatar text;
alter table public.profiles add column if not exists nick text;
alter table public.profiles drop constraint if exists nick_fmt;
alter table public.profiles add constraint nick_fmt check (nick is null or nick ~ '^[A-Za-z0-9_]{3,24}$');
alter table public.profiles drop constraint if exists name_len;
alter table public.profiles add constraint name_len check (name is null or char_length(name) <= 40);
create unique index if not exists profiles_nick_u on public.profiles (lower(nick)) where nick is not null;
create or replace view public.public_names as select id, name, nick, avatar from public.profiles;
grant select on public.public_names to anon, authenticated;

alter table public.accounts add column if not exists supercars int not null default 0;

alter table public.messages add column if not exists media text;
alter table public.messages add column if not exists mtype text;
alter table public.messages add column if not exists read_at timestamptz;
alter table public.messages drop constraint if exists messages_body_check;
alter table public.messages add constraint messages_body_check check (length(body) between 0 and 1000 and (length(body)>0 or media is not null));

create or replace function public.msg_fill() returns trigger language plpgsql security definer set search_path=public as $$
begin
  new.sender := auth.uid(); new.sender_name := (select coalesce(nick,name) from profiles where id=auth.uid());
  new.is_staff := is_staff(); new.read_at := null;
  new.flag := new.body ~* '(\+?\d[\d\s\-]{8,}\d)|https?://|t\.me/|(^|\s)@\w{3,}|binance|usdt|\d{4}[\s-]?\d{4}[\s-]?\d{4}[\s-]?\d{4}';
  return new;
end $$;

create or replace function public.mark_read(t text) returns void language plpgsql security definer set search_path=public as $$
begin
  if can_chat(t) then update messages set read_at=now() where thread=t and sender<>auth.uid() and read_at is null; end if;
end $$;
revoke all on function public.mark_read(text) from public, anon;
grant execute on function public.mark_read(text) to authenticated;

insert into storage.buckets(id,name,public,file_size_limit) values('chat','chat',true,31457280) on conflict (id) do update set file_size_limit=31457280;
drop policy if exists ch_r on storage.objects; drop policy if exists ch_w on storage.objects;
create policy ch_r on storage.objects for select using (bucket_id='chat');
create policy ch_w on storage.objects for insert to authenticated with check (bucket_id='chat' and (storage.foldername(name))[1]=auth.uid()::text);

create or replace function public.delete_account(p_id text) returns void language plpgsql security definer set search_path=public as $$
begin
  if not (is_owner() or has_perm('ads') or has_perm('ban')) then raise exception 'forbidden'; end if;
  begin
    delete from accounts where id=p_id;
  exception when foreign_key_violation then
    update accounts set status='rad', top=false where id=p_id;
  end;
  perform add_log('E''lon o''chirildi: '||p_id);
end $$;
revoke all on function public.delete_account(text) from public, anon;
grant execute on function public.delete_account(text) to authenticated;
