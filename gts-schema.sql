-- GTS TV portal database (run once in Supabase -> SQL Editor on the gts-tv-live project)
create schema if not exists gts;

create table if not exists gts.users (
  id uuid primary key default gen_random_uuid(),
  email varchar(255) unique not null,
  password_hash varchar(255) not null,
  name varchar(255),
  phone varchar(50),
  role varchar(20) default 'user',
  email_verified boolean default false,
  referred_by varchar(64),
  referred_by_user_id uuid,
  referral_reward_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
create table if not exists gts.sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references gts.users(id) on delete cascade,
  token varchar(255) unique not null,
  expires_at timestamptz not null,
  created_at timestamptz default now()
);
create table if not exists gts.user_subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references gts.users(id) on delete cascade,
  iptv_username varchar(255),
  iptv_password varchar(255),
  plan_id varchar(32),
  plan_name varchar(100) default '1 Month',
  price_cents integer default 2500,
  connections integer,
  status varchar(50) default 'pending_match',
  expires_at timestamptz,
  auto_renew boolean default false,
  payment_method varchar(32),
  payment_reference text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
create table if not exists gts.payments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references gts.users(id) on delete cascade,
  subscription_id uuid,
  amount_cents integer not null,
  payment_method varchar(32),
  payment_reference text,
  status varchar(20) default 'pending',
  plan_id varchar(32),
  created_at timestamptz default now()
);
create table if not exists gts.pending_matches (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references gts.users(id) on delete cascade,
  user_name varchar(255), user_phone varchar(50), user_email varchar(255),
  matched_iptv_username varchar(255),
  match_confidence double precision,
  status varchar(50) default 'pending',
  reviewed_at timestamptz,
  created_at timestamptz default now()
);
create table if not exists gts.pending_signups (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  name text, email text, phone text,
  plan_id varchar(32), plan_name text,
  amount_cents integer default 0,
  payment_method varchar(32),
  cashapp_name text, notes text,
  status varchar(20) default 'pending',
  requested_username varchar(32),
  requested_password varchar(64),
  created_at timestamptz default now()
);
create table if not exists gts.support_requests (
  id uuid primary key default gen_random_uuid(),
  user_id uuid,
  name text, email text not null, subject text, message text not null,
  status varchar(20) default 'open',
  resolved_at timestamptz,
  created_at timestamptz default now()
);
create table if not exists gts.auth_attempts (
  id bigserial primary key,
  kind text not null, email text, ip text,
  created_at timestamptz not null default now()
);
create table if not exists gts.reseller_inquiries (
  id uuid primary key default gen_random_uuid(),
  first_name text not null, last_name text not null, email text not null, phone text,
  status text not null default 'new' check (status in ('new','contacted','approved','declined')),
  admin_note text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_users_email on gts.users(email);
create index if not exists idx_sessions_token on gts.sessions(token);
create index if not exists idx_sessions_user on gts.sessions(user_id);
create unique index if not exists user_subscriptions_user_id_key on gts.user_subscriptions(user_id);
create index if not exists user_subscriptions_iptv_username_idx on gts.user_subscriptions(iptv_username);
create index if not exists pending_signups_requested_username_idx on gts.pending_signups(requested_username);
create index if not exists payments_status_created_idx on gts.payments(status, created_at);
create index if not exists auth_attempts_email_idx on gts.auth_attempts(kind, email, created_at);
create index if not exists auth_attempts_ip_idx on gts.auth_attempts(kind, ip, created_at);
create index if not exists users_referred_by_user_idx on gts.users(referred_by_user_id);

alter table gts.users enable row level security;
alter table gts.sessions enable row level security;
alter table gts.user_subscriptions enable row level security;
alter table gts.payments enable row level security;
alter table gts.pending_matches enable row level security;
alter table gts.pending_signups enable row level security;
alter table gts.support_requests enable row level security;
alter table gts.auth_attempts enable row level security;
alter table gts.reseller_inquiries enable row level security;

revoke all on all tables in schema gts from anon, authenticated;
revoke all on all sequences in schema gts from anon, authenticated;
grant usage on schema gts to service_role;
grant all on all tables in schema gts to service_role;
grant all on all sequences in schema gts to service_role;
alter default privileges in schema gts grant all on tables to service_role;
alter default privileges in schema gts grant all on sequences to service_role;

-- Admins: anyone who signs up with this email automatically becomes an admin.
create or replace function gts.make_admin() returns trigger language plpgsql as $$
begin
  if lower(new.email) in ('jeremy.goldy@gmail.com') then new.role := 'admin'; end if;
  return new;
end $$;
drop trigger if exists users_make_admin on gts.users;
create trigger users_make_admin before insert on gts.users for each row execute function gts.make_admin();
update gts.users set role = 'admin' where lower(email) in ('jeremy.goldy@gmail.com');
