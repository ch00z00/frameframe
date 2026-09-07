# Project Structure

## Current Root Layout (as of this writing)

```
frameframe/
├── CLAUDE.md              # Project-specific Claude Code instructions
├── README.md               # Dev log / artifact workflow explanation
├── .claude/
│   ├── settings.json        # Hook wiring (PreToolUse on the Artifact tool)
│   ├── settings.local.json  # Local-only permissions (gitignored globally)
│   └── hooks/
│       └── artifact-to-docs.sh   # Blocks Artifact publishes outside docs/artifacts/
├── docs/
│   └── artifacts/            # Published Claude Code Artifacts (dev log), served by GitHub Pages
│       ├── strategy-memo.html      # Initial concept/business strategy memo
│       └── policy-decisions.html   # Decision log for the 4 open items strategy-memo raised
└── .kiro/
    └── steering/              # This directory
```

No application source code exists yet (no `src/`, no `package.json`). The site described in
`product.md` and `tech.md` has not been scaffolded.

## Dev Log Convention (`docs/artifacts/`)

- **Artifact source files (`.html`/`.md`) must be written directly into `docs/artifacts/`**,
  not the Claude Code scratchpad, before calling the Artifact tool to publish. This is
  enforced by the `PreToolUse` hook described in `tech.md` — a publish targeting any other
  path is blocked with a message to move the file and retry.
- Each file becomes reachable at `https://ch00z00.github.io/frameframe/artifacts/<filename>`
  once pushed to `main` (GitHub Pages serves `/docs` from that branch).
- This convention is documented in the repo's own `CLAUDE.md` so it survives across sessions
  regardless of the default scratchpad-first behavior Claude Code otherwise assumes.

## Planned Structure for the Product Site (not yet created)

To be established when implementation begins (via `/kiro:spec-init` and following specs),
consistent with the `tech.md` decisions:

```
frameframe/
├── astro.config.mjs
├── package.json
├── tsconfig.json
├── public/                     # static assets (favicon, OGP images, etc.)
└── src/
    ├── content/
    │   ├── config.ts             # Content Collections schema (title, tags, is_premium, ...)
    │   └── articles/
    │       └── *.mdx              # one file per article
    ├── components/                # custom MDX components (PullQuote, ComparisonTable, ...)
    ├── layouts/
    │   ├── BaseLayout.astro
    │   └── ArticleLayout.astro
    ├── pages/
    │   ├── index.astro            # top / article listing
    │   ├── articles/[slug].astro  # article detail
    │   └── tags/[tag].astro       # static per-tag listing (see tech.md search/tag section)
    └── styles/
        └── tokens.css              # design tokens (CSS custom properties)
```

- The Astro project lives at the **repo root**, alongside the existing `docs/`, `.claude/`,
  and `.kiro/` directories. This is resolved (no longer open): Astro's default build output
  directory is `dist/`, not `docs/`, so it does not collide with the GitHub Pages dev-log
  setup, which serves `docs/` from a separate deploy path (GitHub Pages) than the product
  site (Vercel). No relocation of the dev-log tooling is needed.
- Article content as MDX files under `src/content/articles/` (an Astro **content
  collection**), one file per article, with a frontmatter schema covering at least: `title`,
  `tags`, `is_premium` (see `product.md`), and any director/actor/location references used as
  in-article supporting data (per the decision to not give those their own pages).
- A small, growing **custom component library** under `src/components/` (comparison tables,
  pull-quotes, image essays, timelines, etc.) importable from within MDX article bodies, per
  the decision to keep per-article visual presentation distinctive rather than templated.
- Styling as CSS custom properties (design tokens) in `src/styles/tokens.css`, not a utility
  framework or Sass — see `tech.md`.
- Search (Pagefind) and tag pages (`src/pages/tags/[tag].astro`) require no separate backend
  — see `tech.md`.

## Naming / Organization Principles Established So Far

- Keep the **dev log** (this repo's own working artifacts, GitHub Pages) and the **product
  site** (the actual FrameFrame site, Vercel) structurally and conceptually separate — they
  serve different audiences and will be hosted at different URLs.
- Supporting entity data (director/actor/location) is **not** organized as its own directory
  of pages/routes — it lives alongside the article content it supports (see `product.md`).
