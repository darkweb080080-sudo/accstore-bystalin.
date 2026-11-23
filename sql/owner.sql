-- Owner lock: only darkweb080080@gmail.com can ever be owner, and only after its email is verified.
create or replace function public.handle_new_user() returns trigger language plpgsql security definer set search_path=public as $$
begin
  insert into profiles(id,email,name) values(new.id,new.email,
    coalesce(nullif(new.raw_user_meta_data->>'name',''),nullif(new.raw_user_meta_data->>'full_name',''),split_part(new.email,'@',1)))
  on conflict (id) do nothing;
  return new;
end $$;

create or replace function public.make_owner() returns trigger language plpgsql security definer set search_path=public as $$
begin
  if lower(new.email)='darkweb080080@gmail.com' and new.email_confirmed_at is not null then
    insert into profiles(id,email,name) values(new.id,new.email,split_part(new.email,'@',1)) on conflict (id) do nothing;
    update profiles set role='owner' where id=new.id;
  end if;
  return new;
end $$;
drop trigger if exists trg_make_owner on auth.users;
create trigger trg_make_owner after insert or update of email_confirmed_at on auth.users for each row execute function public.make_owner();

-- nobody else can become owner, by any means
create or replace function public.protect_profile() returns trigger language plpgsql as $$
begin
  if new.role='owner' and lower(coalesce(new.email,''))<>'darkweb080080@gmail.com' then new.role := old.role; if new.role='owner' then new.role:='user'; end if; end if;
  if current_user in ('authenticated','anon') then
    if not is_owner() then
      new.role := old.role; new.perms := old.perms; new.email := old.email;
    end if;
    if not has_perm('ban') then
      new.banned := old.banned; new.ban_reason := old.ban_reason;
      if new.kyc_status is distinct from old.kyc_status and new.kyc_status <> 'kutilmoqda' then new.kyc_status := old.kyc_status; end if;
    end if;
    if old.role='owner' then new.banned := false; new.role := 'owner'; end if;
  end if;
  return new;
end $$;

-- apply now to the existing account
insert into public.profiles(id,email,name)
select id,email,coalesce(raw_user_meta_data->>'name',split_part(email,'@',1)) from auth.users where lower(email)='darkweb080080@gmail.com'
on conflict (id) do nothing;
update public.profiles set role='owner' where lower(email)='darkweb080080@gmail.com'
  and exists(select 1 from auth.users u where u.id=profiles.id and u.email_confirmed_at is not null);
select id,email,role from public.profiles where lower(email)='darkweb080080@gmail.com';
