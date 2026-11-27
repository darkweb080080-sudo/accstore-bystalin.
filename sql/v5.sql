-- v5: PP savdo (mashhurlik) xizmati. Bir marta Run qiling (qayta ishlatsa ham xavfsiz).
alter table public.profiles add column if not exists pp_admin boolean not null default false;
create unique index if not exists profiles_one_pp on public.profiles ((true)) where pp_admin;

create or replace function public.is_pp() returns boolean language sql stable security definer set search_path=public as $$
  select exists(select 1 from profiles where id=auth.uid() and not banned and (pp_admin or role='owner')) $$;
grant execute on function public.is_pp() to anon, authenticated;

create or replace function public.protect_profile() returns trigger language plpgsql as $$
begin
  if current_user in ('authenticated','anon') then
    if not is_owner() then
      new.role := old.role; new.perms := old.perms; new.email := old.email; new.pp_admin := old.pp_admin;
    end if;
    if not has_perm('ban') then
      new.banned := old.banned; new.ban_reason := old.ban_reason;
      if new.kyc_status is distinct from old.kyc_status and new.kyc_status <> 'kutilmoqda' then new.kyc_status := old.kyc_status; end if;
    end if;
    if old.role='owner' and not is_owner() then new.banned := false; end if;
  end if;
  return new;
end $$;

create or replace function public.set_pp_admin(p_uid uuid) returns void language plpgsql security definer set search_path=public as $$
begin
  if not is_owner() then raise exception 'forbidden'; end if;
  update profiles set pp_admin=false where pp_admin;
  if p_uid is not null then update profiles set pp_admin=true where id=p_uid and role<>'owner'; end if;
  perform add_log(case when p_uid is null then 'PP admin olib tashlandi' else 'PP admin tayinlandi: '||substr(p_uid::text,1,8) end);
end $$;
revoke all on function public.set_pp_admin(uuid) from public, anon;
grant execute on function public.set_pp_admin(uuid) to authenticated;

create table if not exists public.pp_items(
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 1 and 80),
  amount bigint not null check (amount > 0),
  price bigint not null check (price between 1000 and 150000000),
  image text not null, pos int not null default 0,
  created_at timestamptz not null default now()
);
alter table public.pp_items enable row level security;
drop policy if exists ppi_s on public.pp_items; drop policy if exists ppi_w on public.pp_items;
create policy ppi_s on public.pp_items for select using (true);
create policy ppi_w on public.pp_items for all using (is_pp()) with check (is_pp());

create table if not exists public.pp_cards(
  k text primary key check (k in ('visa','binance','uzs')),
  holder text not null default '', value text not null default '',
  updated_at timestamptz not null default now()
);
insert into public.pp_cards(k) values('visa'),('binance'),('uzs') on conflict do nothing;
alter table public.pp_cards enable row level security;
drop policy if exists ppc_s on public.pp_cards; drop policy if exists ppc_w on public.pp_cards;
create policy ppc_s on public.pp_cards for select to authenticated using (true);
create policy ppc_w on public.pp_cards for all using (is_pp()) with check (is_pp());

create or replace function public.can_chat(t text) returns boolean language sql stable security definer set search_path=public as $$
  select case
    when auth.uid() is null then false
    when t like 'sup:%' then substr(t,5)=auth.uid()::text or is_staff()
    when t like 'dm:%' then is_staff() or split_part(t,':',3)=auth.uid()::text or exists(select 1 from accounts a where a.id=split_part(t,':',2) and a.seller_id=auth.uid())
    when t like 'pt:%' then is_staff() or split_part(t,':',2)=auth.uid()::text or split_part(t,':',3)=auth.uid()::text
    when t like 'pp:%' then is_pp() or split_part(t,':',2)=auth.uid()::text
    else false end $$;

notify pgrst, 'reload schema';
