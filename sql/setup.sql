-- ACC STORE: Supabase setup. Run once in SQL Editor (Run).
create sequence if not exists acc_seq start 1001;
create sequence if not exists deal_seq start 1001;

-- ============ PROFILES ============
create table if not exists public.profiles(
  id uuid primary key references auth.users(id) on delete cascade,
  email text, name text, phone text,
  role text not null default 'user' check (role in ('user','admin','owner')),
  perms jsonb not null default '{}'::jsonb,
  banned boolean not null default false, ban_reason text,
  kyc jsonb, kyc_status text not null default 'yoq' check (kyc_status in ('yoq','kutilmoqda','tasdiq','rad')),
  created_at timestamptz not null default now()
);
create or replace function public.handle_new_user() returns trigger language plpgsql security definer set search_path=public as $$
begin
  insert into profiles(id,email,name) values(new.id,new.email,coalesce(nullif(new.raw_user_meta_data->>'name',''),split_part(new.email,'@',1)));
  return new;
end $$;
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users for each row execute function public.handle_new_user();

-- helpers
create or replace function public.is_owner() returns boolean language sql stable security definer set search_path=public as $$
  select exists(select 1 from profiles where id=auth.uid() and role='owner') $$;
create or replace function public.is_staff() returns boolean language sql stable security definer set search_path=public as $$
  select exists(select 1 from profiles where id=auth.uid() and not banned and role in ('owner','admin')) $$;
create or replace function public.has_perm(p text) returns boolean language sql stable security definer set search_path=public as $$
  select exists(select 1 from profiles where id=auth.uid() and not banned and (role='owner' or (role='admin' and coalesce((perms->>p)::boolean,false)))) $$;
grant execute on function public.is_owner(), public.is_staff(), public.has_perm(text) to anon, authenticated;

alter table profiles enable row level security;
drop policy if exists p_sel on profiles; drop policy if exists p_upd on profiles;
create policy p_sel on profiles for select using (id=auth.uid() or has_perm('ban') or has_perm('pay') or has_perm('audit') or is_owner());
create policy p_upd on profiles for update using (id=auth.uid() or has_perm('ban') or is_owner());

create or replace function public.protect_profile() returns trigger language plpgsql as $$
begin
  if current_user in ('authenticated','anon') then
    if not is_owner() then
      new.role := old.role; new.perms := old.perms; new.email := old.email;
    end if;
    if not has_perm('ban') then
      new.banned := old.banned; new.ban_reason := old.ban_reason;
      if new.kyc_status is distinct from old.kyc_status and new.kyc_status <> 'kutilmoqda' then new.kyc_status := old.kyc_status; end if;
    end if;
    if old.role='owner' and not is_owner() then new.banned := false; end if;
  end if;
  return new;
end $$;
drop trigger if exists trg_protect_profile on profiles;
create trigger trg_protect_profile before update on profiles for each row execute function protect_profile();

-- public names only (seller / partner display)
create or replace view public.public_names as select id, name from public.profiles;
grant select on public.public_names to anon, authenticated;

-- ============ SETTINGS ============
create table if not exists public.settings(
  id int primary key default 1 check (id=1),
  usdt text default '', net text default 'TRC20', rate numeric default 12500, markup numeric default 20,
  cards jsonb not null default '[]'::jsonb
);
insert into settings(id,cards) values(1,'[{"k":"uz","name":"UZ karta (faqat O''zbekistonda)","num":"5614 6816 2946 4177"},{"k":"visa","name":"Visa (xalqaro)","num":"4463 0900 1182 1736"}]'::jsonb) on conflict (id) do nothing;
alter table settings enable row level security;
drop policy if exists s_sel on settings; drop policy if exists s_upd on settings;
create policy s_sel on settings for select using (true);
create policy s_upd on settings for update using (is_owner());

-- ============ LOGS ============
create table if not exists public.logs(
  id bigint generated always as identity primary key,
  actor uuid, actor_name text, text text not null, created_at timestamptz not null default now()
);
alter table logs enable row level security;
drop policy if exists l_sel on logs;
create policy l_sel on logs for select using (is_owner());
create or replace function public.add_log(t text) returns void language plpgsql security definer set search_path=public as $$
begin insert into logs(actor,actor_name,text) values(auth.uid(),(select name from profiles where id=auth.uid()),t); end $$;
revoke all on function public.add_log(text) from public, anon;
grant execute on function public.add_log(text) to authenticated;

-- ============ ACCOUNTS ============
create table if not exists public.accounts(
  id text primary key default ('A-'||nextval('acc_seq')),
  seller_id uuid not null references profiles(id),
  rank text not null, level int not null default 1, skins int not null default 0, mythic int not null default 0,
  price bigint not null check (price between 10000 and 150000000),
  description text default '', photos text[] not null default '{}',
  status text not null default 'tekshiruvda' check (status in ('tekshiruvda','sotuvda','bitimda','sotilgan','rad')),
  top boolean not null default false, created_at timestamptz not null default now()
);
alter table accounts enable row level security;
drop policy if exists a_sel on accounts; drop policy if exists a_ins on accounts; drop policy if exists a_upd on accounts; drop policy if exists a_del on accounts;
create policy a_sel on accounts for select using (status in ('sotuvda','bitimda','sotilgan') or seller_id=auth.uid() or is_staff());
create policy a_ins on accounts for insert with check (seller_id=auth.uid() and status='tekshiruvda' and top=false
  and exists(select 1 from profiles p where p.id=auth.uid() and not p.banned and p.kyc_status in ('kutilmoqda','tasdiq')));
create policy a_upd on accounts for update using ((seller_id=auth.uid() and status in ('tekshiruvda','rad')) or has_perm('ban') or has_perm('ads'));
create policy a_del on accounts for delete using (is_owner());
create or replace function public.protect_account() returns trigger language plpgsql as $$
begin
  if current_user in ('authenticated','anon') and not is_owner() then
    if not has_perm('ban') then new.status := old.status; end if;
    if not has_perm('ads') then new.top := old.top; end if;
    new.seller_id := old.seller_id;
    if new.price is distinct from old.price and not (old.status in ('tekshiruvda','rad') and old.seller_id=auth.uid()) then new.price := old.price; end if;
  end if;
  return new;
end $$;
drop trigger if exists trg_protect_account on accounts;
create trigger trg_protect_account before update on accounts for each row execute function protect_account();

-- ============ DEALS / PAYMENTS ============
create table if not exists public.deals(
  id text primary key default ('D-'||nextval('deal_seq')),
  account_id text not null references accounts(id),
  buyer_id uuid not null references profiles(id),
  mode text not null check (mode in ('full','inst')),
  term_days int not null default 0, markup numeric not null default 0,
  total bigint not null, n int not null default 1, paid_n int not null default 0,
  status text not null default 'kutilmoqda' check (status in ('kutilmoqda','faol','topshirish','yakunlangan','chiqarilgan','bekor')),
  created_at timestamptz not null default now(), last_paid_at timestamptz
);
alter table deals enable row level security;
drop policy if exists d_sel on deals;
create policy d_sel on deals for select using (buyer_id=auth.uid() or has_perm('pay') or exists(select 1 from accounts a where a.id=account_id and a.seller_id=auth.uid()));

create table if not exists public.payments(
  id bigint generated always as identity primary key,
  deal_id text not null references deals(id), user_id uuid not null,
  amount bigint not null, method text not null check (method in ('uz','visa','usdt')),
  txid text, status text not null default 'kutilmoqda' check (status in ('kutilmoqda','tasdiqlandi','rad')),
  created_at timestamptz not null default now()
);
create unique index if not exists payments_txid_u on payments(lower(txid)) where txid is not null;
alter table payments enable row level security;
drop policy if exists pay_sel on payments;
create policy pay_sel on payments for select using (user_id=auth.uid() or has_perm('pay'));

create or replace function public.create_deal(p_acc text, p_mode text, p_term int) returns deals language plpgsql security definer set search_path=public as $$
declare a accounts; mk numeric; n int := 1; tot bigint; d deals; t int := 0;
begin
  if auth.uid() is null then raise exception 'login_required'; end if;
  if exists(select 1 from profiles where id=auth.uid() and banned) then raise exception 'banned'; end if;
  select * into a from accounts where id=p_acc for update;
  if not found or a.status<>'sotuvda' then raise exception 'not_available'; end if;
  if a.seller_id=auth.uid() then raise exception 'own_account'; end if;
  tot := a.price; mk := 0;
  if p_mode='inst' then
    if p_term not in (30,60,90,120) then raise exception 'bad_term'; end if;
    select settings.markup into mk from settings where id=1;
    n := p_term/10; t := p_term; tot := ceil(a.price*(1+mk/100.0));
  elsif p_mode<>'full' then raise exception 'bad_mode'; end if;
  insert into deals(account_id,buyer_id,mode,term_days,markup,total,n) values(p_acc,auth.uid(),p_mode,t,mk,tot,n) returning * into d;
  update accounts set status='bitimda' where id=p_acc;
  perform add_log('Yangi bitim '||d.id||' ('||p_acc||')');
  return d;
end $$;
revoke all on function public.create_deal(text,text,int) from public, anon;
grant execute on function public.create_deal(text,text,int) to authenticated;

create or replace function public.submit_payment(p_deal text, p_method text, p_txid text default null) returns payments language plpgsql security definer set search_path=public as $$
declare d deals; amt bigint; each_ bigint; pr payments;
begin
  if auth.uid() is null then raise exception 'login_required'; end if;
  select * into d from deals where id=p_deal and buyer_id=auth.uid();
  if not found then raise exception 'deal_not_found'; end if;
  if d.status not in ('kutilmoqda','faol') or d.paid_n>=d.n then raise exception 'deal_closed'; end if;
  if exists(select 1 from payments where deal_id=p_deal and status='kutilmoqda') then raise exception 'payment_pending'; end if;
  if p_method not in ('uz','visa','usdt') then raise exception 'bad_method'; end if;
  if p_method='usdt' then
    if p_txid is null or length(p_txid)<20 or p_txid !~ '^[A-Za-z0-9]+$' then raise exception 'bad_txid'; end if;
    if exists(select 1 from payments where lower(txid)=lower(p_txid)) then raise exception 'dup_txid'; end if;
  else p_txid := null; end if;
  each_ := ceil(d.total::numeric/d.n);
  amt := case when d.paid_n=d.n-1 then d.total-each_*(d.n-1) else each_ end;
  insert into payments(deal_id,user_id,amount,method,txid) values(p_deal,auth.uid(),amt,p_method,p_txid) returning * into pr;
  perform add_log('To''lov yuborildi: '||p_deal||', '||amt||' so''m, '||p_method);
  return pr;
end $$;
revoke all on function public.submit_payment(text,text,text) from public, anon;
grant execute on function public.submit_payment(text,text,text) to authenticated;

create or replace function public.confirm_payment(p_id bigint, p_ok boolean) returns void language plpgsql security definer set search_path=public as $$
declare pr payments; d deals;
begin
  if not has_perm('pay') then raise exception 'forbidden'; end if;
  select * into pr from payments where id=p_id and status='kutilmoqda' for update;
  if not found then raise exception 'not_found'; end if;
  if p_ok then
    update payments set status='tasdiqlandi' where id=p_id;
    update deals set paid_n=paid_n+1, last_paid_at=now(), status=case when paid_n+1>=n then 'topshirish' else 'faol' end where id=pr.deal_id;
    perform add_log('To''lov tasdiqlandi: P-'||p_id||' ('||pr.deal_id||')');
  else
    update payments set status='rad' where id=p_id;
    perform add_log('To''lov rad etildi: P-'||p_id);
  end if;
end $$;
revoke all on function public.confirm_payment(bigint,boolean) from public, anon;
grant execute on function public.confirm_payment(bigint,boolean) to authenticated;

create or replace function public.deal_action(p_deal text, p_action text) returns void language plpgsql security definer set search_path=public as $$
declare d deals;
begin
  if not has_perm('pay') then raise exception 'forbidden'; end if;
  select * into d from deals where id=p_deal for update;
  if not found then raise exception 'not_found'; end if;
  if p_action='finish' then
    update deals set status='yakunlangan' where id=p_deal; update accounts set status='sotilgan' where id=d.account_id;
  elsif p_action='remove' then
    update deals set status='chiqarilgan' where id=p_deal; update accounts set status='sotuvda' where id=d.account_id;
  elsif p_action='cancel' then
    update deals set status='bekor' where id=p_deal; update accounts set status='sotuvda' where id=d.account_id;
  else raise exception 'bad_action'; end if;
  perform add_log('Bitim '||p_deal||': '||p_action);
end $$;
revoke all on function public.deal_action(text,text) from public, anon;
grant execute on function public.deal_action(text,text) to authenticated;

-- ============ PARTNERS ============
create table if not exists public.partners(
  id uuid primary key references profiles(id), nick text not null, nick_norm text unique,
  channel text default '', bio text default '', fee_paid boolean not null default false, created_at timestamptz not null default now()
);
create or replace function public.set_nick_norm() returns trigger language plpgsql as $$
begin new.nick_norm := lower(regexp_replace(new.nick,'[^a-zA-Z0-9]','','g')); return new; end $$;
drop trigger if exists trg_nick on partners;
create trigger trg_nick before insert or update on partners for each row execute function set_nick_norm();
alter table partners enable row level security;
drop policy if exists pt_sel on partners; drop policy if exists pt_w on partners;
create policy pt_sel on partners for select using (true);
create policy pt_w on partners for all using (is_owner()) with check (is_owner());

create table if not exists public.applications(
  user_id uuid primary key references profiles(id), nick text not null, channel text not null, bio text default '',
  status text not null default 'kutilmoqda', created_at timestamptz not null default now()
);
alter table applications enable row level security;
drop policy if exists ap_sel on applications; drop policy if exists ap_ins on applications; drop policy if exists ap_upd on applications; drop policy if exists ap_del on applications;
create policy ap_sel on applications for select using (user_id=auth.uid() or is_owner());
create policy ap_ins on applications for insert with check (user_id=auth.uid() and status='kutilmoqda' and length(nick) between 3 and 24 and channel ~* '^https://');
create policy ap_upd on applications for update using (user_id=auth.uid() or is_owner()) with check (is_owner() or status='kutilmoqda');
create policy ap_del on applications for delete using (is_owner());

create or replace function public.approve_partner(p_uid uuid, p_fee boolean default false) returns void language plpgsql security definer set search_path=public as $$
declare a applications;
begin
  if not is_owner() then raise exception 'forbidden'; end if;
  select * into a from applications where user_id=p_uid;
  if not found then raise exception 'not_found'; end if;
  insert into partners(id,nick,channel,bio,fee_paid) values(a.user_id,a.nick,a.channel,a.bio,p_fee);
  delete from applications where user_id=p_uid;
  perform add_log('Hamkor tasdiqlandi: @'||a.nick);
end $$;
revoke all on function public.approve_partner(uuid,boolean) from public, anon;
grant execute on function public.approve_partner(uuid,boolean) to authenticated;

-- ============ CHAT ============
create table if not exists public.messages(
  id bigint generated always as identity primary key,
  thread text not null, sender uuid not null, sender_name text, is_staff boolean not null default false,
  body text not null check (length(body) between 1 and 1000), flag boolean not null default false,
  created_at timestamptz not null default now()
);
create index if not exists messages_thread_i on messages(thread, id);
create or replace function public.can_chat(t text) returns boolean language sql stable security definer set search_path=public as $$
  select case
    when auth.uid() is null then false
    when t like 'sup:%' then substr(t,5)=auth.uid()::text or is_staff()
    when t like 'dm:%' then is_staff() or split_part(t,':',3)=auth.uid()::text or exists(select 1 from accounts a where a.id=split_part(t,':',2) and a.seller_id=auth.uid())
    when t like 'pt:%' then is_staff() or split_part(t,':',2)=auth.uid()::text or split_part(t,':',3)=auth.uid()::text
    else false end $$;
grant execute on function public.can_chat(text) to authenticated;
alter table messages enable row level security;
drop policy if exists m_sel on messages; drop policy if exists m_ins on messages;
create policy m_sel on messages for select using (can_chat(thread));
create policy m_ins on messages for insert with check (can_chat(thread) and (thread like 'sup:%' or not exists(select 1 from profiles where id=auth.uid() and banned)));
create or replace function public.msg_fill() returns trigger language plpgsql security definer set search_path=public as $$
begin
  new.sender := auth.uid(); new.sender_name := (select name from profiles where id=auth.uid());
  new.is_staff := is_staff();
  new.flag := new.body ~* '(\+?\d[\d\s\-]{8,}\d)|https?://|t\.me/|(^|\s)@\w{3,}|binance|usdt|\d{4}[\s-]?\d{4}[\s-]?\d{4}[\s-]?\d{4}';
  return new;
end $$;
drop trigger if exists trg_msg on messages;
create trigger trg_msg before insert on messages for each row execute function msg_fill();

-- ============ STORAGE ============
insert into storage.buckets(id,name,public) values('photos','photos',true) on conflict (id) do nothing;
insert into storage.buckets(id,name,public) values('kyc','kyc',false) on conflict (id) do nothing;
drop policy if exists ph_r on storage.objects; drop policy if exists ph_w on storage.objects;
drop policy if exists kyc_r on storage.objects; drop policy if exists kyc_w on storage.objects;
create policy ph_r on storage.objects for select using (bucket_id='photos');
create policy ph_w on storage.objects for insert to authenticated with check (bucket_id='photos' and (storage.foldername(name))[1]=auth.uid()::text);
create policy kyc_r on storage.objects for select to authenticated using (bucket_id='kyc' and ((storage.foldername(name))[1]=auth.uid()::text or has_perm('ban')));
create policy kyc_w on storage.objects for insert to authenticated with check (bucket_id='kyc' and (storage.foldername(name))[1]=auth.uid()::text);

-- ============ MAKE YOURSELF OWNER ============
-- 1) Sign up on the site with your email.
-- 2) Then run this line with your email:
-- update public.profiles set role='owner' where email='SIZNING_EMAIL@gmail.com';
