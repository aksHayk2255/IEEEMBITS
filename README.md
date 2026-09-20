# IEEE Computer Society MBITS — WebNova

Single-page site for the IEEE Computer Society student chapter at Mar Baselios
Institute of Technology and Science. Dark, typographic and content-driven: every
list on the page (events, projects, achievements, team, gallery) is read from a
plain TypeScript file, so adding real content never means touching layout code.

## Tech Stack

- React 19
- Vite
- TypeScript
- Tailwind CSS v4 (configured in CSS, no `tailwind.config.js` needed)
- Framer Motion
- Lucide React

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

## Production Build

```bash
npm run build
```

## Preview

```bash
npm run preview
```

`npm run typecheck` runs TypeScript on its own if you want a quick check without
building.

## Where to edit content

Everything you are likely to change lives in `src/data/`.

| What | File | Notes |
| --- | --- | --- |
| Events | `src/data/events.ts` | Push objects into `events`. Cards appear automatically; while the array is empty the section shows its empty state. |
| Projects | `src/data/projects.ts` | Same pattern, `projects` array. |
| Achievements | `src/data/achievements.ts` | Oldest first. Renders as a horizontal timeline on desktop, vertical on mobile. |
| Team | `src/data/team.ts` | Order in the array is the order on the page. |
| Gallery | `src/data/gallery.ts` | Set `span: 'wide'` or `'tall'` to make an image claim a bigger cell. |
| Contact details | `src/data/contact.ts` | Replace each `[placeholder]` value; add `href` to make it a link. |
| Navigation links | `src/data/navigation.ts` | `id` must match the `id` on the matching `<section>`. |

Each file exports a typed interface, so your editor will tell you if a field is
missing or misspelled.

Text that is not list-shaped sits directly in its component:

- Hero headline and intro — `src/components/Hero.tsx`
- About copy and the three statistics (currently `—`) — `src/components/About.tsx`
- Learn / Build / Compete / Connect blurbs — `src/components/WhatWeDo.tsx`
- Closing call to action — `src/components/CTA.tsx`
- Footer — `src/components/Footer.tsx`

## Images

Put files in `src/assets/images/` and import them — see the README in that
folder. Anywhere a real photo has not been supplied yet, the site renders a
marked placeholder rather than a stand-in photograph.

## Design tokens

Colours, fonts and the page gutter are defined once at the top of
`src/index.css` inside `@theme`. Changing `--color-accent` there changes the
accent everywhere; `.shell`, `.display`, `.hero-type` and `.eyebrow` just below
it control the layout width and the type treatments.

## Project structure

```text
src/
├── assets/images/     real images go here
├── components/        one file per page section
│   └── ui/            small shared pieces (Reveal, SectionHeading, EmptyState, …)
├── data/              all editable content
├── lib/               motion variants + active-section hook
├── App.tsx            section order
├── main.tsx           entry point
└── index.css          design tokens and base styles
```

## Accessibility and motion

Animations are subtle and every one of them is skipped when the visitor has
"reduce motion" enabled. Focus outlines are visible, navigation works from the
keyboard, and the layout has no horizontal overflow from 320px upward.

## Deploying

## Supabase CMS and admin dashboard

The project includes a protected content-management dashboard at `/admin` and
uses Supabase for authentication, PostgreSQL content, and image storage. The
public site keeps its existing visual design and uses Supabase data when the
environment variables are configured. Without them, local fallback content is
used so the public GitHub Pages site remains buildable.

### Environment variables

Copy `.env.example` to `.env.local` and add the browser-safe Supabase values:

```bash
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-publishable-anon-key
```

Never put a Supabase service-role key in this project.

### Supabase setup

1. Create a Supabase project.
2. Run `supabase/schema.sql` in the Supabase SQL Editor.
3. Run `supabase/storage.sql` in the SQL Editor.
4. In Authentication, create the first user with email and password. Do not enable public signup.
5. Copy that user's UUID and run:

```sql
insert into public.admin_users (user_id) values ('YOUR_AUTH_USER_UUID');
```

6. Add the environment variables to `.env.local` and restart `npm run dev`.
7. Open `/IEEEMBITS/admin/login` locally or `/IEEEMBITS/admin/login` on the deployed site.

The dashboard supports events, projects, achievements, team members, gallery
images, and announcements. It validates JPG/JPEG/PNG/WebP uploads and limits
them to 5 MB. Delete actions require confirmation. RLS policies allow public
reads only for active team members and announcements, while all mutations
require explicit membership in `admin_users`.

### Local development with CMS

```bash
npm install
npm run dev
```

The public site is available at `http://localhost:5173/IEEEMBITS/` and the
dashboard at `http://localhost:5173/IEEEMBITS/admin/login`.

### Deployment with CMS

Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` as repository Actions
variables or secrets before deploying. The existing GitHub Pages workflow
builds the Vite app and preserves client-side admin routes with a `404.html`
SPA fallback. Supabase remains the hosted backend; GitHub Pages only serves the
frontend.

- **Vercel / Netlify** — framework preset "Vite", build `npm run build`, output `dist`.
- **GitHub Pages** — set `base: '/<repo-name>/'` in `vite.config.ts`, then publish `dist`.
