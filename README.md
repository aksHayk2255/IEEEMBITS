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

The public website is a Vite frontend. Supabase hosts the authentication,
PostgreSQL database, and image storage used by the protected admin dashboard.
Local TypeScript content remains as a fallback if Supabase is unavailable.

### Supabase configuration

Copy `.env.example` to `.env.local` and set `VITE_SUPABASE_URL` and
`VITE_SUPABASE_ANON_KEY` using the project's URL and publishable key. Never put
a Supabase secret/service-role key in frontend environment variables. Restart
`npm run dev` after changing the file.

Run `supabase/schema.sql` in the Supabase SQL Editor. It can be rerun safely
without deleting content rows. Create the admin login in Supabase Authentication,
then add its user UUID:

```sql
insert into public.admin_users (user_id) values ('AUTH_USER_UUID');
```

Then run `supabase/storage.sql` to create the image buckets, and
`supabase/seed.sql` to import the existing events and team members from the
local site data. The seed script skips existing rows if run again. Gallery
images can be uploaded from the admin dashboard; achievements, projects, and
announcements remain empty until real entries are added.

Open `/IEEEMBITS/admin/login` locally or `/IEEEMBITS/admin/login` on the hosted
site. The manager supports events, projects, achievements, team, gallery, and
announcements.

### GitHub Pages deployment

Set repository Actions variables `VITE_SUPABASE_URL` and
`VITE_SUPABASE_ANON_KEY` to the same browser-safe values. GitHub Pages serves
the frontend; Supabase remains the hosted backend and database.

For other static hosting providers, use build command `npm run build` and output
directory `dist`.

- **Vercel / Netlify** — framework preset "Vite", build `npm run build`, output `dist`.
- **GitHub Pages** — set `base: '/<repo-name>/'` in `vite.config.ts`, then publish `dist`.
