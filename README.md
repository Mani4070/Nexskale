# NexSkale

A responsive technology agency website inspired by the supplied reference. Built with Next.js App Router, React, TypeScript and a Node.js backend using local JSON storage.

## Run locally

```sh
npm install
npm run dev
```

Open http://localhost:3000. In Windows PowerShell, use `npm.cmd` if script execution policy blocks `npm`.

```sh
npm run build
npm start
```

## Pages and navigation

All navigation uses real Next.js links. Pages can be bookmarked, opened in another tab, refreshed directly, and visited with browser Back/Forward. There are no popup detail views.

| URL                           | Content                                  |
| ----------------------------- | ---------------------------------------- |
| `/`                           | Homepage                                 |
| `/services`, `/services/[id]` | Services and individual service pages    |
| `/work`                       | Filterable portfolio                     |
| `/products`, `/products/[id]` | Product catalog and individual showcases |
| `/about`                      | Company and approach                     |
| `/blog`, `/blog/[id]`         | Articles and individual article pages    |
| `/contact`                    | Project enquiry form                     |
| `/privacy`, `/terms`          | Policy pages                             |

The existing `projects` JSON collection supplies both Work and Products. Each item's `id` is its URL slug. Unknown pages return 404. Service enquiry links preselect the matching service on `/contact?service=...`.

`app/[...segments]/page.tsx` resolves pages from the JSON content and generates page-specific metadata. `components/logo.tsx` contains the editable vector logo. Fluid gutters in `app/pages.css` keep the layout balanced as browser zoom changes.

## Edit content

Update `data/content.json` to change navigation, hero copy, statistics, technology names, services, company information, project showcases and blog articles. The server reads this file on every page request; refresh the page to see edits without rebuilding. Keep the existing JSON field structure. Images may be local paths under `public/` or image URLs.

The statistics and projects are starter content based on the design reference, not verified business claims. Replace them, the contact email, and the privacy/terms copy before publishing. Project details identify showcases as concepts. Editorial photos are loaded from Unsplash; fonts are loaded from Google Fonts. Generated hero and meeting-room artwork are stored locally in `public/images/`. The About image and its alternative text are configurable through `about.image` and `about.imageAlt`.

## Motion and artwork

`components/site-motion.tsx` uses [Motion](https://motion.dev/docs/inview) for viewport reveals, staggered entrances, and a reading progress bar throughout the pages. CSS adds ambient hero/ribbon motion and hover effects. All effects respect the operating system's reduced-motion preference, including changes while the page is open. Content remains visible before JavaScript loads. Newly filtered cards receive their own entrance animation.

The About section uses `public/images/nexuskale-meeting-room.png`, created with the built-in image generation tool. Its exact generation prompt is recorded in [docs/meeting-room-prompt.md](docs/meeting-room-prompt.md).

## Node.js backend

Next.js route handlers run on Node.js in the same application:

| Endpoint         | Method | Purpose                                 |
| ---------------- | ------ | --------------------------------------- |
| `/api/content`   | GET    | Public website content                  |
| `/api/contact`   | POST   | Validate and save a project enquiry     |
| `/api/subscribe` | POST   | Validate and save an email subscription |

Enquiries are stored in `data/enquiries.json`; subscriptions in `data/subscribers.json`. Files are created on first submission and excluded from Git. Private submissions have no public read endpoint. Writes are serialized within the Node.js process and use temporary files followed by atomic renames. Repeated subscription emails are deduplicated.

Contact payload: `name`, `email`, `company`, `service`, `budget`, `message`. Name, valid email and a message of 10–5,000 characters are required. Subscription payload: `email`.

Forms save data locally. They do not send email or book calendar appointments. Discovery call requests use the enquiry form.

For this JSON setup, deploy as a **single Node.js process with a persistent writable disk**. Ephemeral serverless storage or multiple instances require replacing `lib/submissions.ts` with a shared database/storage implementation. Add abuse protection before exposing submission endpoints broadly.

## Checks

```sh
npm run typecheck
npm run build
npm test
```

Browser tests use an isolated temporary JSON storage directory and do not change real submissions. Playwright Chromium must be installed with `npx playwright install chromium`.

Backend structure follows the [Next.js route handler documentation](https://nextjs.org/docs/app/getting-started/route-handlers).
