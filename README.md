# Members Only

An exclusive clubhouse where members can write anonymous posts. Anyone can read the stories, but only members can see who wrote them.

## Features

- Sign up / log in with passport and bcrypt-hashed passwords
- "Join the club" secret passcode to become a member
- Members see message authors and dates; everyone else sees only the stories
- Admins can delete messages and users

## Tech stack

- express
- pg
- passport, passport-local
- express-session, connect-pg-simple
- bcryptjs
- ejs
- express-validator
- connect-flash
- method-override
- serve-favicon
- date-fns
- dotenv
- nodemon (dev)

## Setup

Prerequisites: Node.js 18+, PostgreSQL.

```bash
git clone <repo-url>
cd odin-members-only
npm install
createdb members_only
node db/initDb.js
npm run dev
```

Create a `.env` file in the project root:

```
NODE_ENV = development
HOST = localhost
DB_USER = your_db_user
DATABASE = members_only
DB_PASSWORD = your_db_password
DB_PORT = 5432
COOKIE_SECRET = random_secret
MEMBERSHIP_SECRET = pick_a_secret
ADMIN_SECRET = pick_a_secret
```

`COOKIE_SECRET` signs sessions, `MEMBERSHIP_SECRET` is the join-the-club passcode, and `ADMIN_SECRET` is the secret phrase for a hidden message that promotes you to admin.

Open [http://localhost:8000](http://localhost:8000).

## Deploy (Render + Neon)

Set these env vars on the web service: `DATABASE_URL` (Neon), `COOKIE_SECRET`, `MEMBERSHIP_SECRET`, `ADMIN_SECRET`. Start command: `npm start`. Run `node db/initDb.js` against the Neon database (with the `DB_*` vars set) before first request.