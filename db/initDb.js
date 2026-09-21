import { Client } from "pg";
import "dotenv/config";

const SQL = `
create table if not exists users (
  id uuid default gen_random_uuid() primary key,
  username varchar(255) unique not null,
  password text not null,
  firstname varchar(255) not null,
  lastname varchar(255) not null,
  membership_status varchar(255) default 'standard' check (membership_status in ('standard', 'member')),
  admin boolean default false
);

create table if not exists messages (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  body text not null,
  author_id uuid not null,
  created_at timestamptz default now(),
  constraint fk_user foreign key (author_id) references users(id) on delete cascade
)`;

async function initDb() {
  const client = new Client({
    connectionString: `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.HOST}:${process.env.DB_PORT}/${process.env.DATABASE}`,
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
}

initDb();
