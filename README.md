# Portfolio

Personal portfolio built with **Next.js 15**, **MongoDB** and a built-in **admin panel**. Every piece of content (profile, projects, skills, experience, blog posts) is edited from `/admin`. Messages sent through the contact form land in the admin inbox.

## Stack

- Next.js (App Router, Server Actions, ISR)
- MongoDB with Mongoose
- Cloudinary for image and resume uploads
- JWT session cookie (`jose`) and a bcrypt-hashed admin password

## Run it locally

1. Install dependencies:
   ```bash
   npm install
   ```
2. Copy the env file and fill it in:
   ```bash
   cp .env.example .env.local
   ```
3. Create your admin password hash and session secret:
   ```bash
   npm run hash-password -- "choose-a-long-password"
   ```
   Paste the two printed lines (`ADMIN_PASSWORD_HASH=…` and `JWT_SECRET=…`) into `.env.local`, and set `ADMIN_EMAIL`.
4. Load the starting content (profile, 3 projects, skills, experience, 1 draft post):
   ```bash
   npm run seed
   ```
   `npm run seed -- --reset` wipes the portfolio content and loads it again. Contact messages are never deleted.
5. Start the dev server:
   ```bash
   npm run dev
   ```
   The site runs at http://localhost:3000 and the admin panel at http://localhost:3000/admin.

## Project structure

```
src/
  app/
    (site)/          public pages: home, /work, /work/[slug], /blog, /blog/[slug]
    admin/           login + admin panel (dashboard, inbox, profile, projects, blog, skills, experience)
    api/admin/upload Cloudinary upload endpoint (admin only)
    actions.ts       contact form server action
  components/
    site/            public UI pieces
    admin/           admin forms and fields
  lib/               database, models, auth, data queries
  middleware.ts      protects /admin and /api/admin
scripts/             seed + hash-password
```

## Deploy to Vercel

1. Push this repo to GitHub.
2. In Vercel, choose **Add New → Project** and import the repo.
3. Add every variable from `.env.example` under **Settings → Environment Variables**. Use the same values as `.env.local`, except `NEXT_PUBLIC_SITE_URL`, which should be your real domain.
4. In MongoDB Atlas, go to **Network Access** and allow `0.0.0.0/0`, because Vercel's servers don't have fixed IPs.
5. Deploy.

Public pages are cached for up to an hour, and every save in the admin refreshes them right away. If you change data directly in the database or with the seed script, the live site catches up within the hour, or immediately after your next admin save.

## Connect a Namecheap domain

1. In Vercel, open the project, go to **Settings → Domains** and add `yourdomain.com` and `www.yourdomain.com`.
2. In Namecheap, go to **Domain List → Manage → Advanced DNS**, remove the default parking records, and add:

   | Type  | Host | Value                  |
   |-------|------|------------------------|
   | A     | @    | `76.76.21.21`          |
   | CNAME | www  | `cname.vercel-dns.com` |

   If Vercel's Domains page shows different values, use those instead.
3. Wait for DNS to update. It usually takes minutes, but can take up to 48 hours. Vercel issues the HTTPS certificate automatically.
