-- Supabase SQL Editor 中运行一次。
create table if not exists public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade
);
create table if not exists public.responses (
  id bigint generated always as identity primary key,
  session_id uuid not null,
  item_id text not null check (item_id in ('q1','q2','q3','q4','q5','q6','q7','q8')),
  item_title text not null,
  selected text not null check (selected in ('A','B')),
  is_correct boolean not null,
  confidence integer not null check (confidence between 1 and 5),
  familiarity integer not null check (familiarity between 1 and 5),
  created_at timestamptz not null default now(),
  unique(session_id,item_id)
);
create index if not exists responses_item_idx on public.responses (item_id);
create index if not exists responses_session_idx on public.responses (session_id);
alter table public.admin_users enable row level security;
alter table public.responses enable row level security;
-- 有效答卷可匿名写入，但游客不能读取任意人的答卷。
create policy "Anyone can submit questionnaire answers" on public.responses
for insert to anon, authenticated with check (true);
-- 只有列在 admin_users 的登录用户才能查看提交记录。
create policy "Only approved admins can read answers" on public.responses
for select to authenticated using (
  exists (select 1 from public.admin_users a where a.user_id=(select auth.uid()))
);
create policy "Admins can read their own administrator record" on public.admin_users
for select to authenticated using (user_id=(select auth.uid()));
-- 在 Authentication > Users 创建你的管理员帐号后，将下面 UUID 改为实际 User UID 单独执行：
-- insert into public.admin_users(user_id) values ('YOUR_AUTH_USER_UUID');
-- 注意：公开匿名写入可能受到刷票影响；趣味活动适用，不等同科学研究数据防篡改系统。
