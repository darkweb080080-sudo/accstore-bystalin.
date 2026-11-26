-- Profile: nickname + avatar. Run once in SQL Editor.
alter table public.profiles add column if not exists avatar text;
alter table public.profiles add column if not exists nick text;
alter table public.profiles drop constraint if exists nick_fmt;
alter table public.profiles add constraint nick_fmt check (nick is null or nick ~ '^[A-Za-z0-9_]{3,24}$');
alter table public.profiles drop constraint if exists name_len;
alter table public.profiles add constraint name_len check (name is null or char_length(name) <= 40);
create unique index if not exists profiles_nick_u on public.profiles (lower(nick)) where nick is not null;
create or replace view public.public_names as select id, name, nick, avatar from public.profiles;
grant select on public.public_names to anon, authenticated;
