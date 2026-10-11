-- Run in Supabase SQL Editor. Email/password auth is provided by Supabase Auth.
create extension if not exists pgcrypto;
create table if not exists public.documents (
 id uuid primary key default gen_random_uuid(),
 user_id uuid not null references auth.users(id) on delete cascade,
 title text not null check (char_length(title) between 1 and 160),
 template text not null check (template in ('Non-Disclosure Agreement','Service Agreement','Employment Agreement')),
 content text not null check (char_length(content) between 1 and 30000),
 created_at timestamptz not null default now(),
 updated_at timestamptz not null default now()
);
create index if not exists documents_user_created_idx on public.documents(user_id,created_at desc);
alter table public.documents enable row level security;
create policy "Owners can view documents" on public.documents for select to authenticated using ((select auth.uid())=user_id);
create policy "Owners can insert documents" on public.documents for insert to authenticated with check ((select auth.uid())=user_id);
create policy "Owners can update documents" on public.documents for update to authenticated using ((select auth.uid())=user_id) with check ((select auth.uid())=user_id);
create policy "Owners can delete documents" on public.documents for delete to authenticated using ((select auth.uid())=user_id);
