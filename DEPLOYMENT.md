# MindlyftAI — Plesk Production Deployment Guide

## Prerequisites
- Plesk Obsidian 18+ with **Node.js** extension installed
- MySQL 8.0+ database created in Plesk
- SSL certificate (Let's Encrypt via Plesk)
- Node.js 20 LTS selected for the domain

---

## 1. Create the MySQL database in Plesk

Plesk → **Databases** → **Add Database**

| Field | Value |
|-------|-------|
| Database name | `mindlyftai` |
| Database username | e.g. `mindlyft_user` |
| Password | strong random password |

Note down the credentials — you'll need them in step 3.

---

## 2. Upload / clone the project

```bash
# SSH into your server, then:
cd /var/www/vhosts/<YOUR_DOMAIN>/httpdocs
git clone <your-repo-url> .
```

---

## 3. Set environment variables

Copy `.env.production` to `.env` and fill in the placeholders:

```bash
cp .env.production .env
nano .env   # or use Plesk File Manager
```

Minimum required values:

```env
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://<YOUR_DOMAIN>
NEXT_PUBLIC_API_URL=https://<YOUR_DOMAIN>/api
NEXTAUTH_URL=https://<YOUR_DOMAIN>
AUTH_SECRET=<generate with: node -e "console.log(require('crypto').randomBytes(32).toString('base64url'))">
DATABASE_URL="mysql://<DB_USER>:<DB_PASSWORD>@localhost:3306/mindlyftai"
```

> **Tip:** You can also set these in Plesk → Node.js → Environment Variables
> instead of a `.env` file — either approach works.

---

## 4. Install dependencies & build

```bash
npm ci --omit=dev          # clean install, production deps only
npx prisma generate         # generate Prisma client
npx prisma migrate deploy   # run DB migrations (create tables)
npm run build               # Next.js production build → .next/
```

> If this is the first deploy and you need seed data:
> ```bash
> npm run seed
> ```

---

## 5. Configure Plesk Node.js

In Plesk → **Node.js** for your domain:

| Setting | Value |
|---------|-------|
| Document root | `/httpdocs` |
| Application root | `/httpdocs` |
| Application startup file | `node_modules/.bin/next` |
| Application mode | Production |
| Application URL | `https://<YOUR_DOMAIN>` |

**Or** use the `standalone` output (recommended — already set in `next.config.ts`):

After build, the self-contained server is at `.next/standalone/server.js`.  
Set the **startup file** to `.next/standalone/server.js` and copy static assets:

```bash
cp -r public .next/standalone/
cp -r .next/static .next/standalone/.next/
```

Then in Plesk set startup file to `.next/standalone/server.js`.

---

## 6. Start the application

Via Plesk Node.js panel → **Restart App**, or via SSH:

```bash
# Using PM2 (recommended for process management)
npm i -g pm2
pm2 start .next/standalone/server.js --name mindlyftai
pm2 save
pm2 startup   # auto-start on reboot
```

---

## 7. Verify

- `https://<YOUR_DOMAIN>` → marketing homepage
- `https://<YOUR_DOMAIN>/login` → login page
- `https://<YOUR_DOMAIN>/admin/dashboard` → redirects to login if not authenticated

---

## Re-deploy (updates)

```bash
git pull
npm ci --omit=dev
npx prisma migrate deploy
npm run build
cp -r public .next/standalone/
cp -r .next/static .next/standalone/.next/
pm2 restart mindlyftai
```

---

## Environment variable reference

| Variable | Required | Description |
|----------|----------|-------------|
| `NODE_ENV` | ✅ | Must be `production` |
| `NEXT_PUBLIC_APP_URL` | ✅ | Public HTTPS URL |
| `NEXT_PUBLIC_API_URL` | ✅ | Public API base URL |
| `NEXTAUTH_URL` | ✅ | Exact canonical origin (must match domain) |
| `AUTH_SECRET` | ✅ | 32-byte random secret for JWT signing |
| `DATABASE_URL` | ✅ | MySQL connection string |
| `SMTP_HOST` / `SMTP_*` | ⬜ | Optional — for transactional email |

---

## Known pre-production issues to fix before go-live

- [ ] Route handler `params` typing (Next.js 16 requires `params: Promise<{id}>`)  
  Affected: `src/app/api/admin/employees/[id]/route.ts`
- [ ] Prisma `status` filter needs enum cast in `src/app/api/admin/employees/route.ts`
- [ ] `StickyVideoScrollSection.tsx` ref typing errors
