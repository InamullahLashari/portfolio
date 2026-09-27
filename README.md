# Inam — Personal Portfolio

A single-page React + Vite portfolio: a name-only welcome gate, hero,
about, experience timeline, skills, education, an availability
"dashboard", a "Play with Inam" games section, and a contact section —
all backed by EmailJS / Gmail-compose links instead of a real backend.

## Welcome gate + visitor notifications

Before anything else loads, visitors see a one-field "What's your name?"
form (`src/components/VisitorGate`). It:
- asks for a name only — no email, phone, or location
- never requires the visitor's own email app or permissions
- sends a one-line notification ("Visitor name: …") using
  [EmailJS](https://www.emailjs.com/), a free service that lets a static
  site send email straight from the browser
- lets the visitor into the site immediately either way, even if the
  notification email fails or isn't configured yet

**To turn on the notification email**, fill in `src/config/emailConfig.js`
— it has step-by-step instructions. In short: create a free EmailJS
account, connect your Gmail (`lashariinam50@gmail.com`) as the sending
service, create a template whose "To email" is your destination inbox
(`21sw30@quest.edu.pk`) with a `{{visitor_name}}` variable, then paste the
three IDs it gives you into that file.

The gate reappears once per browser session (`sessionStorage`). To make it
"ask once ever" instead, change `sessionStorage` to `localStorage` in
`src/utils/visitor.js`.

## Play with Inam

Lists a few games (Chess, PUBG, Ludo, Cards) so visitors know what you're
up for. Pick one, select a date, and it opens **Gmail, already
composed** — recipient, subject, and a written invite — via
`src/utils/email.js`. No sign-in prompts, no app permissions, just a
Gmail compose tab.

## Availability

`src/data/profileData.js` → `availability.options` controls which
arrangements show as open vs. not right now. Currently only **Part-time**
is marked available; the rest render dimmed. Flip the `available`
booleans there whenever your situation changes.

## Edit your content

Everything personal lives in one file:

```
src/data/profileData.js
```

Name, role, bio, skill groups, education, experience history, availability,
email, phone, and social links all live there — no other file needs to
change for basic content edits.

- **Photo**: drop a real image in `public/` (e.g. `public/photo.jpg`) and
  set `profile.photoUrl` to `"/photo.jpg"` to show it on the Home section.
  Leave it empty to keep the animated gradient avatar.
- **Experience logos**: each entry in `experience` can take a
  `logoDomain` (e.g. `"10pearls.com"`) to pull that company's real logo via
  Clearbit's public logo API. Leave it out to show a gradient initials
  badge instead — this is the safe default when you're not sure of a
  company's exact domain.

## Design

Black, gradient-glow background (radial orange/purple glows over a black
base) with a single reusable orange→purple accent gradient
(`--accent-gradient`) used consistently for buttons, icons, timeline dots,
and the availability "dashboard" card. Sora for headings, Inter for body
text, monospace reserved for genuinely tabular content (like dates). All
of it is driven from tokens at the top of `src/index.css`, so a full
re-theme is a handful of variable edits.

## Run locally

```bash
npm install
npm run dev
```

Open the printed local URL (usually http://localhost:5173).

## Deploy to Vercel (recommended)

`vite.config.js` is already set to `base: '/'`, which is exactly what a
root-domain Vercel deployment needs — no repo-name-specific edits required.

### Option A — via the Vercel dashboard (no CLI needed)

1. Push this project to a GitHub repo (see below).
2. Go to [vercel.com/new](https://vercel.com/new) and import that repo.
3. Vercel auto-detects it as a **Vite** project — build command
   `npm run build`, output directory `dist`. Leave these as-is.
4. Click **Deploy**. Every future push to the connected branch
   (usually `main`) redeploys automatically.

### Option B — via the Vercel CLI

```bash
npm install -g vercel   # one-time
vercel                  # first run: links/creates the project, deploys a preview
vercel --prod           # deploys to your production URL
```

Either way, your site ends up live at a URL like
`https://<project-name>.vercel.app` (plus any custom domain you attach in
the Vercel dashboard).

## Push to GitHub

```bash
git init                      # skip if this is already a git repo
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo-name>.git
git push -u origin main
```

## Project structure

```
src/
├── components/
│   ├── Navbar.jsx / .css
│   ├── Hero.jsx / .css
│   ├── About.jsx / .css
│   ├── Experience.jsx / .css     (work history timeline with company logos)
│   ├── Skills.jsx / .css         (grouped skill chips, no proficiency badge)
│   ├── Education.jsx / .css
│   ├── Availability.jsx / .css   (gradient "dashboard" status card)
│   ├── Contact.jsx / .css
│   ├── Footer.jsx / .css
│   ├── Games/
│   │   └── Games.jsx / .css      ("Play with Inam" — pick a game + date)
│   └── VisitorGate/
│       └── VisitorGate.jsx / .css
├── config/
│   └── emailConfig.js            ← EmailJS IDs go here
├── hooks/
│   └── useInView.js              (scroll-reveal helper, no dependency)
├── utils/
│   ├── visitor.js                (sessionStorage helper for the visitor's name)
│   └── email.js                  (opens Gmail compose with prefilled fields)
├── data/
│   └── profileData.js            ← edit your info here
├── App.jsx
├── main.jsx
└── index.css                     (design tokens + base styles)
```

## Notes

- Pure static frontend: React + HTML/CSS/JS only, no custom backend or
  database. The one external dependency is EmailJS's free client-side API,
  used only for the one-line visitor-name notification.
- "Play with Inam" opens a **Gmail compose tab** with everything
  pre-filled — no backend, and no access to the visitor's own inbox is
  ever requested.
- No IP address, precise location, device info, or any visitor data beyond
  the name they typed is ever collected or sent.
- Every source file in this project has been syntax- and import-checked
  with esbuild before being handed to you, so `npm install && npm run
  build` should succeed on a clean checkout.
