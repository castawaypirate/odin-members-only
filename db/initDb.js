const SQL = `
create table if not exists users (
  id uuid default get_random_uuid() primary key,
  username varchar(255) unique not null,
  password text not null,
  firstname varchar(255),
  lastname varchar(255),
  membership_status varchar(255) default 'standard' check (membership_status in ('standard', 'member')),
  admin boolean default false
);

create table if not exists messages (
  id uuid default get_random_uuid() primary key,
  title text not null,
  body text not null,
  author_id uuid,
  create_at timestamptz default now(),
)
`;
